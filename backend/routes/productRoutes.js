const express = require('express');
const { getProducts, getProductById, createProduct,deleteProduct, upload } = require('../controllers/productController');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
 
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', upload.single('image'), createProduct); // Add this line
router.delete('/:id', deleteProduct); //delete a product fromm the category

module.exports = router;
