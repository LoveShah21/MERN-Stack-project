import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/relatedProducts.css";
import { CartContext } from "../components/cartContext";
import { WishlistContext } from "../components/wishlistContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt as halfStar,
  faStar as regularStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const ProductDetailPage = () => {
  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data.product);
        setReviews(response.data.product.reviews || []);
        setUserHasReviewed(response.data.userHasReviewed);
        setRelatedProducts(response.data.relatedProducts || []);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddReview = async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      alert("Please log in to post a review.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reviews/${productId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReviews([...reviews, response.data]);
      setRating(0);
      setComment("");
      setUserHasReviewed(true);
      alert("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      alert(error.response?.data?.message || "Failed to add review.");
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert("Product added to cart successfully");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      navigate("/cart");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon key={i} icon={solidStar} className="text-warning" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <FontAwesomeIcon key={i} icon={halfStar} className="text-warning" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon key={i} icon={farStar} className="text-warning" />
        );
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        {/* Product Section */}
        <section className="product-section">
          <div className="product-image-container">
            <img
              src={`http://localhost:5000/public${product.image}`}
              alt={product.name}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            {/* {product.price && (
              <div className="product-price">
                ₹{product.price}
                {product.originalPrice && (
                  <small className="text-muted text-decoration-line-through ms-2">
                    ₹{product.originalPrice}
                  </small>
                )}
              </div>
            )} */}

            <div className="product-actions">
              <button className="btn btn-buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button
                className="btn btn-primary btn-add-to-cart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-outline-secondary btn-wishlist"
                onClick={(e) => {
                  e.preventDefault();
                  try {
                    addToWishlist(product);
                  } catch (error) {
                    console.error("Failed to add to wishlist:", error);
                    alert("Unable to update wishlist. Please try again later.");
                  }
                }}
              >
                {(() => {
                  try {
                    return wishlist.some((w) =>
                      w.products.some((p) => p._id === product._id)
                    )
                      ? "In Wishlist"
                      : "Add to Wishlist";
                  } catch (error) {
                    console.error("Error checking wishlist status:", error);
                    return "Add to Wishlist"; // Default fallback text
                  }
                })()}
              </button>
            </div>

            <div className="product-meta">
              {product.category && (
                <div className="mb-2">
                  <strong>Category:</strong> {product.category.name}
                </div>
              )}
              {product.stock && (
                <div className="mb-2">
                  <strong>Availability:</strong>{" "}
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="description-section">
          <h3>Description</h3>
          <p className="mb-0">{product.description}</p>
        </section>

        {/* Reviews Section */}
        <section className="reviews-section">
          <h3>Customer Reviews</h3>

          {reviews.length === 0 ? (
            <div className="alert alert-info">
              No reviews yet. Be the first to review this product!
            </div>
          ) : (
            <div>
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-user">
                    {review.user?.name || "Anonymous"}
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="ms-2">{review.rating.toFixed(1)}</span>
                  </div>
                  <div className="review-date text-muted small mb-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                  <p className="review-comment mb-0">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add Review Form */}
          {!userHasReviewed && (
            <div className="review-form">
              <h4>Write a Review</h4>
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                >
                  <option value={0}>Select Rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Star{num !== 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Your Review</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleAddReview}
                disabled={!rating || !comment}
              >
                Submit Review
              </button>
            </div>
          )}
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section">
            <h3 className="related-products-title">You May Also Like</h3>
            <div className="related-products-container">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct._id} className="related-product-card">
                  <img
                    src={`http://localhost:5000/public${relatedProduct.image}`}
                    alt={relatedProduct.name}
                    className="related-product-image"
                  />
                  <div className="related-product-body">
                    <h5
                      className="related-product-title"
                      title={relatedProduct.name}
                    >
                      {relatedProduct.name}
                    </h5>
                    <Link
                      to={`/product/${relatedProduct._id}`}
                      className="btn btn-sm btn-primary related-product-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
