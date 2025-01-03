import { Router } from 'express';
import { register, login, logout } from '../controller/authController.js';
const router = Router();
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/validationMiddleware.js';

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/logout', logout);

export default router;
