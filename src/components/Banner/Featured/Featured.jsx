// components/Featured/Featured.jsx
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import AddToCart from '../../AddToCart/AddToCart';


const Featured = () => {
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "Rs 499",
      image: "/assets/C1.png", // Corrected path
      description: "Essential cotton blend formal shirt",
    },
    {
      id: 2,
      name: "Denim Casual Shirt",
      price: "Rs 1,999",
      image: "/assets/C2.png",
      description: "Comfortable casual denim shirt",
    },
    {
      id: 3,
      name: "Printed Summer Shirt",
      price: "Rs 1,799",
      image: "/assets/C3.png",
      description: "Trendy printed summer collection",
    },
    {
      id: 4,
      name: "Plain Winter Jersey",
      price: "Rs 799",
      image: "/assets/C4.png",
      description: "Trendy printed summer collection",
    },
    {
      id: 5,
      name: "Plain Winter jersey",
      price: "Rs 1,799",
      image: "/assets/C5.png",
      description: "Trendy printed summer collection",
    },
    {
      id: 6,
      name: "Plain Winter Jersey",
      price: "Rs 1,799",
      image: "/assets/C6.png",
      description: "Trendy printed summer collection",
    },
  ];
  

  return (
    <section className="py-16 bg-surface-default">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary-900">Featured Products</h2>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-85 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 
                           hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-primary-900">{product.name}</h3>
                <p className="text-content-light">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-900">{product.price}</span>
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 bg-interactive-hover 
                             text-primary-900 rounded-full hover:bg-accent-light 
                             transition-colors duration-300"
                  >
                    <FiShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
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