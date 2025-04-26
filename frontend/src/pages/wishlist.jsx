import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { WishlistContext } from "../components/wishlistContext";
import { CartContext } from "../components/cartContext";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Swal from "sweetalert2";
import axios from "axios";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [justForYouProducts, setJustForYouProducts] = useState([]);

  useEffect(() => {
    const fetchJustForYouProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          params: {
            limit: 10,
          },
        });
        setJustForYouProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching Just For You products:", error);
      }
    };
    fetchJustForYouProducts();
  }, []);

  const moveAllToCart = () => {
    if (Array.isArray(wishlist)) {
      wishlist.forEach((wishlistItem) => {
        if (Array.isArray(wishlistItem.products)) {
          wishlistItem.products.forEach((product) => {
            addToCart(product);
          });
        }
      });
      Swal.fire({
        icon: "success",
        text: "All the products added to the cart successfully",
      });
      clearWishlist();
    } else {
      console.error("Wishlist is not an array:", wishlist);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Product added to cart successfully");
  };

  const totalProducts = (wishlist || []).reduce(
    (total, wishlistItem) => total + (wishlistItem.products?.length || 0),
    0
  );

  // Styles for scrollable containers
  const scrollContainerStyle = {
    width: '100%',
    overflowX: 'auto',
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none', /* IE/Edge */
    WebkitOverflowScrolling: 'touch',
    paddingBottom: '20px'
  };

  const scrollContainerInnerStyle = {
    display: 'flex',
    gap: '20px',
    width: 'max-content',
    minWidth: '100%'
  };

  const cardStyle = {
    flex: '0 0 auto',
    width: '250px'
  };

  // Responsive styles
  const responsiveStyles = {
    card: {
      '@media (max-width: 992px)': { width: '220px' },
      '@media (max-width: 768px)': { width: '200px' },
      '@media (max-width: 576px)': { width: '180px' }
    },
    image: {
      '@media (max-width: 768px)': { height: '180px' },
      '@media (max-width: 576px)': { height: '160px' }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {/* Wishlist Section */}
        <div className="mb-5">
          <h2 className="mb-4">Wishlist ({totalProducts})</h2>
          <div className="d-flex justify-content-between mb-3">
            <Button variant="outline-dark" onClick={moveAllToCart}>
              Move All To Bag
            </Button>
          </div>
          <div style={scrollContainerStyle}>
            <div style={scrollContainerInnerStyle}>
              {wishlist.map((wishlistItem) => {
                try {
                  return wishlistItem.products.map((product) => (
                    <div key={product._id} style={cardStyle}>
                      <Card className="border-0 shadow-sm" style={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                        <div style={{ position: 'relative' }}>
                          <Link to={`/products/${product._id}`}>
                            <Card.Img
                              variant="top"
                              src={`http://localhost:5000/public${product.image}`}
                              alt={product.name}
                              style={{ 
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px 8px 0 0',
                                ...responsiveStyles.image
                              }}
                            />
                          </Link>
                          <Button
                            variant="bg-dark"
                            size="sm"
                            style={{ position: 'absolute', top: 0, right: 0, margin: '8px', padding: 0, border: 0 }}
                            onClick={() => removeFromWishlist(product._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                        <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                          <Card.Title>{product.name}</Card.Title>
                          <Button
                            variant="dark"
                            style={{ width: '100%' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            Add To Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ));
                } catch (error) {
                  if (wishlist[0]?.products?.length > 0) {
                    return <span>No products added</span>;
                  } 
                }
              })}
            </div>
          </div>
        </div>

        {/* Just For You Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Just For You</h2>
            <Link to="/products">
              <Button variant="outline-dark">See All</Button>
            </Link>
          </div>
          <div style={scrollContainerStyle}>
            <div style={scrollContainerInnerStyle}>
              {justForYouProducts.map((product) => (
                <div key={product._id} style={cardStyle}>
                  <Card className="border-0 shadow-sm" style={{ height: '100%', display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                    <Link to={`/products/${product._id}`}>
                      <Card.Img
                        variant="top"
                        src={`http://localhost:5000/public${product.image}`}
                        alt={product.name}
                        style={{ 
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '8px 8px 0 0',
                          ...responsiveStyles.image
                        }}
                      />
                    </Link>
                    <Card.Body style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px' }}>
                      <Card.Title>{product.name}</Card.Title>
                      <Button
                        variant="dark"
                        style={{ width: '100%' }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
