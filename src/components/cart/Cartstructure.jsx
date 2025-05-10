import { useNavigate } from 'react-router-dom';
import { cartData } from '../../data/cartdata';

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
		<div>
			<h1>Summer Toy Shop</h1>
			<p onClick={goToProducts}>Back to products</p>
			<h4>Your Cart</h4>
			{cart.length === 0 ? (
				<p>Your cart is empty</p>
			) : (
				<div>
					<ul>
						{cart.map((product) => (
							<li key={product.id}>
								<p>{product.name}</p>
								<p>Price: {product.price}</p>
								<p>Quantity: {product.quantity}</p>

								<button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
								<button 
									onClick={() => updateQuantity(product.id, product.quantity - 1)}
									disabled={product.quantity === 1}
								>
									-
								</button>
								<button onClick={() => removeFromCart(product.id)}>Remove</button>
							</li>
						))}
					</ul>
					<p>Total: {totalPrice.toFixed(2)} $</p>
				</div>
			)}
		</div>
	);
};

export default CartStructure;