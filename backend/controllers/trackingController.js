const Order = require('../models/Order');
const Tracking = require('../models/Tracking');

//Create a new tracking entry
const createTracking = async (req, res) => {
    const { orderId, trackingNumber, status, location, estimatedDelivery } = req.body;

    try {
        // Check if the order exists
        const order = await Order.findOne({ orderId: orderId });
        if (!order) return res.status(404).json({ error: 'Order not found' });

        // Create a new tracking entry
        const newTracking = new Tracking({ orderId, trackingNumber, status, location, estimatedDelivery, updates: [{ updateType: "confirmed", status, message: 'Order Placed.', timestamp: new Date() }], });
        await newTracking.save();
        res.status(201).json(newTracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get tracking status by order id
const getTracking = async (req, res) => {
    const { orderId } = req.params;
    try {
        const tracking = await Tracking.findOne({ orderId: orderId }) // Populate order details
        if (!tracking) return res.status(404).json({ error: 'Tracking not found' });
        res.status(200).json(tracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//update tracking status
const updateTracking = async (req, res) => {
    const { orderId } = req.params;
    const { updateType, status, message } = req.body;
    try {
        // Validate orderId is a string
        if (typeof orderId !== 'string') {
            return res.status(400).json({ error: 'orderId must be a string' });
        }

        const tracking = await Tracking.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        ) // Populate order details
        if (!tracking) return res.status(404).json({ error: 'Tracking not found' });

        tracking.updates.push({ updateType, status, message, timestamp: new Date() });
        tracking.status = status; // Update the overall status
        await tracking.save();

        const order = await Order.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        );
        res.status(200).json(tracking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createTracking, getTracking, updateTracking };