import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const hasFetched = useRef(false); // Track initial fetch

  // Fetch wishlist from backend
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      // Only update state if the fetched data is different
      if (JSON.stringify(response.data) !== JSON.stringify(wishlist)) {
        setWishlist(response.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [wishlist]);

  // Add to wishlist
  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/wishlist",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      // Update the wishlist state with the populated response
      setWishlist((prevWishlist) => [
        ...prevWishlist,
        ...response.data.products,
      ]);
      alert("Item added to the wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      // Send a request to the backend to remove the product from the wishlist
      await axios.delete(`http://localhost:5000/api/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      // Update the wishlist state by removing the product
      setWishlist((prevWishlist) => {
        const updatedWishlist = prevWishlist.map((wishlistItem) => ({
          ...wishlistItem,
          products: wishlistItem.products.filter(
            (product) => product._id !== productId
          ),
        }));
        return updatedWishlist;
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  // Clear wishlist
  const clearWishlist = async () => {
    try {
      await axios.delete("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      setWishlist([]); // Clear the wishlist state
    } catch (error) {
      console.error("Error clearing wishlist:", error);
    }
  };

  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};