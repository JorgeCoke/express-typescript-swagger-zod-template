/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
  ResponseConfig
} from '@asteasolutions/zod-to-openapi';
import { RequestHandler, Router } from 'express';
import { ReferenceObject, SecuritySchemeObject } from 'node_modules/openapi3-ts/dist/model/openapi31';
import { z, ZodArray, ZodEffects, ZodObject } from 'zod';
import { getSchemaOfOpenAPIRoute } from './zod-openapi-route';
import { ErrorResponse } from './zod-openapi.types';

extendZodWithOpenApi(z);

export type OpenAPIDocument = ReturnType<OpenApiGeneratorV3['generateDocument']>;
export type OpenAPIComponents = ReturnType<OpenApiGeneratorV3['generateComponents']>;
export type OpenAPIConfig = Parameters<OpenApiGeneratorV3['generateDocument']>[0];

export function buildOpenAPIDocument(args: {
  config: OpenAPIConfig;
  routers: { path: string; router: Router }[];
  customSchemas: { key: string; schema: z.ZodTypeAny }[];
  securitySchemes?: {
    [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
  };
}): OpenAPIDocument {
  const { config, routers, customSchemas, securitySchemes } = args;
  const registry = new OpenAPIRegistry();
  // Attach all of the Zod schemas to the OpenAPI specification
  // as components that can be referenced in the API definitions
  const schemas = customSchemas.map((customSchema) => ({
    key: customSchema.key,
    schema: customSchema.schema,
    registered: registry.register(customSchema.key, customSchema.schema)
  }));

  const referencingNamedSchemas = (type?: z.ZodType<any>) => {
    if (!type) {
      return undefined;
    }
    if (type instanceof ZodEffects) {
      const nonEffectedObj = schemas.find((s) => s.key === type._def.openapi?._internal?.refId);
      if (nonEffectedObj) {
        return nonEffectedObj.registered;
      } else {
        return type.innerType();
      }
    }
    const named = schemas.find((a) => a.schema === type);
    if (named) {
      return named.registered;
    }
    if (type instanceof ZodArray) {
      const namedChild = schemas.find((a) => a.schema === type.element);
      if (namedChild) {
        return z.array(namedChild.registered);
      }
    }
    return type;
  };

  // Attach all the API routes, referencing the named components where
  // possible, and falling back to inlining the Zod shapes.
  getRoutes(routers).forEach(({ path, method, handler }) => {
    const { tag, body, params, query, response, description, summary, security, deprecated, responseContentType } =
      getSchemaOfOpenAPIRoute(handler) || {};

    //Express: /path/to/:variable/something -> OpenAPI /path/to/{variable}/something
    const pathOpenAPIFormat = path
      .split('/')
      .filter((p) => p.includes(':'))
      .reduce((iPath, replaceMe) => iPath.replace(new RegExp(replaceMe, 'gi'), `{${replaceMe.substring(1)}}`), path);

    const responses: {
      [statusCode: string]: ResponseConfig;
    } = {};

    // If the request includes security, include 401 and 403 errors
    if (security) {
      responses[401] = {
        content: {
          'application/json': {
            schema: referencingNamedSchemas(ErrorResponse)
          }
        },
        description: '401 Unauthorized - Error'
      };
      responses[403] = {
        content: {
          'application/json': {
            schema: referencingNamedSchemas(ErrorResponse)
          }
        },
        description: '403 Forbidden - Error'
      };
    }

    // If the request includes path parameters, a 404 error is most likely possible
    if (params) {
      responses[404] = {
        content: {
          'application/json': {
            schema: referencingNamedSchemas(ErrorResponse)
          }
        },
        description: '404 Not Found - Error'
      };
    }

    // If the request includes a query string or request body, Zod 400 errors are possible
    if (query || body) {
      responses[400] = {
        content: {
          'application/json': {
            schema: referencingNamedSchemas(ErrorResponse)
          }
        },
        description: '400 Bad Request - Error'
      };
    }

    // If the API defines a response, assume a 200. If no response schema is specified
    // we assume the response will be a 204 No Content
    if (responseContentType) {
      responses[200] = {
        content: {
          responseContentType: {
            schema: z.unknown()
          }
        },
        description: `A ${responseContentType} payload`
      };
    } else if (response) {
      responses[200] = {
        content: {
          'application/json': {
            schema: referencingNamedSchemas(response)
          }
        },
        description: `200 Response - Successful`
      };
    } else {
      responses[204] = {
        description: `204 No content - Successful`
      };
    }

    registry.registerPath({
      tags: [tag || 'default'],
      method: method,
      summary: summary,
      path: `${pathOpenAPIFormat}`,
      description: description,
      deprecated: deprecated,
      security: security ? [{ [security]: [] }] : undefined,
      request: {
        params: asZodObject(referencingNamedSchemas(params)),
        query: asZodObject(referencingNamedSchemas(query)),
        ...(body && {
          body: {
            content: {
              'application/json': {
                schema: referencingNamedSchemas(body)
              }
            }
          }
        })
      },
      responses: responses
    });
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);
  const openapiJSON = generator.generateDocument(config);

  // Attach the security schemes provided
  if (securitySchemes) {
    openapiJSON.components!.securitySchemes ||= {};
    Object.assign(openapiJSON.components!.securitySchemes, securitySchemes);
  }

  // Verify that none of the "parameters" are appearing as optional, which is invalid
  // in the official OpenAPI spec and unsupported by readme.io
  for (const [route, impl] of Object.entries(openapiJSON.paths)) {
    for (const method of Object.keys(impl)) {
      for (const param of impl[method as any].parameters || []) {
        if (param.required === false && param.in === 'path') {
          throw new Error(
            `OpenAPI Error: The route ${route} has an optional parameter ${param.name} in the path. ` +
              `Optional parameters in the route path are not supported by readme.io. Make the parameter required ` +
              `or split the route definition into two separate ones, one with the param and one without.`
          );
        }
      }
    }
  }
  return openapiJSON;
}

// Helpers
const asZodObject = (type?: z.ZodType<any>) => {
  if (type && type instanceof ZodObject) {
    return type;
  }
  return undefined;
};

// Disable naming convention because fast_slash comes from Express.
// const regexPrefixToString = (path: { fast_slash: unknown; toString: () => string }): string => {
//   if (path.fast_slash) {
//     return '';
//   }
//   return path.toString().replace(`/^\\`, '').replace('(?:\\/(?=$))?(?=\\/|$)/i', '');
// };

export const getRoutes = (routers: { path: string; router: Router }[]) => {
  const routes: {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    handler: RequestHandler;
  }[] = [];
  const processMiddleware = (middleware: any, prefix = ''): void => {
    const hasOpenApiMiddleware = middleware.route.stack.find((e: any) => e.__handle.validateSchema);

    // if (middleware.name === 'router' && middleware.handle.stack) {
    //   for (const subMiddleware of middleware.handle.stack) {
    //     processMiddleware(subMiddleware, `${prefix}${regexPrefixToString(middleware.regexp)}`);
    //   }
    // }
    if (!hasOpenApiMiddleware) {
      // Ignore routes without openAPIRoute middleware
      return;
    }
    routes.push({
      path: `${prefix}${middleware.route.path}`,
      method: hasOpenApiMiddleware.method,
      handler: hasOpenApiMiddleware.handle
    });
  };
  // Can remove this any when @types/express upgrades to v5
  for (const router of routers) {
    for (const middleware of router.router.stack) {
      processMiddleware(middleware, router.path);
    }
  }
  return routes;
};
