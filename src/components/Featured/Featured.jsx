// components/Featured/Featured.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import AddToCart from '../Buttons/AddToCart';
import TryOnButton from '../Buttons/TryonButton';

const Featured = () => {
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "Rs 499",
      image: "/assets/C1.png",
      description: "Essential cotton blend formal shirt"
    },
    {
      id: 2,
      name: "Denim Casual Shirt",
      price: "Rs 1,999",
      image: "/assets/C2.png",
      description: "Comfortable casual denim shirt"
    },
    {
      id: 3,
      name: "Printed Summer Shirt",
      price: "Rs 1,799",
      image: "/assets/C3.png",
      description: "Trendy printed summer collection"
    },
    {
      id: 4,
      name: "Plain Winter Jersey",
      price: "Rs 799",
      image: "/assets/C4.png",
      description: "Warm winter collection jersey"
    },
    {
      id: 5,
      name: "Classic Jersey",
      price: "Rs 1,799",
      image: "/assets/C5.png",
      description: "Premium cotton blend jersey"
    },
    {
      id: 6,
      name: "Casual Jersey",
      price: "Rs 1,799",
      image: "/assets/C6.png",
      description: "Comfortable casual wear jersey"
    }
  ];

  return (
    <section className="py-8 sm:py-16 bg-surface-default px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-primary-900">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 
                           hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-primary-900">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-content-light">
                  {product.description}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                  <span className="text-lg font-bold text-primary-900">
                    {product.price}
                  </span>
                  <div className="flex flex-row space-x-2 w-full sm:w-auto">
                    <AddToCart product={product} />
                    <TryOnButton />
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