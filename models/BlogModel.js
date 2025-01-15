import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  date: { type: Date, default: Date.now },
  image: String,
  imagePublicId: String,
});

export default mongoose.model('Blog', blogSchema);
