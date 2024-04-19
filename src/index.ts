import 'reflect-metadata';

import { app } from './server';
import { env } from './shared/utils/env';

const server = app.listen(env.PORT, () => {
  console.log(`🚀 Express server listening at: http://${env.HOST}:${env.PORT}`);
});

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
