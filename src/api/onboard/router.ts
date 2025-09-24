import { Router, Request, Response, NextFunction } from 'express';

const onboardRouter = Router();

onboardRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: 'Onboard route reached successfully' });
  } catch (err: any) {
    next(err);
  }
});