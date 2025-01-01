// components/OrderSuccess/OrderSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const OrderSuccess = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-12 bg-primary-900">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-primary-800 rounded-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <FiCheck className="h-10 w-10 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-surface-light mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-content-light mb-8">
            Thank you for shopping with us. Your order has been confirmed.
          </p>

          {/* Order Details */}
          <div className="bg-primary-700/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-surface-light mb-4">
              Order Details
            </h2>
            <div className="space-y-2 text-left">
              <p className="text-content-light">
                Order Number: <span className="text-surface-light">#ORD12345</span>
              </p>
              <p className="text-content-light">
                Estimated Delivery: <span className="text-surface-light">3-5 Business Days</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-interactive-hover text-primary-900 rounded-lg font-medium
                       hover:bg-accent-light transition-all duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;