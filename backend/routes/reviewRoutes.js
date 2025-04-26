const express = require('express');
const { addReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const checkProductExists = require('../middleware/productMiddleware'); // Import the middleware
const router = express.Router();

router.post('/:id/reviews',authMiddleware, checkProductExists, addReview);

module.exports = router;