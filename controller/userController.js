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

  // const hourlyLogins = await User.aggregate([
  //   { $match: { lastLogin: { $gte: dayAgo } } },
  //   {
  //     $group: {
  //       _id: {
  //         hour: { $hour: '$lastLogin' },
  //       },
  //       count: { $sum: 1 },
  //     },
  //   },
  //   { $sort: { '_id.hour': 1 } },
  // ]);

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
