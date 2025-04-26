import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { Navigate } from 'react-router-dom';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const isAdding = useRef(false);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart); // Set the cart state only if it's a valid array
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart'); // Clear invalid data from localStorage
      }
    }
  }, []);

  const addToCart = useCallback((product) => {
    if (isAdding.current) return; // Prevent double invocation
    isAdding.current = true;

    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Please login first');
      return <Navigate to='/entry' />;
    }

    setCart((prevCart) => {
      console.log('Previous cart state:', prevCart);

      // Check if the product already exists in the cart
      const existingProduct = prevCart.find((item) => item._id === product._id);

      let updatedCart;

      if (existingProduct) {
        // If the product exists, increment its quantity
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Reset the ref
      isAdding.current = false;

      // Return the updated cart to update the state
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      // Filter out the item to be removed
      const updatedCart = prevCart.filter((item) => item._id !== productId);

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      // Return the updated cart to update the state
      return updatedCart;
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCart((prevCart) => {
      // Update the quantity of the specified product
      const updatedCart = prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Return the updated cart to update the state
      return updatedCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]); // Clear the cart state
    localStorage.removeItem('cart'); // Remove the cart from localStorage
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};