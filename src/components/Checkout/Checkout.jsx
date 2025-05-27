// components/Checkout/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiCreditCard, FiMapPin, FiPhone, FiMail, FiUser, FiArrowLeft, FiCheckCircle, FiX } from 'react-icons/fi';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create a new order object
    const newOrder = {
      id: Date.now(), // Use timestamp as a simple ID
      user: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      items: cartItems,
      total: getCartTotal(),
      status: 'pending',
      orderDate: new Date().toISOString(),
      paymentMethod: formData.paymentMethod
    };
    
    // Get existing orders from localStorage or initialize empty array
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Add new order to array
    const updatedOrders = [...existingOrders, newOrder];
    
    // Save updated orders array back to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Show success message
    setShowSuccess(true);
    
    // Clear the cart
    clearCart();
    
    // No longer automatically navigate
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-primary-900 bg-opacity-90">
            <div className="bg-primary-800 p-6 rounded-xl shadow-xl flex flex-col items-center relative">
              {/* Close button */}
              <button 
                onClick={closeSuccessMessage}
                className="absolute top-2 right-2 text-content-light hover:text-surface-light"
                aria-label="Close message"
              >
                <FiX className="w-6 h-6" />
              </button>
              
              <FiCheckCircle className="text-green-500 w-16 h-16 mb-4" />
              <h2 className="text-2xl font-bold text-surface-light mb-2">Order Placed Successfully!</h2>
              <p className="text-content-light">Thank you for your purchase.</p>
            </div>
          </div>
        )}
        
        {/* Back button and title row */}
        <div className="flex items-center mb-8">
          <button 
            onClick={handleGoBack}
            className="mr-4 text-surface-light hover:text-interactive-hover transition-colors"
            aria-label="Go back"
          >
            <FiArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-surface-light">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-primary-800 rounded-xl p-6 space-y-6">
            <h2 className="text-xl font-semibold text-surface-light mb-4">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-surface-light mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-primary-700 text-surface-light rounded-lg
                             border border-primary-600 focus:outline-none focus:border-interactive-hover"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-light mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-primary-700 text-surface-light rounded-lg
                               border border-primary-600 focus:outline-none focus:border-interactive-hover"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-light mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-content-light" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-primary-700 text-surface-light rounded-lg
                               border border-primary-600 focus:outline-none focus:border-interactive-hover"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-surface-light mb-2">
                  Address
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3 text-content-light" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 bg-primary-700 text-surface-light rounded-lg
                             border border-primary-600 focus:outline-none focus:border-interactive-hover"
                    placeholder="Enter your full address"
                  ></textarea>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-medium text-surface-light mb-4">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <span className="text-surface-light">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 ${
                  isSubmitting ? 'bg-gray-500' : 'bg-interactive-hover hover:bg-accent-light'
                } text-primary-900 rounded-lg font-medium transition-colors duration-300`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-primary-800 rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold text-surface-light mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-surface-light font-medium">{item.name}</p>
                      <p className="text-content-light">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-surface-light font-medium">
                    {typeof item.price === 'number' ? `Rs ${item.price.toLocaleString()}` : item.price}
                  </p>
                </div>
              ))}

              <div className="border-t border-primary-700 pt-4 mt-4">
                <div className="flex justify-between text-surface-light">
                  <span>Subtotal</span>
                  <span>Rs {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-surface-light mt-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-surface-light font-bold mt-4 text-lg">
                  <span>Total</span>
                  <span>Rs {getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;