import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import AddToCart from '../../../components/Buttons/AddToCart';
import TryOnButton from '../../../components/Buttons/TryonButton';
import SearchBar from '../../../components/SearchBar/SearchBar';
import Filter from '../../../components/Filter/Filter';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    colors: [],
  });

  const categories = ['All', 'T-Shirts', 'Shirts', 'Hoodies'];

  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "Rs 499",
      category: "Shirts",
      image: "/assets/C1.png",
      description: "Essential cotton blend formal shirt",
      color: "green",
    },
    {
      id: 2,
      name: "Denim Casual Shirt",
      price: "Rs 1999",
      category: "Shirts",
      image: "/assets/C2.png",
      description: "Comfortable casual denim shirt",
      color: "blue",
    },
    {
      id: 3,
      name: "Printed Summer Shirt",
      price: "Rs 1799",
      category: "Shirts",
      image: "/assets/C3.png",
      description: "Trendy printed summer collection",
      color: "red",
    },
    {
      id: 4,
      name: "Plain Winter Jersey",
      price: "Rs 799",
      category: "Hoodies",
      image: "/assets/C4.png",
      description: "Warm winter collection jersey",
      color: "green",
    },
    {
      id: 5,
      name: "Classic Jersey",
      price: "Rs 1799",
      category: "Hoodies",
      image: "/assets/C5.png",
      description: "Premium cotton blend jersey",
      color: "black",
    },
    {
      id: 6,
      name: "Casual Jersey",
      price: "Rs 1799",
      category: "Hoodies",
      image: "/assets/C6.png",
      description: "Comfortable casual wear jersey",
      color: "white",
    },
  ];

  // Filtered products based on category, price, and color
  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const isPriceMatch =
      parseInt(product.price.replace('Rs ', '')) >= filters.priceRange[0] &&
      parseInt(product.price.replace('Rs ', '')) <= filters.priceRange[1];
    const isColorMatch =
      filters.colors.length === 0 || filters.colors.includes(product.color);

    return isCategoryMatch && isPriceMatch && isColorMatch;
  });

  return (
    <div className="min-h-screen bg-surface-default">
      <Navbar />

      {/* Header */}
      <div className="bg-primary-900 py-12 mt-28">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-surface-light mb-4">Our Collection</h1>
          <p className="text-content-light">Discover our curated selection of premium clothing</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative">
          <div className="flex items-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-interactive-hover text-primary-900'
                    : 'bg-primary-800 text-surface-light hover:bg-primary-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative z-10">
            <Filter onFilterChange={(newFilters) => setFilters(newFilters)} />
          </div>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-surface-light hover:text-interactive-hover transition-colors duration-300 
                       bg-primary-800 rounded-full hover:bg-primary-700 ml-auto"
          >
            <FiSearch className="h-5 w-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-surface-light rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{product.name}</h3>
                <p className="text-content-light mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-900">{product.price}</span>
                  <div className="flex space-x-2">
                    <AddToCart product={product} />
                    <TryOnButton />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <Footer />
    </div>
  );
};

export default Shop;
