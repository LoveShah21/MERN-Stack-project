const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const svgCaptcha = require('svg-captcha');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const addressRoutes = require('./routes/addressRoutes'); 
const contactRoutes = require('./routes/contactRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');


const cors = require('cors');

connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));

let captchaData = '';
//generate captcha
app.get('/api/captcha', (req, res) =>{
  const captcha = svgCaptcha.create();
  captchaData = captcha.text;
  res.type('svg');
  res.status(200).send(captcha.data);
});

//validate captcha
app.post('/api/validate-captcha', (req, res) => {
  const { captchaInput } = req.body;
  if (captchaInput === captchaData) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid captcha' });
  }
});


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/address', addressRoutes); 
app.use('/api/contact', contactRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
