import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { shirts } from '../Constants/Shirts';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AddToCart from '../Buttons/AddToCart';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product based on the id parameter
  useEffect(() => {
    const foundProduct = shirts.find(shirt => shirt.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 mt-20 mb-20 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-interactive-hover"></div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-16 mt-20 mb-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-primary-800 text-surface-light rounded-lg hover:bg-primary-700"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 mt-20 mb-20">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8 text-sm">
          <button onClick={() => navigate('/shop')} className="flex items-center text-interactive-hover hover:text-interactive-focus">
            <FiChevronLeft className="mr-1" />
            Back to Shop
          </button>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8 flex items-center justify-center shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-[500px] object-contain"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">Rs {product.price?.toLocaleString()}</span>
              <span className="ml-2 text-sm text-gray-500">Tax included</span>
            </div>
            
            {/* Long Description */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2 text-gray-900">Description</h3>
              <p className="text-gray-700">{product.longDescription || product.description}</p>
            </div>
            
            {/* Material Details */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="font-medium text-gray-900">Material:</span> {product.details?.material || 'Not specified'}</li>
                <li><span className="font-medium text-gray-900">Fit:</span> {product.details?.fit || 'Standard fit'}</li>
                <li><span className="font-medium text-gray-900">Care:</span> {product.details?.care || 'See garment labels for care instructions'}</li>
              </ul>
            </div>
            
            {/* Quantity */}
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-2 text-gray-900">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-32 bg-white">
                <button 
                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-center focus:outline-none py-1 bg-white text-gray-900"
                />
                <button 
                  className="px-3 py-1 text-gray-500 hover:text-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mt-8">
              <AddToCart 
                product={{...product, quantity: quantity}}
                customClasses="w-full py-3 px-8 flex items-center justify-center" 
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;