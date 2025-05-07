import React from 'react';
import './products.css';

function AdminProductCard({ product }) {
  return (
    <div className="product-page">
      <div className="product-card">
        <img className="beachball" src={product.url} alt={product.name} />
        <h3 className="headline">{product.name}</h3>
        <p className="price">Price: {product.price} $</p>
      </div>
    </div>
  );
}

export default AdminProductCard;