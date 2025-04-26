import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../components/wishlistContext";
import "../css/home.css";
import img1 from "../assets/home/landing.avif";
import img2 from "../assets/home/about_business.avif";
import img3 from "../assets/home/offerings.avif";

const Home = () => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const clearLocalStorageAfter24Hours = () => {
      const now = new Date().getTime();
      const lastClearTime = localStorage.getItem("lastClearTime");
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

      if (!lastClearTime || now - lastClearTime > TWENTY_FOUR_HOURS) {
        localStorage.clear();
        localStorage.setItem("lastClearTime", now.toString());
      }
    };

    clearLocalStorageAfter24Hours();
  }, []);

  // Fetch best-selling products
  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: { bestSelling: true, limit: 8 }, // Fetch best-selling products
        });
        setBestSellingProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching best-selling products:", error);
      }
    };
    fetchBestSellingProducts();
  }, []);

  // Fetch new arrivals
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products?newArrivals=true",
          {
            params: { newArrivals: true, limit: 8 }, // Fetch new arrivals
          }
        );
        setNewArrivals(response.data.products);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Navigate to products page with category filter
  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`); // Pass categoryId as a query parameter
  };

  return (
    <>
      <Navbar />
      <div
        className="bg-image d-flex align-items-center justify-content-start"
        style={{
          height: "100vh",
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="bg-white p-5 shadow"
          style={{
            maxWidth: "500px",
            marginLeft: "70px",
            borderLeft: "10px solid #0077C9",
          }}
        >
          <p
            className="text-uppercase text-muted mb-2"
            style={{ fontSize: "0.8rem" }}
          >
            Explore Aqua
          </p>
          <h2 className="fw-bold mb-3">
            Your Gateway to <br />
            High-Quality <br />
            Machineries & Parts
          </h2>
          <hr
            style={{
              width: "100px",
              border: "2px solid #0077C9",
              margin: "10px 0",
            }}
          />
          <p className="text-muted">
            Discover a vast array of machinery parts with Aqua, your go-to
            partner for seamless trading throughout India. Our comprehensive
            catalog features high-quality components tailored to meet your
            operational needs, accessible from a user-friendly e-commerce
            platform.
          </p>
          <Link to="contact-us">
            <button className="btn btn-primary mt-3">Contact Us Today</button>
          </Link>
        </div>
      </div>

      {/* // about business section */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Image and Overlay */}
          <div className="col-md-6 position-relative mb-4 mb-md-0">
            <img
              src={img2}
              alt="Machinery Room"
              className="img-fluid border rounded-2"
            />
            <div
              className="position-absolute text-white rounded-2 p-4"
              style={{
                bottom: "-20px",
                right: "40px",
                backgroundColor: "#00528C",
                maxWidth: "280px",
                zIndex: "10",
                boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              }}
            >
              <h3 className="fw-bold">Empowering Businesses</h3>
              <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                Your Source for Quality Machinery Parts
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-md-6">
            <p
              className="text-uppercase text-primary mb-1"
              style={{ fontSize: "0.8rem" }}
            >
              About Aqua Overseas
            </p>
            <h3 className="fw-bold mb-2">
              Discover Precision in <br /> Machinery Trading
            </h3>
            <hr
              style={{
                width: "120px",
                height: "3px",
                backgroundColor: "#0077C9",
                border: "none",
                margin: "10px 0",
              }}
            />
            <p className="text-muted">
              Explore an extensive selection of high-quality machinery parts
              catered to your business needs across India. Benefit from our
              seamless e-commerce platform that simplifies your sourcing process
              and enhances your operational efficiency.
            </p>

            <div className="row text-center text-md-start my-4">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-light rounded-circle p-3">
                    <i className="bi bi-shield-check text-primary fs-4"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Our Commitment</h6>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Quality and durability are at the core of our operations,
                      ensuring you receive only the best parts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-light rounded-circle p-3">
                    <i className="bi bi-eye text-primary fs-4"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Our Vision</h6>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Making high-quality machinery parts easily accessible for
                      all businesses, big or small.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-primary px-4">
              <a
                href="mailto:info@aquaoverseas.com"
                style={{ color: "white", textDecoration: "none" }}
              >
                Get in Touch
              </a>{" "}
            </button>
          </div>
        </div>
      </div>

      {/* our offerings section */}
      <div className="offerings-section bg-light text-center py-5 mt-5">
        <div
          className="bg-overlay"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img3})`,
          }}
        ></div>
        <div className="container">
          <h6 className="text-danger mb-2">OUR OFFERINGS</h6>
          <h2 className="fw-bold mb-3">
            Empowering Industries with Quality Machinery Parts
          </h2>
          <p className="mb-5">
            Seamlessly connect with the right machinery parts for your
            operational needs through Aqua, your trusted trading partner in
            India.
          </p>

          {/* First Row */}
          <div className="mx-auto" style={{ width: "70%" }}>
            <div className="row g-4 justify-content-center">
              <div className="col-md-4 d-flex h-100">
                <div className="bg-white text-start text-dark p-4 shadow rounded w-100 h-100">
                  <div className="mb-3">
                    <i className="bi bi-tools fs-1 text-primary"></i>
                  </div>
                  <h5 className="fw-bold">
                    Comprehensive Machinery Parts Catalog
                  </h5>
                  <p>
                    Explore our extensive range of machinery parts, tailored to
                    meet the diverse needs of industries across India.
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex h-100 lift-up">
                <div
                  className="text-start text-white p-4 shadow rounded w-100 h-100"
                  style={{ backgroundColor: "#00528C" }}
                >
                  <div className="mb-3">
                    <i className="bi bi-cart fs-1"></i>
                  </div>
                  <h5 className="fw-bold">User-Friendly E-Commerce Platform</h5>
                  <p>
                    Navigate effortlessly through our platform with detailed
                    descriptions and images to inform your purchasing decisions.
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex h-100">
                <div className="bg-white text-start text-dark p-4 shadow rounded w-100 h-100">
                  <div className="mb-3">
                    <i className="bi bi-lock fs-1 text-primary"></i>
                  </div>
                  <h5 className="fw-bold">Secure Checkout Process</h5>
                  <p>
                    Experience seamless transactions with our secure checkout,
                    ensuring that your purchases are hassle-free and protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="row g-4 justify-content-center mt-3">
              <div className="col-md-4 d-flex h-100">
                <div className="bg-white text-start text-dark p-4 shadow rounded w-100 h-100">
                  <div className="mb-3">
                    <i className="bi bi-headset fs-1 text-primary"></i>
                  </div>
                  <h5 className="fw-bold">Expert Customer Support</h5>
                  <p>
                    Our dedicated team is here to assist you with expert
                    guidance and support, ensuring your sourcing process is
                    smooth.
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex h-100 lift-up">
                <div
                  className="text-start text-white p-4 shadow rounded w-100 h-100"
                  style={{ backgroundColor: "#00528C" }}
                >
                  <div className="mb-3">
                    <i className="bi bi-people fs-1"></i>
                  </div>
                  <h5 className="fw-bold">Building Strong Partnerships</h5>
                  <p>
                    We focus on cultivating long-lasting relationships with our
                    clients, offering reliable support from initial contact to
                    after-sales.
                  </p>
                </div>
              </div>
              <div className="col-md-4 d-flex h-100">
                <div className="bg-white text-start text-dark p-4 shadow rounded w-100 h-100">
                  <div className="mb-3">
                    <i className="bi bi-recycle fs-1 text-primary"></i>
                  </div>
                  <h5 className="fw-bold">Commitment to Sustainability</h5>
                  <p>
                    We strive to minimize our environmental impact by
                    integrating sustainable practices in our operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse By Category Section */}
      <section className="category-section">
        <div className="container">
          <h2>Browse By Category</h2>
          <div className="category-scroll-container">
            {categories.map((category) => (
              <div
                key={category._id}
                className="category-card"
                onClick={() => handleCategoryClick(category._id)}
                role="button"
              >
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <h6 className="card-title">{category.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* best seller section */}
      <section className="product-section bg-light">
        <div className="container text-center">
          <p className="text-primary text-uppercase fw-bold small mb-1">
            Gallery
          </p>
          <h2>Discover Our Best Sellers</h2>
          <div className="product-scroll-container">
            {bestSellingProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <img
                    src={`http://localhost:5000/public${product.image}`}
                    alt={product.name}
                  />
                </Link>
                <div className="product-card-body">
                  <div className="product-card-title">
                    <span>{product.name}</span>
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="rounded-circle ms-auto"
                      style={{
                        color: (() => {
                          try {
                            // Check if the product exists in the wishlist
                            return wishlist
                              .flatMap((item) => item.products) // Flatten all products arrays
                              .some((item) => item._id === product._id) // Check if product exists
                              ? "red"
                              : "grey";
                          } catch (error) {
                            console.error(
                              "Error evaluating color condition:",
                              error
                            );
                            return "grey"; // Fallback color in case of an error
                          }
                        })(),
                        width: "23px",
                        height: "23px",
                        padding: "3px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(product);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="product-section">
          <div className="container">
            <h2>New Arrivals</h2>
            <div className="product-scroll-container">
              {newArrivals.map((product) => (
                <div className="product-card" key={product._id}>
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={`http://localhost:5000/public${product.image}`}
                      alt={product.name}
                    />
                  </Link>
                  <div className="product-card-body">
                    <h5 className="product-card-title">{product.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default Home;
