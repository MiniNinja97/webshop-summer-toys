import { useNavigate } from 'react-router-dom';

function CartStructure () {

	const navigate = useNavigate();
	const goToProducts = () => {
		navigate('/products');
	  }
	return (
		<div>
			<h1> Summer Toy Shop</h1>
			<p onClick={goToProducts}>Back to products</p>
			<h4>Your Cart</h4>

		</div>
	);
};

export default CartStructure