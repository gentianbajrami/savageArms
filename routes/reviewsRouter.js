import { Router } from 'express';
const router = Router();

import {
  createReview,
  getAllReviews,
  getAllReviewsForProduct,
  updateReview,
  deleteReview,
} from '../controller/reviewControler.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';
import { validateCreateReview } from '../middleware/validationMiddleware.js';

router
  .route('/')
  .post(
    authenticateUser,
    validateCreateReview,
    createReview
  )
  .get(
    authenticateUser,
    authorizePermissions('admin'),
    getAllReviews
  );
router.get(
  '/products/:id',
  getAllReviewsForProduct
);
router
  .route('/:id')
  .patch(
    authenticateUser,
    validateCreateReview,
    updateReview
  )
  .delete(authenticateUser, deleteReview);

export default router;
