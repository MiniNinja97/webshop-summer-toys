
import { useFormValidation, validationSchema } from '../Products/formValidation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const inputValues = { username: '', password: '' };
  const { formData, handleChange, errors, isFormValid } = useFormValidation(validationSchema, inputValues);
  const [loginError, setLoginError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kontrollera om formuläret är giltigt och om användarnamn/lösenord är korrekt
    if (formData.username === 'admin' && formData.password === 'password') {
      navigate('/admin'); // Navigera till adminsidan
    } else {
      setLoginError('Invalid username or password'); // Visa felmeddelande
    }
  };

  const isLoginButtonEnabled = formData.username === 'admin' && formData.password === 'password'; // Knappen är bara aktiverad om rätt användarnamn och lösenord är inskrivna

  return (
    <div>
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
        {errors.username && <p className="error">{errors.username}</p>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit" disabled={!isLoginButtonEnabled}>Log in</button>
      </form>

      {/* Felmeddelande för ogiltiga inloggningsuppgifter */}
      {loginError && <p className="error-message">{loginError}</p>}
    </div>
  );
}

export default LoginPage;