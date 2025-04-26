import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { WishlistContext } from "../components/wishlistContext";
import { SearchContext } from "../components/SearchContext";
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useNavigate
import "../css/products.css";
import { CartContext } from "../components/cartContext";

const Product = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { searchQuery } = useContext(SearchContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  // Fetch products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products", {
        params: {
          page: currentPage,
          limit: 9,
          category: selectedCategory,
          search: searchQuery,
          sort: sortOption,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from the backend
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

  // Update selectedCategory if location.state?.categoryId exists
  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [currentPage, categoryId]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, sortOption, currentPage, categoryId]); // Depend on these values

  const handleAddToCart = (product) => {
    addToCart(product); // Add the specific product to the cart
    alert("product added to cart successfully");
  };

  return (
    <>
      <Navbar />
      <div>
        {/* Main Section */}
        <div className="container mt-4">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3">
              {/* Category Filter */}
              <div className="mb-4">
                <h5>Filter by Category</h5>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting Options */}
              {/* <div className="mb-4">
                <h5>Sort By</h5>
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Most Popular</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div> */}
            </div>

            {/* Product Grid */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Our Products</h4>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="text-center">
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  <p>Loading...</p>
                </div>
              ) : (
                <div className="row">
                  {products.map((product) => (
                    <div
                      className="col-md-4 mb-4"
                      key={product._id}
                      onClick={() => navigate(`/products/${product._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card product-card">
                        <div className="position-relative">
                          <img
                            src={`http://localhost:5000/public${product.image}`}
                            className="card-img-top"
                            alt={product.name}
                          />
                        </div>
                        <div className="card-body">
                          <div className="d-flex">
                            <h5 className="card-title ms-1 justify-content-start">
                              {product.name}
                            </h5>
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
                          {/* <p className="card-text text-muted">
                            ₹ {product.price}
                          </p> */}
                          <Button
                            variant="dark"
                            className="w-100"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event propagation
                              handleAddToCart(product);
                            }}
                          >
                            Add To Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <nav>
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
