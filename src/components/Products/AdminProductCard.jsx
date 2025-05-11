import { useEffect, useState } from 'react';
import './products.css';
import useProductStore from './productStore';
import { useNavigate } from 'react-router-dom';
import { addProduct, deleteProduct, editProduct } from '../../data/crud';
import { useFormValidation, validationSchema } from './formValidation';

function AdminProductCard() {
  const { products, fetchProducts } = useProductStore();
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    handleChange,
    errors,
    isFormValid,
  } = useFormValidation(validationSchema, {
    name: '',
    price: '',
    url: '',
  });

  const {
    formData: editFormData,
    setFormData: setEditFormData,
    handleChange: handleEditChange,
    errors: editErrors,
    isFormValid: isEditFormValid,
  } = useFormValidation(validationSchema, {
    name: '',
    price: '',
    url: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const newProduct = {
      name: formData.name,
      price: formData.price,
      url: formData.url,
    };

    await addProduct(newProduct, fetchProducts);
    setFormData({ name: '', price: '', url: '' });
  };

  const handleDelete = async (id) => {
    await deleteProduct(id, fetchProducts);
  };

  const [editProductId, setEditProductId] = useState(null);

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditFormData({
      name: product.name,
      price: product.price,
      url: product.url,
    });
  };

  const handleSaveEdit = async () => {
    if (!isEditFormValid()) return;

    const updatedProduct = {
      name: editFormData.name,
      price: editFormData.price,
      url: editFormData.url,
    };

    await editProduct(editProductId, updatedProduct, fetchProducts);
    setEditProductId(null);
  };

  const hasChanges = (product) => {
    return product.name !== editFormData.name || product.price !== editFormData.price;
  };

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

      <h3 className='add-product'>Add New Product</h3>
      
      {/* FIX: Byt handleSubmit till handleAdd */}
      <form onSubmit={handleAdd}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          <small className="error">{errors.name}</small>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            name="price"
          />
          <small className="error">{errors.price}</small>
        </div>

        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            id="url"
            type="text"
            value={formData.url}
            onChange={handleChange}
            name="url"
          />
          <small className="error">{errors.url}</small>
        </div>

        <button className="add-btn" type="submit">Lägg till produkt</button>
      </form>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img className="beachball" src={product.url} alt={product.name} />

            <div className="product-info">
              {editProductId === product.id ? (
                <>
                  <input
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                  />
                  {editErrors.name && <p className="error">{editErrors.name}</p>}

                  <input
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                  />
                  {editErrors.price && <p className="error">{editErrors.price}</p>}

                  <input
                    name="url"
                    value={editFormData.url}
                    onChange={handleEditChange}
                  />
                  {editErrors.url && <p className="error">{editErrors.url}</p>}
                </>
              ) : (
                <>
                  <h3 className="headline" onClick={() => handleEditClick(product)}>
                    {product.name}
                  </h3>
                  <p className="price" onClick={() => handleEditClick(product)}>
                    Price: {product.price} $
                  </p>
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



