// components/AddToCart/AddToCart.jsx
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import Swal from 'sweetalert2';

const AddToCart = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      color: '#334155',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      iconColor: '#10B981',
      title: `${product.name} added to cart!`,
      html: `
        <div class="flex items-center gap-4 p-2">
          <img src="${product.image}" alt="${product.name}" 
               class="w-16 h-16 object-cover rounded-lg shadow-sm"/>
          <div class="text-left">
            <p class="font-medium text-slate-700">${product.name}</p>
            <p class="text-sm text-slate-600">${product.price}</p>
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
        popup: 'colored-toast shadow-lg border border-gray-100',
        title: 'text-xl font-bold text-slate-800',
        timerProgressBar: 'bg-emerald-400'
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center space-x-2 px-4 py-2 bg-interactive-hover
               text-primary-500 rounded-full hover:bg-accent-light
               transition-all duration-300 hover:scale-105"
    >
      <FiShoppingCart className="h-5 w-5" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddToCart;