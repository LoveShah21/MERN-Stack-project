const express = require('express');
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllFeedback);
router.post('/', authMiddleware, submitFeedback);

module.exports = router;