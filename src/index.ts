import 'reflect-metadata';

import { app } from './server';
import { env } from './shared/env';

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Express server listening at: http://${env.HOST}:${env.PORT}`);
  console.log(
    `📄 OpenApi definition file available at: http://${env.HOST}:${env.PORT}${env.API_BASE_PATH}${env.SWAGGER_ENDPOINT}${env.SWAGGER_OPENAPI_DEF}`
  );
  console.log(
    `📚 Swagger docs available at: http://${env.HOST}:${env.PORT}${env.API_BASE_PATH}${env.SWAGGER_ENDPOINT}`
  );
});
server.setTimeout(env.TIMEOUT_MS);

const onCloseSignal = () => {
  console.log('❌ Close signal received, shutting down...');
  server.close(() => {
    console.log('❌ Server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 5000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
