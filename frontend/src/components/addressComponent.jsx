import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = () => {
  const [userAddresses, setUserAddresses] = useState([]); // State to store an array of addresses

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get("http://localhost:5000/api/address/getAddress", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data); // Debugging: Log the API response
        setUserAddresses(response.data.addresses || []); // Set the addresses
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  // Function to delete an address
  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`http://localhost:5000/api/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the UI by removing the deleted address
      setUserAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address._id !== addressId)
      );

      console.log("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div>
      <h5>Saved Addresses</h5>
      {userAddresses.length > 0 ? (
        userAddresses.map((address, index) => (
          <div key={address._id} className="mt-3 border p-3 rounded-2">
            <h6>Delivery Address {index + 1}:</h6>
            <p>
              {address.firstName} {address.lastName}
              <br />
              {address.companyName && <>{address.companyName}<br /></>} {/* Display company name if it exists */}
              {address.address}
              <br />
              {address.city}, {address.state}, {address.country}
              <br />
              {address.zipcode}
              <br />
              Email: {address.email}
              <br />
              Phone: {address.phoneNo}
            </p>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteAddress(address._id)} // Call delete function
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No addresses found.</p>
      )}
    </div>
  );
};

export default AddressForm;

