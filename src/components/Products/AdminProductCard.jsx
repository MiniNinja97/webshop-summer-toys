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

      <h3>Add New Product</h3>
      <form onSubmit={handleAdd}>
        <label>New Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>New Price:</label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <p className="error">{errors.price}</p>}

        <label>New Url:</label>
        <input
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
        {errors.url && <p className="error">{errors.url}</p>}

        <button type="submit">Add Product</button>
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


