// NavigationCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/userNavigationCard.css';

const UserNavigationCard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user-related data (if stored in localStorage/sessionStorage)
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login page or show a confirmation
    alert("You have been logged out.");
    navigate('/entry'); // Adjust the path as needed
  };
  return (
    <div className="card">
      <div className="card-body">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link hover-effect rounded-1" to="/profile/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link hover-effect rounded-1" to="/profile/dashboard/orderHistory">Order History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link hover-effect rounded-1" to="/cart">Shopping Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link hover-effect rounded-1" to="/wishlist">Wishlist</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link hover-effect rounded-1" to="/profile/dashboard/address"> Address</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link hover-effect rounded-1" to="/profile/dashboard/settings">Settings</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link hover-effect rounded-1 d-flex justify-content start" onClick={handleLogout} style={{width:'100%'}}>Log-out</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavigationCard;
