import { Router, Request, Response, NextFunction } from 'express';
import { authJwt } from '../../middleware';
import { connector } from '../../connector';

const authRouter = Router();

authRouter.post(
  '/sign-in',
  async (req: Request, res: Response, next: NextFunction) => {
    const resp = await connector({
      url: `${process.env.AUTH_URL}/api/v1/auth`,
      method: 'POST',
      body: req.body,
    });

    try {
      res.status(200).json(resp);
    } catch (err: any) {
      next(err);
    }
  }
);

authRouter.post(
  '/sign-up',
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user?.user;

    const resp = await connector({
      url: `${process.env.AUTH_URL}/api/v1/user/sign-up`,
      method: 'POST',
      body: req.body,
    });

    try {
      res.status(201).json(resp);
    } catch (err: any) {
      next(err);
    }
  }
);

authRouter.get(
  '/me',
  authJwt,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user?.user;
    const url = `${process.env.AUTH_URL}/api/v1/user/${user?.id}`;
    const response = await connector({ url, method: 'GET' });

    try {
      res.status(200).json(response);
    } catch (err: any) {
      next(err);
    }
  }
);
export default authRouter;
