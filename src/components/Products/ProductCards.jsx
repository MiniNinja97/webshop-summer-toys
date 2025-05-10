import { useEffect } from 'react';
import './products.css';
import useProductStore from './productStore';
import { useNavigate } from 'react-router-dom';
import { cartData } from '../../data/cartdata';
import { useState } from 'react';

function ProductCards() {
  const { products, fetchProducts } = useProductStore();
  const addToCart = cartData((state) => state.addToCart);
  const [lastAddedId, setLastAddedId] = useState(null);
  const cart = cartData((state) => state.cart);
  console.log(cart);
  const totalItems = cart && cart.length > 0 
  ? cart.reduce((sum, product) => sum + product.quantity, 0)
  : 0;

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
			<p onClick={goToCart}>Cart ({totalItems})</p>

		</div>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img className="beachball" src={product.url} alt={product.name} />
          <h3 className="headline">{product.name}</h3>
          <p className="price">Price: {product.price} $</p>
		  {lastAddedId === product.id && (
			<p className="confirmation"> {product.name} added to cart!</p>)}
			
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
      ))}
      <footer>
        <p>Back to top</p>
        <p className='admin-btn'  onClick={goToAdmin}>Admin</p>
      </footer>
    </div>
  );
}

export default ProductCards;