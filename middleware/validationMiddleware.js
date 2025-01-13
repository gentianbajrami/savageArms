import {
  body,
  validationResult,
} from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import UserModel from '../models/UserModel.js';

const withValidationErrors = validateValues => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors
          .array()
          .map(error => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput =
  withValidationErrors([
    body('firstName')
      .notEmpty()
      .withMessage('First Name is required'),
    body('lastName')
      .notEmpty()
      .withMessage('Last Name is required'),
    body('address')
      .notEmpty()
      .withMessage('Address is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async email => {
        const user = await UserModel.findOne({
          email,
        });
        if (user) {
          throw new BadRequestError(
            'email already exists!'
          );
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage(
        'Password must be at least 8 characters long'
      ),
  ]);

export const validateLoginInput =
  withValidationErrors([
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format'),
    body('password')
      .notEmpty()
      .withMessage('password is required'),
  ]);

const validateUpdateUserInput =
  withValidationErrors([
    body('firstName')
      .notEmpty()
      .withMessage('First Name is required'),
    body('lastName')
      .notEmpty()
      .withMessage('Last Name is required'),
    body('address')
      .notEmpty()
      .withMessage('Address is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async email => {
        const user = await UserModel.findOne({
          email,
        });
        if (user) {
          throw new BadRequestError(
            'email already exists!'
          );
        }
      }),
  ]);

export const validateCreateBlogInput =
  withValidationErrors([
    body('title')
      .notEmpty()
      .withMessage('Title is required'),
    body('content')
      .notEmpty()
      .withMessage('Content is required'),
  ]);
