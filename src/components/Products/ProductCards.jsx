import React, { useEffect } from 'react';
import './products.css';
import useProductStore from './productStore';
import { useNavigate } from 'react-router-dom';

function ProductCards() {
  const { products, fetchProducts } = useProductStore();

  const navigate = useNavigate();
  const goToAdmin = () => {
	navigate('/admin');
  }
  const goToHome = () => {
	navigate('/');
  }
  const goToCart = () => {
	navigate('/cart');
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-page">
		<div className='title'>
			<h1>Summer Toy Shop</h1>
		</div>
		<div className='Product-links'>
			<p onClick={goToHome}>Home</p>
			<p onClick={goToCart}>Cart</p>

		</div>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img className="beachball" src={product.url} alt={product.name} />
          <h3 className="headline">{product.name}</h3>
          <p className="price">Price: {product.price} $</p>
          <button>Add to cart</button>
        </div>
      ))}
      <footer>
        <p>Back to top</p>
        <p className='admin-btn'  onClick={goToAdmin}>Admin</p>
      </footer>
    </div>
  );
}

export default ProductCards;