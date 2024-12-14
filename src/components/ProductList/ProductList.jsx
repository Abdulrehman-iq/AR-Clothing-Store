import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const products = [
    { id: 1, name: 'T-Shirt', price: 20 },
    { id: 2, name: 'Jeans', price: 40 },
    // Add more products here
  ];

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link> - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;