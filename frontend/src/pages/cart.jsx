import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from '../components/cartContext';
import { WishlistContext } from '../components/wishlistContext';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import FeedbackModal from "../components/FeedbackModal";
import axios from 'axios';

const Cart = ({ userId }) => {
  const [total, setTotal] = useState(0);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]); // Array of user addresses
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Selected address ID
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);
  const [orderNotes, setOrderNotes] = useState(''); // State for order notes
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const subTotalRef = useRef(0);
  const taxRate = 0.18;
  let discount = 0;

  // Fetch captcha image from the server
  const fetchCaptcha = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/captcha', {
        responseType: 'blob',
        withCredentials: true
      });
      const imageUrl = URL.createObjectURL(response.data);
      setCaptchaImage(imageUrl);
    } catch (error) {
      console.error('Error fetching captcha:', error);
    }
  };

  // Fetch user addresses
  const fetchUserAddresses = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:5000/api/address/getAddress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserAddresses(response.data.addresses); // Set the list of addresses
      if (response.data.addresses.length > 0) {
        setSelectedAddressId(response.data.addresses[0]._id); // Select the first address by default
      }
    } catch (error) {
      console.error('Error fetching user addresses:', error);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!selectedAddressId && !useDifferentAddress) {
      alert('Please select an address before proceeding to checkout.');
      navigate('/storeAddress');
      return;
    }

    // Fetch and show captcha
    await fetchCaptcha();
    setShowCaptcha(true);
  };

  // Validate captcha and proceed with order placement
  const handleCaptchaSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/validate-captcha', {
        captchaInput,
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setShowCaptcha(false);
        setLoading(true);

        const token = localStorage.getItem('auth_token');
        const products = cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        }));

        console.log(total);
        // Create the order
        const orderResponse = await axios.post(
          'http://localhost:5000/api/orders/create',
          { products, totalPrice : '-', orderNotes, addressId: selectedAddressId, },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (orderResponse.data.order) {
          const orderId = orderResponse.data.order.orderId;

          // Create tracking information for the order
          const trackingData = {
            orderId: orderId,
            trackingNumber: `TRACK-${Math.floor(Math.random() * 1000000)}`,
            status: 'Pending',
            location: 'Warehouse',
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          };

          const trackingResponse = await axios.post(
            'http://localhost:5000/api/tracking',
            trackingData
          );

          if (trackingResponse.data) {
            console.log('Tracking created successfully', trackingResponse.data);
          }

          clearCart();
          setOrderPlaced(true);
          setShowFeedbackModal(true);
        }
      } else {
        alert('Invalid captcha. Please try again.');
      }
    } catch (error) {
      console.error('Error validating captcha:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    if (orderPlaced) {
      navigate('/cart/success');
    }
  };

  // Navigate to the address storage page
  const handleDifferentAddressClick = () => {
    navigate('/storeAddress');
  };

  useEffect(() => {
    calculateTotal();
    fetchUserAddresses(); // Fetch user addresses when the component mounts
  }, [cart]);

  const calculateTotal = () => {
    let subTotal = 0;
    cart.forEach((item) => {
      subTotal += item.price * item.quantity;
    });
  
    const tax = subTotal * taxRate;
    const calculatedTotal = subTotal - discount + tax;
  
    setTotal(calculatedTotal.toFixed(2)); // Update the state
  
    // subTotalRef.current.textContent = `₹${subTotal.toFixed(2)}`;
    // document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
    // document.getElementById("total").textContent = `₹${calculatedTotal.toFixed(2)} INR`;
  };

  const adjustQuantity = (itemId, adjustment) => {
    const item = cart.find((item) => item._id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + adjustment);
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          {/* Cart Section */}
          <div className="col-md-8">
            <div className="card p-3" style={{width: '100%'}}>
              <h5 className="mb-4">Shopping Cart</h5>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub-total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <Link to={`/products/${item._id}`}>
                            <img
                              className="img-fluid"
                              src={`http://localhost:5000/public${item.image}`}
                              alt={item.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                        </td>
                        <td>
                          <Link to={`/products/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {item.name}
                          </Link>
                        </td>
                        <td>-{item.price}</td>
                        <td>
                          <div className="input-group w-50 border rounded-2">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => adjustQuantity(item._id, -1)}
                              style={{ border: 'none' }}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="form-control text-center"
                              style={{ border: 'none' }}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => adjustQuantity(item._id, 1)}
                              style={{ border: 'none' }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeFromCart(item._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="d-flex justify-content-between">
                <Link to="/products" className="btn btn-outline-primary">
                  &#10229; Return to Shop
                </Link>
              </div>
            </div>

            {/* Textarea for Order Notes */}
            <div className="row mt-5 shadow p-3 rounded-2">
                <label htmlFor="orderNotes" className="form-label">Order Notes:</label>
                <textarea
                  id="orderNotes"
                  className="form-control"
                  rows="3"
                  placeholder="Add dimensions of the particular part..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                ></textarea>
              </div>
          </div>

          {/* Summary Section */}
          <div className="col-md-4">
            <div className="card p-3 mb-3" style={{width: '100%'}}>
              {/* <h5>Cart Total</h5>
              <div className="d-flex justify-content-between">
                <span>Sub-total:</span>
                <span ref={subTotalRef}>₹0.00</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Discount:</span>
                <span> - </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tax:</span>
                <span id="tax">₹0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span id="total">NA</span>
              </div> */}
              {userAddresses.length > 0 && (
                <div className="mt-3">
                  <h6>Select Delivery Address:</h6>
                  {userAddresses.map((address) => (
                    <div key={address._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        id={`address-${address._id}`}
                        value={address._id}
                        checked={selectedAddressId === address._id}
                        onChange={() => setSelectedAddressId(address._id)}
                      />
                      <label className="form-check-label" htmlFor={`address-${address._id}`}>
                        {address.firstName} {address.lastName}, {address.address}, {address.city}, {address.state}, {address.country}, {address.zipcode}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="useDifferentAddress"
                  checked={useDifferentAddress}
                  onChange={(e) => {
                    setUseDifferentAddress(e.target.checked);
                    if (e.target.checked) {
                      handleDifferentAddressClick(); // Navigate to the address storage page
                    }
                  }}
                />
                <label className="form-check-label" htmlFor="useDifferentAddress">
                  Ship to a different address
                </label>
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
              >
                {loading ? 'Processing...' : 'Request for quotation'}
              </button>
              {showCaptcha && (
                <div className="mt-3">
                  <div className="mb-2 d-flex">
                    <strong className="me-2">Captcha:</strong>
                    <img src={captchaImage} alt="Captcha" style={{ width: '150px', height: '50px' }} />
                    {/* Refresh Button */}
                    <button
                      className="btn ms-auto"
                      onClick={fetchCaptcha}
                      title="Refresh Captcha"
                      style={{border: 'none'}}
                    >
                      &#x21bb; {/* Refresh icon */}
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter captcha"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                  <button
                    className="btn btn-dark w-100 mt-2"
                    onClick={handleCaptchaSubmit}
                  >
                    Submit Captcha
                  </button>
                </div>
              )}
              <FeedbackModal
                show={showFeedbackModal}
                handleClose={handleCloseFeedbackModal}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;