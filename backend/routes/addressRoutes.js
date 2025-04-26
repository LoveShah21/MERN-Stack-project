const express = require('express');
const { addAddress, getAddresses, updateAddress, deleteAddress } = require('../controllers/addressController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new address
router.post('/',authMiddleware, addAddress);

// Get all addresses for a user
router.get('/getAddress', authMiddleware, getAddresses);

//update address
router.put('/updateAddress', authMiddleware, updateAddress);

// Delete an address
router.delete('/:id', authMiddleware, deleteAddress);

module.exports = router;