const Product = require('../models/Product');

// Middleware to check if a product exists
const checkProductExists = async (req, res, next) => {
  const productId = req.params.id;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    // If the product does not exist, return a 404 error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Attach the product to the request object
    req.product = product;

    // Proceed to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = checkProductExists;