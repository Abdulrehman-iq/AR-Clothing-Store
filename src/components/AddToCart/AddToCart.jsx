// components/AddToCart/AddToCart.jsx
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const AddToCart = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center space-x-2 px-4 py-2 bg-interactive-hover
               text-primary-900 rounded-full hover:bg-accent-light
               transition-colors duration-300"
    >
      <FiShoppingCart className="h-5 w-5" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddToCart;