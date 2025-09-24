import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware';
// import { predictionRouter } from './api/predication';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('<h1>Welcome to the prediction engine</h1>');
});

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/api/v1/predict', predictionRouter);

app.use(errorHandler);

export default app;
