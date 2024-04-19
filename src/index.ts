import { app } from './server';
import { env } from './shared/utils/env';

const server = app.listen(env.PORT, () => {
  console.log(`🚀  Server (${env.NODE_ENV}) running on port http://${env.HOST}:${env.PORT}`);
});

const onCloseSignal = () => {
  console.log('❌ sigint received, shutting down');
  server.close(() => {
    console.log('❌ server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
