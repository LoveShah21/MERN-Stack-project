const Product = require('../models/Product');
const Category = require('../models/Category');
const Wishlist = require('../models/Wishlist');
const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Save files in the "public/uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename
  },
});

const upload = multer({ storage });

// Get All Products
const getProducts = async (req, res) => {
  try {
    const { page, limit = 10, category, search, sort, bestSelling, newArrivals } = req.query;

    // Build the filter object
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    if (bestSelling) filter.bestSelling = true;

    // Filter for new arrivals based on createdAt timestamp
    if (newArrivals) {
      const currentDate = new Date();
      const daysThreshold = 30; // Products added in the last 7 days are considered new arrivals
      const thresholdDate = new Date(currentDate.setDate(currentDate.getDate() - daysThreshold));

      filter.createdAt = { $gte: thresholdDate }; // Filter products created after the threshold date
    }

    // Build the sort object
    const sortOptions = {};
    if (sort === 'price_asc') sortOptions.price = 1;
    if (sort === 'price_desc') sortOptions.price = -1;

    // Sort new arrivals by createdAt (newest first)
    if (newArrivals) {
      sortOptions.createdAt = -1; // Sort by createdAt in descending order (newest first)
    }

    // Fetch products with pagination, filtering, and sorting
    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('category');

    // Get the total count of products (for pagination)
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: 'reviews',
        select: 'rating comment user',
      })
      .populate('category', 'name'); // Populate the category field

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the authenticated user has already reviewed the product
    const userHasReviewed = req.user
      ? product.reviews.some((review) => review.user._id.toString() === req.user._id.toString())
      : false;

    // Fetch related products from the same category
    const relatedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id }, // Exclude the current product
    }).limit(8); // Limit the number of related products to 8

    res.json({ product, relatedProducts, userHasReviewed });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  const { name, description, price, category, bestSelling } = req.body;
  const image = `/uploads/${req.file.filename}`; // Relative path to the image

  // Check if the category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(404).json({ message: 'Category not found' });
  }

  // Validate input
  if (!name || !description || !image || !category) {
    console.log('Validation Failed: Missing fields'); // Log validation failure
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      bestSelling: bestSelling || false, // Set bestSelling value
    });

    // Add the product to the category's products array
    categoryExists.products.push(product._id);
    await categoryExists.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Error Creating Product:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

//delete a product from the category
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Remove the product from the category's products array
    const category = await Category.findById(product.category);
    if (category) {
      category.products = category.products.filter(
        (id) => id.toString() !== productId
      );
      await category.save();
    }

    // Remove the product from all wishlists
    const wishlists = await Wishlist.find({ products: productId });
    for (const wishlist of wishlists) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
      await wishlist.save();
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, deleteProduct, upload };