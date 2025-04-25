import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
} from '../errors/customErrors.js';
import Product from '../models/FirearmsModel.js';
import Review from '../models/Review.js';
import mongoose from 'mongoose';
import { checkPermissions } from '../utils/checkPermissions.js';

export const createReview = async (
  req,
  res,
  next
) => {
  const { comment, rating, productId } = req.body;

  const productExists = await Product.exists({
    _id: productId,
  });

  if (!productExists) {
    throw new BadRequestError(
      'Invalid product ID provided'
    );
  }

  if (!comment || !rating) {
    throw new BadRequestError(
      'provide comment and rating'
    );
  }

  await Review.create({
    comment,
    rating,
    product: productId,
    user: req.user.userId,
  });

  await updateAverageRating(productId);

  return res
    .status(StatusCodes.CREATED)
    .json({ msg: 'review created' });
};

export const getAllReviews = (req, res, next) => {
  return res.send('getAllReviews');
};

export const getAllReviewsForProduct = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const reviewsForProduct = await Review.find({
    product: id,
  }).populate('user');

  return res
    .status(StatusCodes.OK)
    .json({ reviews: reviewsForProduct });
};

export const updateReview = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  const review = await Review.findById(id);
  if (!review) {
    throw new BadRequestError('Review not found');
  }
  checkPermissions(req.user, review.user);

  const { comment, rating, productId } = req.body;

  const productExists = await Product.exists({
    _id: productId,
  });

  if (!productExists) {
    throw new BadRequestError(
      'Invalid product ID provided'
    );
  }

  await Review.findByIdAndUpdate(id, {
    comment,
    rating,
    product: productId,
    user: req.user.userId,
  });

  await updateAverageRating(productId);

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'review updated' });
};

export const deleteReview = async (
  req,
  res,
  next
) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    throw new NotFoundError('Review not found');
  }
  const productId = review.product;

  await review.deleteOne();

  await updateAverageRating(productId);

  return res
    .status(StatusCodes.OK)
    .json({ msg: 'product deleted succesfully' });
};

const updateAverageRating = async productId => {
  const result = await Review.aggregate([
    {
      $match: {
        product: new mongoose.Types.ObjectId(
          productId
        ),
      },
    },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(result);

  const averageRating =
    result[0]?.averageRating || 0;

  await Product.findByIdAndUpdate(productId, {
    averageRating: averageRating,
  });
};
