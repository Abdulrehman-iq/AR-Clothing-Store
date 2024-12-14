import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const product = { id, name: 'T-Shirt', price: 20, description: 'A comfortable t-shirt' };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;