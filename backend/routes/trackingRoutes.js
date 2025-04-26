const express = require('express');
const router = express.Router();
const {createTracking, getTracking, updateTracking} = require('../controllers/trackingController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', createTracking);
router.get('/order/:orderId', getTracking);
router.put('/:orderId', updateTracking);

module.exports = router;