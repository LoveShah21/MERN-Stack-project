const express = require('express');
const {addWishlist, removeWishlist, fetchWishlist, clearWishlist} = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add to Wishlist
router.post('/', authMiddleware,addWishlist);

// Remove from Wishlist
router.delete('/:id', authMiddleware,removeWishlist);

// Fetch Wishlist for a User
router.get('/', authMiddleware, fetchWishlist);

//Clear Wishlist
router.delete('/', authMiddleware, clearWishlist);

module.exports = router;