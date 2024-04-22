import { NextFunction, Request, RequestHandler, Response } from 'express';

const basicAuthMiddleware = (u: string, p: string, realm: string, path: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl && req.originalUrl.includes(path)) {
      const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
      const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
      if (login && password && login === u && password === p) {
        return next();
      }
      res.set('WWW-Authenticate', `Basic realm="${realm}"`);
      res.status(401).send('Authentication required');
    } else {
      return next();
    }
  };
};

// TODO: Check: is better to export const or default JS export
export { basicAuthMiddleware };
