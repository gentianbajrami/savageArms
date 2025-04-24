import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  orderTotal: { type: String, required: true },
  cartItems: [
    {
      itemId: mongoose.Schema.Types.ObjectId, // or String, depending on your data
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  numItemsInCart: {
    type: Number,
    required: true,
  },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model(
  'Order',
  orderSchema
);
