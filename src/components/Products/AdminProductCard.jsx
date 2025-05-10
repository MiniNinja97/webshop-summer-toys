import React, { useEffect, useState } from 'react';
import './products.css';
import useProductStore from './productStore';
import { useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct, editProduct } from '../../data/crud';

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
    await addProduct(newProduct, fetchProducts);
    setNewName('');
    setNewPrice('');
    setNewUrl('');
  };

  const handleDelete = async (id) => {
    await deleteProduct(id, fetchProducts);
  };

  const [editProductId, setEditProductId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  const handleSaveEdit = async () => {
    const updateProduct = {
      name: editName,
      price: editPrice,
      url: products.find(p => p.id === editProductId).url,
    };

    await editProduct(editProductId, updateProduct, fetchProducts);
    setEditProductId(null);
  };

  const hasChanges = (product) => {
    return (
      product.name !== editName ||
      product.price !== editPrice
    );
  };

  const navigate = useNavigate();
  const goToProducts = () => navigate('/products');
  const goToHome = () => navigate('/');

  return (
    <div className="product-page"> 
      <div className="product-header">
        <h1>Admin Page</h1>
        <div className="product-links">
          <p onClick={goToHome}>Home</p>
          <p onClick={goToProducts}>Customer Products</p>
        </div>
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

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
  <img className="beachball" src={product.url} alt={product.name} />

  <div className="product-info">
    {editProductId === product.id ? (
      <>
        <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
      </>
    ) : (
      <>
        <h3 className="headline" onClick={() => handleEditClick(product)}>{product.name}</h3>
        <p className="price" onClick={() => handleEditClick(product)}>Price: {product.price} $</p>
      </>
    )}

    <div className="button-group">
  <button onClick={() => handleDelete(product.id)}>Delete</button>
  <button
    onClick={handleSaveEdit}
    disabled={editProductId !== product.id || !hasChanges(product)}
  >
    Save Edit
  </button>
</div>
  </div>
</div>
        ))}
      </div>

      <footer>
        <p>Back to top</p>
        <p>Admin</p>
      </footer>
    </div>
  );
}

export default AdminProductCard;