import React from 'react';

function ProductCards({ product }) {
	return (
	  <div className="product-card">
		<h3>{product.name}</h3>
		<p><strong>Pris:</strong> {product["Price "]} kr</p>
		<img src={product["Url"]} alt={product.name} />
	  </div>
	);
  }

export default ProductCards;