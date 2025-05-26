// context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Add state for cart drawer visibility

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    
    // Open the cart when adding items
    openCart();
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Fixed getCartTotal function that handles both string and number price formats
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      let itemPrice;
      
      if (typeof item.price === 'number') {
        // If price is already a number, use it directly
        itemPrice = item.price;
      } else if (typeof item.price === 'string') {
        // If price is a string (e.g., "Rs 1,499"), extract the numeric value
        itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      } else {
        // Fallback if price is neither a string nor a number
        itemPrice = 0;
      }
      
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems,
      isOpen,
      openCart,
      closeCart,
      addToCart, 
      removeFromCart, 
      updateQuantity,
      getCartTotal,
      itemCount: cartItems.reduce((total, item) => total + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;