import { Router } from 'express';
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  getAllUsers,
  adminUpdateUser,
  createUser,
  toggleUserLock,
} from '../controller/userController.js';

import { ROLE } from '../utils/constants.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/app-stats', authorizePermissions(ROLE.ADMIN), getApplicationStats);
router.patch('/update-user', checkForTestUser, validateUpdateUserInput, updateUser);

// Admin routes
router.get('/', authorizePermissions(ROLE.ADMIN), getAllUsers);
router.post('/create-user', authorizePermissions(ROLE.ADMIN), createUser);
router.patch(
  '/admin-update-user/:id',
  authorizePermissions(ROLE.ADMIN),
  adminUpdateUser
);
router.patch('/lock/:id', authorizePermissions(ROLE.ADMIN), toggleUserLock);
export default router;
