import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Home/Shop/Shop';
import ProductDetail from './components/ProductDetails/ProductDetails';
import { CartProvider } from './context/CartContext';
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
            </Routes>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;