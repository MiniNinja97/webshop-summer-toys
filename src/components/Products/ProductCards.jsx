import React from 'react';
import './products.css';

function ProductCards({ product }) {
  return (
    <div className="product-page">
      <div className="product-card">
        <img className="beachball" src={product.url} alt={product.name} />
        <h3 className="headline">{product.name}</h3>
        <p className="price">Price: {product.price} $</p>
        <button>Add to cart</button>
      </div>
	  <footer>
		<p>Back to top</p>
		<p>Admin</p>
	  </footer>
    </div>
  );
}

export default ProductCards;