// components/AddToCart/AddToCart.jsx
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AddToCart = ({ product, customClasses = '' }) => {
  const { addToCart, openCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();  // Prevent default button behavior
    e.stopPropagation(); // Prevent event bubbling to parent elements
    
    addToCart(product);
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      color: '#334155',
      showCloseButton: true, // Add close button
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      iconColor: '#10B981',
      title: `${product.name} added to cart!`,
      html: `
        <div class="flex items-center gap-4 p-2">
          <img src="${product.image}" alt="${product.name}" 
               class="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-100"/>
          <div class="text-left">
            <p class="font-medium text-slate-700">${product.name}</p>
            <p class="text-sm text-slate-600">${typeof product.price === 'number' ? 'Rs ' + product.price.toLocaleString() : product.price}</p>
             
          </div>
        </div>
      `,
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster'
      },
      customClass: {
        popup: 'colored-toast shadow-xl border border-gray-100 rounded-lg',
        title: 'text-lg font-bold text-slate-800',
        timerProgressBar: 'bg-emerald-400',
        closeButton: 'text-slate-400 hover:text-slate-600 focus:outline-none',
        container: 'toast-container'
      },
      // Add global function to handle "View Cart" button click
      willOpen: () => {
        window.viewCart = () => {
          Toast.close();
          openCart();
        }
      }
    });
  };

  return (
    <button
      type="button" // Explicitly set button type
      onClick={handleAddToCart}
      className={`flex items-center space-x-2 px-4 py-2 bg-interactive-hover
               text-primary-500 rounded-full hover:bg-accent-light
               transition-all duration-300 hover:scale-105 ${customClasses}`}
    >
      <FiShoppingCart className="h-5 w-5" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddToCart;