import mongoose from 'mongoose';

const LoginEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('LoginEvent', LoginEventSchema);
