const express = require('express');
const router = express.Router();
const {createOrder, cancelOrder, getOrderStatus, getUserOrders, getAllOrders} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Order
router.post('/create', authMiddleware, createOrder);

// Cancel Order
router.put('/cancel/:orderId', authMiddleware, cancelOrder);

// Get Order Status
router.get('/status/:orderId', authMiddleware, getOrderStatus);

// Get All Orders for a User
router.get('/user', authMiddleware, getUserOrders);

router.get('/', getAllOrders);

module.exports = router;