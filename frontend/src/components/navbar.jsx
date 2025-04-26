import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../components/SearchContext';
import logo from '../assets/logo/preview.png';
import user from '../assets/navbar/user.png';
import bag from '../assets/navbar/bag.png';
import wishlist from '../assets/navbar/wishlist.png';
import search1 from '../assets/navbar/search1.png';
import '../css/navbar.css';

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/products'); // Navigate to the products page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Company Logo"
            className="image-fluid"
            style={{ maxWidth: '250px', height: 'auto' }}
          />
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Icons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 " style={{ fontSize: 18 }}>
            <li className="nav-item" key="home">
              <Link className="nav-link custom" style={{ transition: 'all 0.4s ease' }} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item" key="about-us">
              <Link className="nav-link custom" style={{ transition: 'all 0.4s ease' }} to="/about-us">
                About Us
              </Link>
            </li>
            <li className="nav-item" key="products">
              <Link className="nav-link custom" style={{ transition: 'all 0.4s ease' }} to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item" key="our-services">
              <Link className="nav-link custom" style={{ transition: 'all 0.4s ease' }} to="/our-services">
                Our Services
              </Link>
            </li>
            <li className="nav-item" key="contact-us">
              <Link className="nav-link custom" style={{ transition: 'all 0.4s ease' }} to="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Search Bar with Icon */}
          <form className="d-flex me-3 search-bar" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control border-secondary rounded-start search-input"
                placeholder="What are you looking for?"
                style={{ border: 'none', background: '#ECECF0', width: '210px' }}
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary rounded-end search-button"
                style={{ border: 'none', background: '#ECECF0' }}
                type="submit"
              >
                <img src={search1} alt="search"></img>
              </button>
            </div>
          </form>

          {/* Icons for Profile, Wishlist, and Bag */}
          <ul className="navbar-nav">
            <li className="nav-item" key="profile">
              <Link className="nav-link" to="/profile/dashboard">
                <img src={user} alt="profile"></img>
              </Link>
            </li>
            <li className="nav-item" key="wishlist">
              <Link className="nav-link" to="/wishlist">
                <img src={wishlist} alt="wishlist"></img>
              </Link>
            </li>
            <li className="nav-item" key="cart">
              <Link className="nav-link" to="/cart">
                <img src={bag} alt="bag"></img>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;