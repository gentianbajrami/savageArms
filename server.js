import 'express-async-errors';
import express from 'express';
const app = express();
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import cors from 'cors';

//routers
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import firearmRouter from './routes/firearmRouter.js';
import blogRouter from './routes/blogRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import reviewRouter from './routes/reviewsRouter.js';

//middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    credentials: true,
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
    ],
  })
);

app.use('/api/v1/firearms', firearmRouter);
app.use(
  '/api/v1/users',
  authenticateUser,
  userRouter
);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs', blogRouter);
app.use(
  '/api/v1/cart',
  authenticateUser,
  cartRouter
);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5101;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
