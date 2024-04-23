import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { env } from '../env';

const logger = pino(env.NODE_ENV === 'development' ? pinoPretty() : {});

export { logger };
