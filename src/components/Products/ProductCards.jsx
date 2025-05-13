import { useEffect, useState } from 'react';
import './products.css';
import useProductStore from './productStore';
import { useNavigate } from 'react-router-dom';
import { cartData } from '../../data/cartdata';

function ProductCards() {
  const { products, fetchProducts } = useProductStore();
  const addToCart = cartData((state) => state.addToCart);
  const [lastAddedId, setLastAddedId] = useState(null);
  const cart = cartData((state) => state.cart);

  const totalItems = cart && cart.length > 0
    ? cart.reduce((sum, product) => sum + product.quantity, 0)
    : 0;

  const [sortOption, setSortOption] = useState(null);
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();
  const goToLogin = () => navigate('/login');
  const goToHome = () => navigate('/');
  const goToCart = () => navigate('/cart');

  useEffect(() => {
    fetchProducts();
  }, []);

  let sortedProducts = [...products];

  if (sortOption === 'priceLow') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'priceHigh') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="product-page">

      <div className="product-header">
        <h1>Summer Toy Shop</h1>
        <div className="product-links">
          <p onClick={goToHome}>Home</p>
          <p onClick={goToCart}>Cart ({totalItems})</p>
        </div>
      </div>

      
      <div className="filter-section">
        <div className="filter-row">
          <h3>Filter products</h3>
          <p className='price-filter'>Price:</p>
          <button onClick={() => setSortOption('priceLow')}>Low</button>
          <button onClick={() => setSortOption('priceHigh')}>High</button>
          <p className='name-filter'>Name:</p>
          <button onClick={() => setSortOption('name')}>A-Z</button>
        </div>
        <div className="search-row">
          <h4>Search:</h4>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img className="beachball" src={product.url} alt={product.name} />
            <div className="product-info">
              <h3 className="headline">{product.name}</h3>
              <p className="price">Price: {product.price} $</p>
              {lastAddedId === product.id && (
                <p className="confirmation">{product.name} added to cart!</p>
              )}
              <button
                onClick={() => {
                  addToCart(product);
                  setLastAddedId(product.id);
                  setTimeout(() => setLastAddedId(null), 2000);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer>
        <p onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</p>
        <p className="admin-btn" onClick={goToLogin}>Admin</p>
      </footer>
    </div>
  );
}

export default ProductCards;
