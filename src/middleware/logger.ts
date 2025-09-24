import winston from 'winston';

const log = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  log.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const logger = (req: any, res: any, next: any) => {
  log.info(`${req.method} ${req.url}`);
  next();
};

export default logger;
