const validateProduct = (req, res, next) => {
    const { name, description, price, image } = req.body;
  
    // Check if all required fields are present
    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Check if price is a valid number
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number' });
    }
  
    // If validation passes, proceed to the next middleware or controller
    next();
  };
  
  module.exports = validateProduct;