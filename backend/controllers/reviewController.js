const Review = require('../models/Review');
const User = require('../models/User');

// Add Review
const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { product} = req;
  const userId = req.user._id;

  const user = await User.findById(userId);

  // Validate input
  if (!rating || !comment) {
    return res.status(400).json({ message: 'Rating and comment are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
     // Check if the user has already reviewed the product
     const existingReview = await Review.findOne({ user: userId, product: product._id });
     if (existingReview) {
       return res.status(400).json({ message: 'You have already reviewed this product' });
     }

    // Create the review
    const review = await Review.create({
      user: {
        id: userId,
        name: user.name,
        email: user.email,
      },
      product: product._id,
      rating,
      comment,
    });

    // Add the review to the product's reviews array
    req.product.reviews.push(review._id);
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview };