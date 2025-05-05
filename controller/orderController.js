import { BadRequestError } from '../errors/customErrors.js';
import Cart from '../models/Cart.js';
import FirearmsModel from '../models/FirearmsModel.js';
import Order from '../models/Order.js';
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51OdDEELJvWI9WaXNafdyd7xiFfDw7f70xL09cQPpzek6mJ09566siijcW44ZBNS4hmDCLi2qFHqhtAjnlFJQtp9P00PyNpzxT0'
);

export const createCheckoutSession = async (
  req,
  res
) => {
  const { name, address } = req.body;
  const cart = await Cart.findOne({
    createdBy: req.user.userId,
  }).populate('cartItems.product');

  if (cart.cartItems.length === 0) {
    return res
      .status(400)
      .json({ msg: 'No items in cart' });
  }
  const cartItems = cart.cartItems;
  console.log(cartItems);

  const session =
    await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name:
              item?.product?.fullName ||
              'Default Product Name',
          },
          unit_amount: item.price * 100, // in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      customer_email: req.user.email,
      success_url: `http://localhost:5173/confirm-order?sessionId={CHECKOUT_SESSION_ID}&name=${name}&address=${address}`,
      cancel_url: `http://localhost:5173/cart`,
      metadata: {
        userId: req.user.userId,
        name,
        address,
      },
    });
  console.log(session);

  res.json({ url: session.url });
};

export const confirmOrder = async (req, res) => {
  const { sessionId, name, address } = req.body;

  const session =
    await stripe.checkout.sessions.retrieve(
      sessionId
    );
  console.log(sessionId, session);
  if (session.payment_status !== 'paid') {
    return res
      .status(400)
      .json({ msg: 'Payment not completed' });
  }

  const cart = await Cart.findOne({
    createdBy: req.user.userId,
  });

  if (!cart) {
    return res
      .status(404)
      .json({ msg: 'No cart found' });
  }

  await Order.create({
    user: req.user.userId,
    cartItems: cart.cartItems,
    orderTotal: cart.cartTotal,
    numItemsInCart: cart.numItemsInCart,
    name,
    address,
    status: 'paid',
    paymentIntentId: session.payment_intent,
  });

  const orders = await Order.find({
    user: req.user.userId,
  });

  for (const item of cart.cartItems) {
    const product = item.product;
    if (product.stock < item.quantity) {
      throw new BadRequestError(
        `Not enough stock for ${product.fullName}`
      );
    }

    await FirearmsModel.updateOne(
      { _id: product },
      { $inc: { stock: -item.quantity } }
    );
  }

  await cart.deleteOne();

  res.status(200).json({
    msg: 'Order created successfully',
    orders,
  });
};

export const getAllOrders = async (req, res) => {
  const query = { user: req.user.userId };
  if (req.user.role === 'admin') {
    delete query.user;
  }

  const orders = await Order.find(query);
  return res
    .status(200)
    .json({ msg: 'get all orders', orders });
};
