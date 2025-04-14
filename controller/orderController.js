import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { name, address } = req.body;
  console.log(req.body, req.query);
  const cart = await Cart.findOne({
    createdBy: req.user.userId,
  });
  if (!cart) {
    return res
      .status(404)
      .json({ msg: 'No cart found' });
  }
  const order = await Order.create({
    user: req.user.userId,
    orderItems: cart.cartItems,
    orderTotal: cart.cartTotal,
    numItemsInCart: cart.numItemsInCart,
    name,
    address,
  });
  return res
    .status(200)
    .json({ msg: 'create order', order });
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
