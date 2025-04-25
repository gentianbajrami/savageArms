// routes/blogRoutes.js
import express from 'express';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';
import {
  getPublishedPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  updateComment,
  deleteComment,
  deletePost,
  addComment,
  toggleLike,
} from '../controller/blogsController.js';
import upload from '../middleware/multerMiddleware.js';

const router = express.Router();

router.get('/', getPublishedPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/:id', getPostById);

router.post(
  '/',
  upload.single('image'),
  authenticateUser,
  authorizePermissions('admin'),
  createPost
);
router.patch(
  '/:id',
  authenticateUser,
  updatePost
);
router.delete(
  '/:id',
  authenticateUser,
  deletePost
);

router.post(
  '/:id/comments',
  authenticateUser,
  addComment
);
router.patch(
  '/:id/comments/:commentId',
  authenticateUser,
  updateComment
);
router.delete(
  '/:id/comments/:commentId',
  authenticateUser,
  deleteComment
);

router.post(
  '/:id/like',
  authenticateUser,
  toggleLike
);

export default router;
