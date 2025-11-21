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
  authJwt,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user?.user;

    try {
      res.status(201).json({
        message: `user: ${user?.username} Onboard route reached successfully`,
      });
    } catch (err: any) {
      next(err);
    }
  }
);

authRouter.get(
  '/',
  authJwt,
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user?.user;

    try {
      res.status(200).json({
        message: `user: ${user?.username} Onboard route reached successfully`,
      });
    } catch (err: any) {
      next(err);
    }
  }
);
export default authRouter;
