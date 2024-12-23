import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/assets/heroimage.jpg" // Update with your image path
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-primary-900/75 via-primary-500/10 to-transparent"></div>
      </div>

      {/* Circular gradient elements */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] bg-gradient-to-l from-purple-600/20 to-orange-400/20 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="absolute inset-0 w-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-left text-white 
                         bg-gradient-to-r from-white to-purple-200 bg-clip-text">
              Discover Your Style
            </h1>
            <p className="text-xl md:text-2xl text-left text-purple-100">
              Elevate your wardrobe with our curated collection of timeless pieces
            </p>
            <div className="flex justify-start">
              <Link
                to="/shop"
                className="inline-block px-12 py-4 text-lg font-semibold text-white
                         border-2 border-orange-400 rounded-full
                         bg-gradient-to-r from-orange-400/20 to-purple-600/20
                         hover:from-orange-400/30 hover:to-purple-600/30
                         transform hover:scale-105 transition-all duration-300
                         shadow-[0_0_15px_rgba(251,146,60,0.3)]
                         hover:shadow-[0_0_25px_rgba(251,146,60,0.5)]"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 
                    bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default HeroSection;