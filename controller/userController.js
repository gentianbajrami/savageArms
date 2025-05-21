import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Firearm from '../models/FirearmsModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const firearms = await Firearm.countDocuments();

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const recentLogins = await User.countDocuments({
    lastLogin: { $gte: dayAgo },
  });

  const hourlyLogins = await User.aggregate([
    {
      $match: {
        lastLogin: { $gte: dayAgo },
      },
    },
    {
      $group: {
        _id: {
          $dateToParts: {
            date: '$lastLogin',
            timezone: 'Europe/Belgrade',
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        hour: '$_id.hour',
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { hour: 1 },
    },
  ]);

  res.status(StatusCodes.OK).json({ users, firearms, recentLogins, hourlyLogins });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};

// Additional functions for user management
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role, address } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new BadRequestError('Email already in use');
  }

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
    address,
  });

  const userWithoutPassword = newUser.toJSON();
  res.status(StatusCodes.CREATED).json({ user: userWithoutPassword });
};

export const adminUpdateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, role, address } = req.body;

  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.role = role || user.role;
  user.address = address || user.address;

  await user.save();

  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) throw new NotFoundError('User not found');

  await user.deleteOne();
  res.status(StatusCodes.OK).json({ msg: 'User deleted' });
};
