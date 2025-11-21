import { NextFunction, Request, Response } from 'express';
import { connector } from '../connector';
import { InternalFinboticsError } from '../helpers';

const authJwt = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req?.headers?.authorization?.startsWith('Bearer'))
    token = req?.headers?.authorization?.split(' ')[1];
  else
    throw new InternalFinboticsError('No token provided', { statusCode: 401 });

  try {
    const userInfo = await connector({
      url: `${process.env.AUTH_URL}/api/v1/user/verify`,
      method: 'POST',
      body: {
        token,
      },
    });

    // @ts-ignore
    req.user = userInfo;
  } catch (err: unknown) {
    throw new InternalFinboticsError('Unauthorized', {
      statusCode: 401,
      metadata: { error: err },
    });
  }

  next();
};

export default authJwt;
