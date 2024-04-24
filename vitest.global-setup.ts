import { spawn } from 'node:child_process';
import { connection } from './src/lib/drizzle';
import { env } from './src/lib/env';

let teardown = false;

const exec = (command: string) => {
  const child = spawn(command, { shell: true, stdio: 'inherit', ...env });
  return new Promise((resolve, reject) => {
    child.on('exit', (code: number) => {
      if (code === 0) {
        resolve(null);
      } else {
        reject(new Error(`${command} failed rc=${code}`));
      }
    });
  });
};

export default async function () {
  console.log('🧼 Setup test database...');
  await exec(`npm run db:setuptests`);

  return async () => {
    if (teardown) {
      throw new Error('❌ Teardown called twice!');
    }
    teardown = true;
    await connection.close();
  };
}
