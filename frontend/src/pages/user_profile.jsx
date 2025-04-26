import React, { useEffect, useState } from 'react';
import UserNavigationCard from "../components/userNavigation";
import AddressForm from "../components/addressComponent";
import OrderComponent from "../components/orderComponent";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { getCurrentUser } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUser = async () => {
        try {  
          const userData = await getCurrentUser(); // Await the API call
          // Check if data is defined
          if (!userData) {
            throw new Error('No user data returned from the API');
          }
    
          // Safely set user state
          setUser(userData.name);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          navigate('/entry'); // Redirect to login page on error
        }
      };
    
      fetchUser();
    }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-3">
            <UserNavigationCard />
          </div>

          <div className="col-md-9" style={{ width: "900px" }}>
            {/* Greeting Section */}
            <div className="mt-2 mb-2">
              <h2>Hello,{user} </h2>
              <p>
                From your account dashboard, you can easily check & view your
                <strong> Recent Orders</strong>, manage your{" "}
                <strong>Shipping and Billing Addresses</strong> and edit your{" "}
                <strong>Password</strong> and <strong>Account Details</strong>.
              </p>
            </div>
            <OrderComponent />
            <AddressForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
