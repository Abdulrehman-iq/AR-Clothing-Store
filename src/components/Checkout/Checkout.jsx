// components/Checkout/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiCreditCard, FiMapPin, FiPhone, FiMail, FiUser } from 'react-icons/fi';

const Checkout = () => {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();
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
    // Handle order submission
    navigate('/order-success');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-surface-light mb-8">Checkout</h1>
        
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
                className="w-full py-4 bg-interactive-hover text-primary-900 rounded-lg font-medium
                         hover:bg-accent-light transition-colors duration-300"
              >
                Place Order
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
                  <p className="text-surface-light font-medium">{item.price}</p>
                </div>
              ))}

              <div className="border-t border-primary-700 pt-4 mt-4">
                <div className="flex justify-between text-surface-light">
                  <span>Subtotal</span>
                  <span>Rs {getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-surface-light mt-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-surface-light font-bold mt-4 text-lg">
                  <span>Total</span>
                  <span>Rs {getCartTotal().toFixed(2)}</span>
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