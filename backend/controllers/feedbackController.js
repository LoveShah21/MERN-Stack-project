const Feedback = require('../models/Feedback');
const User = require('../models/User');

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    // Validate input
    if ( !message || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new feedback
    const feedback = new Feedback({ userId, name: user.name , email: user.email , message, rating });
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { submitFeedback, getAllFeedback };