import React, { useState } from 'react';
import './products.css'

import { addProduct } from '../../data/crud'; 

function AdminProductCard({ product, setProducts }) {
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: newName,
      price: newPrice,
      url: newUrl
    };
    await addProduct(newProduct, setProducts);
    setNewName('');
    setNewPrice('');
    setNewUrl('');
  };

  return (
    <div className="admin-product-card">
      <h4>{product.name}</h4>
      <p>Price: {product.price}</p>
      <img src={product.url} alt={product.name} />

      
      <form onSubmit={handleAdd}>
        <label>New Name:</label>
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        <label>New Price:</label>
        <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        <label>New Url:</label>
        <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminProductCard;