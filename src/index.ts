import 'reflect-metadata';

import { env } from './libs/env';
import { logger } from './libs/pino-logger';
import { app } from './server';

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 Express server listening at: http://${env.HOST}:${env.PORT}`);
  logger.info(
    `📄 OpenApi definition file available at: http://${env.HOST}:${env.PORT}${env.API_BASE_PATH}${env.SWAGGER_ENDPOINT}${env.SWAGGER_OPENAPI_DEF}`
  );
  logger.info(
    `📚 Swagger docs available at: http://${env.HOST}:${env.PORT}${env.API_BASE_PATH}${env.SWAGGER_ENDPOINT}`
  );
});
server.setTimeout(env.TIMEOUT_MS);

const onCloseSignal = () => {
  logger.info('❌ Close signal received, shutting down...');
  server.close(() => {
    logger.info('❌ Server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 5000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
