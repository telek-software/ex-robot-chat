import pino from 'pino';

export const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: 'pino-pretty',
    options: {
      customColors: 'error:red,info:blue,warn:yellow',
    },
  },
});

export default logger;

export const str = (str: any) => JSON.stringify(str);
