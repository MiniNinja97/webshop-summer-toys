import React, { useEffect, useState } from 'react';
import './products.css';
import { addProduct, deleteProduct } from '../../data/crud';
import useProductStore from './productStore';
import { useNavigate } from 'react-router-dom';

function AdminProductCard() {
  const { products, fetchProducts } = useProductStore();
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newProduct = { name: newName, price: newPrice, url: newUrl };
    await addProduct(newProduct, fetchProducts); // Uppdaterar från Firestore
    setNewName('');
    setNewPrice('');
    setNewUrl('');
  };

  const handleDelete = async (id) => {
    await deleteProduct(id, fetchProducts); // Tar bort från Firestore och uppdaterar
  };

  const navigate =useNavigate();
  const goToProducts = () => {
	navigate('/products');
  }
  const goToHome = () => {
	navigate('/');
  }

  return (
    <div className="product-page"> 
	<div>
		<h1>Admin Page</h1>
	</div>
	<div>
		<p onClick={goToHome}>Home</p>
		<p onClick={goToProducts}>Customer Products</p>
	</div>
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
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img className="beachball" src={product.url} alt={product.name} />
          <h3 className="headline">{product.name}</h3>
          <p className="price">Price: {product.price} $</p>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}

     

      <footer>
        <p>Back to top</p>
        <p>Admin</p>
      </footer>
    </div>
  );
}

export default AdminProductCard;