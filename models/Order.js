import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  orderTotal: { type: String, required: true },
  cartItems: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Firearms',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
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
