const Wishlist = require('../models/Wishlist');

// Add to wishlist
const addWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    // Find the user's wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // If no wishlist exists, create a new one
      wishlist = new Wishlist({ userId, products: [productId] });
    } else {
      // Check if the product is already in the wishlist
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      // Add the product to the wishlist
      wishlist.products.push(productId);
    }

    await wishlist.save();

    // Populate the products before sending the response
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
    res.status(201).json(populatedWishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error from wishlist', error: error.message });
  }
};

//remove from wishlist 
const removeWishlist = async (req, res) => {
  try {
    const productId = req.params.id; // Extract productId from request params
    const userId = req.user._id; // Extract userId from authenticated user

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove the product ID from the wishlist
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    // Save the updated wishlist to the database
    await wishlist.save();

    // Return success response with the updated wishlist
    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//Fetch wishlist from a user
const fetchWishlist = async (req, res) => {
  try {
      const userId = req.user._id;

      // Fetch wishlist items and populate product details
      const wishlistItems = await Wishlist.find({ userId }).populate('products');
      res.status(200).json(wishlistItems);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//Clear wishlist 
const clearWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Clear the products array in the wishlist
    wishlist.products = []; // Set the products array to an empty array

    // Save the updated wishlist to the database
    await wishlist.save();

    res.status(200).json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {addWishlist, removeWishlist, fetchWishlist, clearWishlist};