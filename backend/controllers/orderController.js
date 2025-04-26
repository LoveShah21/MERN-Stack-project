const Order = require('../models/Order');
const User = require('../models/User');
const Tracking = require('../models/Tracking');
const sendEmail = require('../utils/sendEmail');

// Create Order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, orderNotes, addressId } = req.body; // Include address in the request body
    const userId = req.user._id;

    // Generate a unique order ID
    const orderId = `ORD${Date.now()}`;

    // Create the order
    const order = new Order({
      orderId,
      userId,
      products,
      totalPrice,
      status: 'Pending',
      orderNotes,
      address: addressId // Add the address to the order
    });

    await order.save();

    // Create tracking information for the order
    const trackingData = {
      orderId: order.orderId,
      trackingNumber: `TRACK-${Math.floor(Math.random() * 1000000)}`,
      status: 'Pending',
      location: 'Warehouse',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    };

    const tracking = new Tracking(trackingData);
    await tracking.save();

    // Fetch user email
    const user = await User.findById(userId);

    // // Send confirmation email
    await sendEmail({
      to: user.email,
      subject: 'Order Confirmation - Aqua Overseas',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total Price:</strong> ₹${totalPrice}</p>
        <p>We'll notify you as it ships. Track your order on the website.</p>
      `,
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });
    const track = await Tracking.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    if (order.status === 'Delivered') {
      return res.status(400).json({ message: 'Delivered orders cannot be cancelled' });
    }

    order.status = 'Cancelled';
    track.status = 'Cancelled';
    await order.save();
    await track.save();

    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error });
  }
};

// Get Order Status
const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ status: order.status });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order status', error });
  }
};

// Get All Orders for a User
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('address').sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, cancelOrder, getOrderStatus, getUserOrders, getAllOrders };