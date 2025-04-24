import mongoose from 'mongoose';
import {
  FIREARMS_CALIBER,
  FIREARMS_MANUFACTURER,
  FIREARMS_MODEL,
  FIREARMS_TYPE,
} from '../utils/constants.js';

const FirearmsSchema = new mongoose.Schema(
  {
    fullName: String,
    photo: String,
    photoPublicId: String,
    features: String,
    caliber: {
      type: String,
      enum: Object.values(FIREARMS_CALIBER),
    },
    model: {
      type: String,
      enum: Object.values(FIREARMS_MODEL),
    },
    manufacturer: {
      type: String,
      enum: Object.values(FIREARMS_MANUFACTURER),
    },
    price: Number,
    stock: Number,
    description: String,
    capacity: Number,
    type: {
      type: String,
      enum: Object.values(FIREARMS_TYPE),
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  'Firearms',
  FirearmsSchema
);
