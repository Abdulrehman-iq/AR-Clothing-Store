// components/Category/Category.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import AddToCart from '../Buttons/AddToCart';
import TryOnButton from '../Buttons/TryonButton';

const Category = () => {
  const { categoryName } = useParams();

  const allProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "Rs 499",
      image: "/assets/C1.png",
      description: "Essential cotton blend formal shirt",
      category: "summer"
    },
    // ... other summer products
    {
      id: 4,
      name: "Winter Jersey",
      price: "Rs 1,799",
      image: "/assets/C4.png",
      description: "Warm winter collection jersey",
      category: "winter"
    },
    // ... other winter products
  ];

  const filteredProducts = categoryName 
    ? allProducts.filter(product => product.category === categoryName.toLowerCase())
    : allProducts;

  return (
    <div className="min-h-screen bg-surface-default">
      <Navbar />
      <section className="pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            {categoryName ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Collection` : 'All Collections'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-surface-light rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                {/* Product details */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;