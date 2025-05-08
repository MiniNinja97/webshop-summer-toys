import React, { useState } from 'react';
import './products.css';

import { addProduct, deleteProduct } from '../../data/crud'; 

function AdminProductCard({ product, setProducts }) {
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Funktion för att lägga till en ny produkt
  const handleAdd = async (e) => {
    e.preventDefault();
    const newProduct = {
      name: newName,
      price: newPrice,
      url: newUrl
    };
    await addProduct(newProduct, setProducts);  // Lägg till produkt i Firestore
    setNewName('');
    setNewPrice('');
    setNewUrl('');
  };

  // Funktion för att ta bort produkt
  const handleDelete = async () => {
    await deleteProduct(product.id, setProducts); 
  };

  return (
    <div className="product-page"> 
      <div className="product-card"> 
        <img className="beachball" src={product.url} alt={product.name} /> 
        <h3 className="headline">{product.name}</h3> 
        <p className="price">Price: {product.price} $</p> 
       
        <button onClick={handleDelete}>Delete</button>
        
       
        <h3>Add New Product</h3>
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
      <footer>
        <p>Back to top</p>
        <p>Admin</p>
      </footer>
    </div>
  );
}

export default AdminProductCard;