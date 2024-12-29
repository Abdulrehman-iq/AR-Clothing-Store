// components/TryOnButton/TryonButton.jsx
import React from 'react';
import { FiCamera } from 'react-icons/fi';
import Swal from 'sweetalert2';

const TryOnButton = () => {
  const handleTryOn = () => {
    Swal.fire({
      title: 'Virtual Try-On',
      html: `
        <div class="text-center">
          <div class="mb-4">
            <FiCamera class="h-12 w-12 mx-auto text-blue-500"/>
          </div>
          <p class="text-lg">Our Virtual Try-On feature is coming soon!</p>
          <p class="text-gray-600 mt-2">Experience clothes virtually before buying.</p>
        </div>
      `,
      icon: 'info',
      showConfirmButton: true,
      confirmButtonText: 'Got it!',
      confirmButtonColor: '#3B82F6',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
        popup: 'rounded-xl',
        title: 'text-xl font-bold text-gray-800',
        content: 'mt-4'
      },
      backdrop: `
        rgba(0,0,123,0.4)
        url("/assets/camera-pattern.png")
        left top
        repeat
      `
    });
  };

  return (
    <button
      onClick={handleTryOn}
      className="flex items-center space-x-2 px-4 py-2 bg-primary-700
               text-surface-light rounded-full hover:bg-primary-600
               transition-all duration-300 hover:scale-105"
    >
      <FiCamera className="h-5 w-5" />
      <span>Try On</span>
    </button>
  );
};

export default TryOnButton;