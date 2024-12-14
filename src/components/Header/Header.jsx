import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Create this file for styling

const Header = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">AR Clothing Store</Link>
      </div>
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;