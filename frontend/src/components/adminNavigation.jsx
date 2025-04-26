import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/adminNavbar.css'; // Assuming you have a CSS file for styling

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear session, remove tokens, etc.)
    localStorage.clear();
    sessionStorage.clear();
    alert('User logged out');
    navigate('/entry'); // Redirect to login page after logout
  };

  return (
    <div className="admin-navbar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/Feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/admin/SendNotification">Notification</Link>
        </li>
        <li>
          <Link to="/admin/Orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin/CreateProduct">Create Product</Link>
        </li>
        <li>
          <Link to="/admin/DeleteProduct">Delete Product</Link>
        </li>
        <li>
          <Link to="/admin/updateTrack">Update Tracking</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Log Out</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;