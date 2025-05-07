import React from 'react';
import './products.css';

function AdminProductCard({ product }) {
  return (
    <div className="product-page">
		<h1>Admin Page</h1>
		<h4>Home</h4>
		<div className='add-new'>
			<h3>Add new Product:</h3>
			<form>
				<label>Url:</label>
				<input/>
				<label>Name:</label>
				<input/>
				<label>Price:</label>
				<input/>
				<button>Add new Product</button>
			</form>

		</div>
		<div>
			<input/>
		</div>
      <div className="product-card">
		<button>Delete</button>
        <img className="beachball" src={product.url} alt={product.name} />
        <h3 className="headline">{product.name}</h3>
        <p className="price">Price: {product.price} $</p>
		<button>Save Edits</button>
      </div>
    </div>
  );
}

export default AdminProductCard;