import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors/customErrors.js';
import Product from '../models/FirearmsModel.js';
import Review from '../models/Review.js';
import mongoose from 'mongoose';

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

  console.log(reviewsForProduct, id);
  return res
    .status(StatusCodes.OK)
    .json({ reviews: reviewsForProduct });
};

export const updateReview = (req, res, next) => {
  return res.send('createReview');
};

export const deleteReview = (req, res, next) => {
  return res.send('createReview');
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
