import { Router } from 'express';
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controller/userController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', authorizePermissions('admin'), getApplicationStats);
router.patch('/update-user', checkForTestUser, validateUpdateUserInput, updateUser);
export default router;
