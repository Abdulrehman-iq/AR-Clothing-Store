import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import AddToCart from '../Buttons/AddToCart';
import TryOnButton from '../Buttons/TryonButton';
import { shirts } from '../Constants/Shirts.jsx';

const Featured = () => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking buttons
  };

  return (
    <section className="py-12 sm:py-20 bg-surface-default px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14 text-primary-900">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
          {shirts.map((product) => (
            <div 
              key={product.id} 
              onClick={() => handleProductClick(product.id)}
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1 flex flex-col
                       w-full max-w-md mx-auto min-h-[650px] cursor-pointer"
            >
              {/* Image Container - Adjusted for consistent sizing */}
              <div className="relative h-[340px] sm:h-[380px] lg:h-[400px] overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 
                           hover:scale-105"
                />
              </div>

              {/* Content - Increased vertical space for buttons and popup content */}
              <div className="p-6 sm:p-8 space-y-4 sm:space-y-5 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-primary-900 hover:text-interactive-hover">
                  {product.name}
                </h3>
                <p className="text-sm text-content-light flex-grow">
                  {product.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 pt-4 mt-auto" onClick={handleButtonClick}>
                  <span className="text-xl font-bold text-primary-900">
                    {typeof product.price === 'number' ? `Rs ${product.price.toLocaleString()}` : "Rs 1,799"}
                  </span>
                  <div className="flex flex-row space-x-4 w-full sm:w-auto">
                    <AddToCart product={product} preventNavigation={true} />
                    <TryOnButton shirtImage={product.image} shirtName={product.name} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;