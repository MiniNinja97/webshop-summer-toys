
import { useFormValidation, validationSchema } from '../Products/formValidation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function LoginPage() {
  const inputValues = { username: '', password: '' };
  const { formData, handleChange, errors, isFormValid } = useFormValidation(validationSchema, inputValues);
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (formData.username === 'admin' && formData.password === 'password') {
      navigate('/admin'); 
    } else {
      setLoginError('Invalid username or password'); 
    }
  };

  const isLoginButtonEnabled = formData.username === 'admin' && formData.password === 'password'; 

  return (
    <div className='login-page'>
      <h1>Summer Toy Shop</h1>
      <h3>Admin log in:</h3>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
         <p className={`error ${errors.username ? 'show' : ''}`}>
				{errors.username}
			</p>

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <p className={`error ${errors.password ? 'show' : ''}`}>
			{errors.password}
		</p>

        <button type="submit" disabled={!isLoginButtonEnabled}>Log in</button>
      </form>

      
      <p className={`error ${loginError ? 'show' : ''}`}>{loginError}</p>
    </div>
  );
}

export default LoginPage;