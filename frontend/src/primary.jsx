import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa"; // Icons for Sign Up and Sign In
import img1 from "./assets/landing/image.png";
import logo from "./assets/logo/preview.png";

import { getCurrentUser } from "./utils/api";

import LoginButtons from './components/loginButtons';
import SignUp from "./signup"; // Import the SignUp component
import SignIn from "./signin"; // Import the SignIn component
import ForgotPassword from "./forgotPass";
import VerifyCode from "./verifyCode";
import ResetPassword from "./resetPass";
import Home from "./pages/home";
import Product from "./pages/product";
import ProductDetails from "./pages/singleProduct";
import About from "./pages/about_us";
import Our_services from "./pages/our_services";
import ProjectConsultancy from "./pages/project_consultancy";
import Contact from "./pages/contact_us";
import TrackOrder from "./pages/trackorder";
import Cart from "./pages/cart";
import Address from "./pages/storeAddress";
import SuccessMessage from "./pages/success";
import UserProfile from "./pages/user_profile";
import OrderHistory from "./pages/orderHistory";
import { ProtectedRoute } from "./components/ProtectedRoute";
import WishlistPage from "./pages/wishlist";
import { WishlistProvider } from "./components/wishlistContext";
import { CartProvider } from "./components/cartContext";
import SearchProvider from "./components/SearchContext";

// User profile routes
import DisplayAddress from "./pages/Address";
import ProfileSettings from "./pages/profileSettings";

// Admin pages import
import UpdateTracking from "./admin/updateTracking";
import CreateProduct from "./admin/createProduct";
import DeleteProduct from "./admin/deleteProduct";
import Feedback from "./admin/feedbacks";
import Orders from "./admin/Orders";
import SendNotification from "./admin/sendNotifications";

// company policies
import PrivacyPolicy from './pages/privacyPolicy'
import TermsOfService from './pages/termsAndServices'

import './styles/primary.css'

function Primary() {
  // const [user, setUser] = useState(null);

  return (
    <SearchProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Route for the Home Page */}
              <Route
                path="/entry"
                element={
                  <div className="container-fluid vh-100 d-flex justify-content-evenly align-items-center bg-light">
                    <div className="row">
                      <div
                        className="col"
                        style={{
                          backgroundImage: `url(${img1})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          height: "500px", // Adjust height as needed
                          width: "600px",
                          display: "flex", // Enable Flexbox
                          justifyContent: "center", // Center horizontally
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={logo}
                          alt="company logo"
                          style={{ width: "400px", height: "100px" }}
                        />
                      </div>
                      {/* Sign Up and Sign In Buttons with Icons */}
                      <div className="col text-center my-auto">
                        <div className="mb-4">
                          <Link
                            to="/signup"
                            className="btn btn-primary btn-lg mx-2 rounded-pill"
                            style={{width: '40%'}}
                          >
                            <FaUserPlus className="me-2" /> {/* Sign Up Icon */}
                            Sign Up
                          </Link>
                          <Link
                            to="/signin"
                            className="btn btn-primary btn-lg mx-2 rounded-pill"
                            style={{width: '40%'}}
                          >
                            <FaSignInAlt className="me-2" />{" "}
                            {/* Sign In Icon */}
                            Sign In
                          </Link>
                        </div>

                        {/* OR Divider */}
                        <div className="d-flex align-items-center justify-content-center mb-4">
                          <hr className="w-25" />
                          <span className="mx-3">OR</span>
                          <hr className="w-25" />
                        </div>

                        {/* Social Icons */}
                          <LoginButtons />
                      </div>
                    </div>
                  </div>
                }
              />

              {/* Route for the Sign Up Page */}
              <Route path="/signup" element={<SignUp />} />

              {/* Route for the Sign In Page */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify" element={<VerifyCode />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Product />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/our-services" element={<Our_services />} />
              <Route
                path="/project-consultancy"
                element={<ProjectConsultancy />}
              />
              <Route path="/contact-us" element={<Contact />} />
              <Route
                path="/track/trackorder/:orderId"
                element={<TrackOrder />}
              />
              <Route path="/cart/success" element={<SuccessMessage />} />

              {/* User profile routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/storeAddress" element={<Address />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/profile/dashboard/" element={<UserProfile />} />
                <Route
                  path="/profile/dashboard/orderHistory"
                  element={<OrderHistory />}
                />
                <Route
                  path="/profile/dashboard/settings"
                  element={<ProfileSettings />}
                />
                <Route
                  path="/profile/dashboard/address"
                  element={<DisplayAddress />}
                />
              </Route>

              {/* Admin routes */}
              <Route element={<ProtectedRoute roleRequired="admin" />}>
                <Route path="/admin/updateTrack" element={<UpdateTracking />} />
                <Route
                  path="/admin/CreateProduct"
                  element={<CreateProduct />}
                />
                <Route
                  path="/admin/DeleteProduct"
                  element={<DeleteProduct />}
                />
                <Route path="/admin/Feedback" element={<Feedback />} />
                <Route path="/admin/Orders" element={<Orders />} />
                <Route
                  path="/admin/SendNotification"
                  element={<SendNotification />}
                />
              </Route>

              {/* company policy routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-services" element={<TermsOfService />} />
            </Routes>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </SearchProvider>
  );
}

export default Primary;

