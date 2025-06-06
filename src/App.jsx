// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Home/Shop/Shop';
import ProductDetail from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import Category from './components/Category/Category';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import { CartProvider } from './context/CartContext';
import Admin from './components/Admin/Admin';
import UserProfile from './components/UserProfile/UserProfile';
import AboutStore  from './components/AboutStore/AboutStore';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="w-screen min-h-screen bg-gray-50">
        <Router>
          <div className="w-full h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
<Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutStore />} /> {/* Add About page route */}

              <Route path="/checkout" element={<Checkout />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/profile" element={<UserProfile />} /> {/* Add user profile route */}

            </Routes>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;