import mongoose from 'mongoose';

const ReviwSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 200,
      minlength: 5,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Firearms',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  'Review',
  ReviwSchema
);
