import dotenv from 'dotenv';
dotenv.config();

// TODO: add zod validator
const env = { ...process.env };

export { env };
