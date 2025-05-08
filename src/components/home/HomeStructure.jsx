import './home.css'
import SunVector from '../../images/SunVector.svg';
import { useNavigate } from 'react-router-dom';

function Home() {

	const navigate = useNavigate();

	const goToProducts = () => {
		navigate('/products');
	}

	return (
		<div className="homepage">
			<div className='sun-wrapper'>
			<img src={SunVector} alt="Sun icon" className="sun-icon" />
			</div>

			<div className='homecontainer'>
			<h1>SUMMER </h1>
			<h1>TOY SHOP</h1>
			<h4>Find Fun Toys For Summer!</h4>
			<button className='home-btn' onClick={goToProducts}>Shop Now</button>
			</div>

		</div>
	)
}

export default Home