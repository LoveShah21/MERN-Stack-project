const Address = require('../models/Address');
const User = require('../models/User');

// Add a new address
const addAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName, companyName, address, city, state, country, zipcode, email, phoneNo } = req.body;    
  
      // Create new address
      const newAddress = new Address({ userId, firstName, lastName, companyName, address, city, state, country, zipcode, email, phoneNo });
      await newAddress.save();

      // Add the new address to the user's addresses array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { addresses: newAddress } },
      { new: true }
    );
      return res.status(201).json({
        success: true,
        message: "Address created successfully",
        address: user.addresses,
      });

  } catch (error) {
    console.error("Error creating/updating address:", error);
    res.status(500).json({
      success: false,
      message: "Error creating/updating address",
      error: error.message,
    });
  }
};

//update the address
const updateAddress = async (req, res) =>{
  try{
    const userId = req.user._id;
    const { firstName, lastName, companyName, address, city, state, country, zipcode, email, phoneNo } = req.body;

     // Check if an address already exists for the user
     let address1 = await Address.findOne({ userId });

      // Update existing address
      address1 = await Address.findOneAndUpdate(
        { userId }, 
        { firstName, lastName, companyName, address, city, state, country, zipcode, email, phoneNo }, 
        {new: true}
      );
      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        address,
      });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error: error.message,
    });
  }
};


// Get all addresses for a user
const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated request

    // Find the user and populate the addresses field
    const user = await User.findById(userId).populate("addresses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ addresses: user.addresses }); // Return the populated addresses
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Error fetching addresses" });
  }
};



// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the authenticated request
    const addressId = req.params.id; // Get the address ID from the URL params

    // Find and delete the address
    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId, // Ensure the address belongs to the logged-in user
    });

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found or unauthorized" });
    }

    // Remove the address ID from the user's addresses array
    await User.findByIdAndUpdate(userId, {
      $pull: { addresses: addressId }, // Remove the address ID from the array
    });

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Error deleting address" });
  }
};

module.exports = { addAddress, getAddresses, deleteAddress, updateAddress };