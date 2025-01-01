// components/Filter/Filter.jsx
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    colors: []
  });

  const colors = [
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'Navy', value: 'navy', hex: '#000080' },
    { name: 'Red', value: 'red', hex: '#FF0000' },
    { name: 'Green', value: 'green', hex: '#008000' }
  ];

  const handlePriceChange = (e, bound) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[bound] = parseInt(e.target.value);
    updateFilters('priceRange', newPriceRange);
  };

  const handleColorToggle = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    updateFilters('colors', newColors);
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-primary-800 
                   text-surface-light rounded-lg hover:bg-primary-700 transition-colors"
      >
        <span>Filters</span>
        <FiChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute top-full left-0 w-72 mt-2 bg-primary-800 rounded-lg shadow-xl 
                    overflow-hidden transition-all duration-300 origin-top
                    ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium text-surface-light mb-2">Price Range</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-20 px-2 py-1 bg-primary-700 text-surface-light rounded"
                />
                <span className="text-content-light">to</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-20 px-2 py-1 bg-primary-700 text-surface-light rounded"
                />
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full"
              />
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-medium text-surface-light mb-2">Colors</h3>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorToggle(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110
                    ${filters.colors.includes(color.value) ? 'border-interactive-hover' : 'border-transparent'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;