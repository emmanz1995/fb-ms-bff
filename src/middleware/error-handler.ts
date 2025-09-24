import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { InternalFinboticsError } from '../helpers';

const errorHandler = (
  err: InternalFinboticsError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (_.isError(err)) {
    console.log('Error: ', err);

    let error = err as Error;
    if (!(error instanceof InternalFinboticsError)) {
      error = new InternalFinboticsError(err.message, {
        statusCode:
          typeof (err as any).statusCode === 'number'
            ? (err as any).statusCode
            : 500,
      });
    }

    const { statusCode, message, errors } = error as InternalFinboticsError;

    return res.status(statusCode || 500).json({
      message,
      errors,
    });
  }
};

export default errorHandler;
