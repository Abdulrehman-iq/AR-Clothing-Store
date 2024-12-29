// components/TryOnButton/TryOnButton.jsx
import React from 'react';
import { FiCamera } from 'react-icons/fi';

const TryOnButton = () => {
  const handleTryOn = () => {
    // Implement try-on functionality
    alert('Try-On feature coming soon!');
  };

  return (
    <button
      onClick={handleTryOn}
      className="flex items-center space-x-2 px-4 py-2 bg-primary-700
               text-surface-light rounded-full hover:bg-primary-600
               transition-colors duration-300"
    >
      <FiCamera className="h-5 w-5" />
      <span>Try On</span>
    </button>
  );
};

export default TryOnButton;