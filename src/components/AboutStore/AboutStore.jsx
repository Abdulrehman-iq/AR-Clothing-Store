// components/AboutStore/AboutStore.jsx
import React from 'react';
import { FiCamera, FiPackage, FiShield, FiThumbsUp, FiStar, FiHome } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';

const AboutStore = () => {
  const features = [
    {
      id: 1,
      icon: FiCamera,
      title: "Virtual Try-On",
      description: "Experience clothes virtually before buying with our AR technology",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      icon: FiThumbsUp,
      title: "Handcrafted Quality",
      description: "Each piece carefully handmade by skilled artisans",
      color: "from-blue-500 to-teal-500"
    },
    {
      id: 3,
      icon: FiPackage,
      title: "Try First, Buy Later",
      description: "7-day trial period with hassle-free returns",
      color: "from-orange-500 to-yellow-500"
    },
    {
      id: 4,
      icon: FiShield,
      title: "Quality Guarantee",
      description: "Premium materials and craftsmanship guaranteed",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      icon: FiStar,
      title: "Premium Materials",
      description: "Finest fabrics sourced from around the world",
      color: "from-red-500 to-pink-500"
    },
    {
      id: 6,
      icon: FiHome,
      title: "Online Store",
      description: "Try in store and order at home immediately",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <>
      <Navbar />
      <section className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-surface-light mb-8">About Our Store</h2>
          <p className="text-lg text-center text-content-light mb-8">
            Welcome to AR Clothing Store! We offer a wide range of high-quality clothing items for all occasions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="group relative p-8 bg-black/30 backdrop-blur-sm rounded-xl 
                         hover:transform hover:-translate-y-2 transition-all duration-300
                         border border-gray-800"
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 
                             group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative">
                  <feature.icon className="h-12 w-12 text-interactive-hover mb-6 
                                       group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-surface-light 
                           group-hover:text-interactive-hover transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-content-light group-hover:text-surface-light 
                          transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-interactive-hover 
                            to-accent-light w-0 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutStore;