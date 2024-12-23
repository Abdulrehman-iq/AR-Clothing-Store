// components/CartDrawer/CartDrawer.jsx
import React from 'react';
import { FiX, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-primary-900/50 backdrop-blur-sm transition-opacity duration-300 z-50 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed right-0 top-0 h-full w-[400px] bg-primary-900 shadow-2xl 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-primary-700">
          <h2 className="text-xl font-semibold text-surface-light">Your Cart</h2>
          <button 
            onClick={onClose}
            className="text-surface-light hover:text-interactive-hover transition-colors duration-300"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-content-light text-lg mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-interactive-hover text-primary-900 rounded-full
                         hover:bg-accent-light transition-colors duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-primary-700">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-surface-light font-medium">{item.name}</h3>
                    <p className="text-content-light">{item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button 
                        className="p-1 text-content-light hover:text-interactive-hover"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <FiMinus />
                      </button>
                      <span className="text-surface-light">{item.quantity}</span>
                      <button 
                        className="p-1 text-content-light hover:text-interactive-hover"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <button 
                    className="text-content-light hover:text-interactive-hover"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-primary-700 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-surface-light">Total</span>
              <span className="text-surface-light font-semibold">
                Rs{getCartTotal().toFixed(2)}
              </span>
            </div>
            <button
              className="w-full py-3 bg-interactive-hover text-primary-900 rounded-lg font-medium
                       hover:bg-accent-light transition-colors duration-300"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;