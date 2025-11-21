import { Router, Request, Response, NextFunction } from 'express';
import { authJwt } from '../../middleware';

const onboardRouter = Router();

onboardRouter.post(
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
export default onboardRouter;
