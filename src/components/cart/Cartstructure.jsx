import { useNavigate } from 'react-router-dom';
import { cartData } from '../../data/cartdata';
import './cart.css'

function CartStructure () {

	const cart = cartData((state) => state.cart);
	const removeFromCart = cartData((state) => state.removeFromCart);
	const updateQuantity = cartData((state) => state.updateQuantity);

	const totalPrice = cart.reduce((sum, product) => {
		return sum + product.price * product.quantity;
	}, 0);

	const navigate = useNavigate();
	const goToProducts = () => {
		navigate('/products');
	};

	return (
		<div className='cart-container'>
			<div className='cart-title'>
			<h1>Summer Toy Shop</h1>
			<p onClick={goToProducts}>Back to products</p>
			</div>
			
			<h4 className='your-cart'>Your Cart</h4>
			{cart.length === 0 ? (
				<p className='empty'>Your cart is empty</p>
			) : (
				<div>
					<ul className='cart-products'>
						{cart.map((product) => (
							<li key={product.id} className='cart-product'>
							
							<div className='product-header'>
								<p className='product-name'>{product.name}</p>
								<p className='product-price'>
									Price: {(product.price * product.quantity).toFixed(2)} $
								</p>
							</div>

							<div className="quantity-row">
								<div className="quantity-buttons">
									<button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
									<button 
									onClick={() => updateQuantity(product.id, product.quantity - 1)}
									disabled={product.quantity === 1}
									>-</button>
								</div>
								<p className="quantity">Quantity: {product.quantity}</p>
								</div>

							<button className='remove-btn' onClick={() => removeFromCart(product.id)}>Remove</button>
							</li>
						))}
						</ul>

					
				</div>

			)}
			<div className='total-price'><p>Total: {totalPrice.toFixed(2)} $</p></div>
		</div>
	);
};

export default CartStructure;