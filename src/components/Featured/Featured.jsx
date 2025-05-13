import React from 'react';
import { useCart } from '../../context/CartContext';
import AddToCart from '../Buttons/AddToCart';
import TryOnButton from '../Buttons/TryonButton';
import { shirts } from '../Constants/Shirts.jsx';

const Featured = () => {
  return (
    <section className="py-12 sm:py-20 bg-surface-default px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-14 text-primary-900">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {shirts.map((product) => (
            <div 
              key={product.id} 
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1 flex flex-col
                       w-full max-w-md mx-auto"
            >
              {/* Image Container - Increased height and width */}
              <div className="relative h-[380px] sm:h-[420px] lg:h-[480px] overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 transition-transform duration-300 
                           hover:scale-105"
                />
              </div>

              {/* Content - Added more padding and improved spacing */}
              <div className="p-6 sm:p-8 space-y-5 sm:space-y-6 flex-grow">
                <h3 className="text-xl sm:text-2xl font-semibold text-primary-900">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-content-light">
                  {product.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 pt-2">
                  <span className="text-xl font-bold text-primary-900">
                    {product.price || "Rs 1,799"}
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