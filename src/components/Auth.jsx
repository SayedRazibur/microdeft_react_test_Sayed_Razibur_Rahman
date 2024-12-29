import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

const Auth = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('token');
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(
        `https://react-interview.crd4lc.easypanel.host/api/login`,
        { email: formData.email, password: formData.password },
        { headers: { Accept: 'application/json' } }
      );

      if (response.data.status) {
        localStorage.setItem('token', response.data.data.token);
        navigate('/');
      } else {
        setError(response.data.status_message);
      }
    } catch (err) {
      if (err.response?.data?.status_message) {
        setError(err.response.data.status_message);
      } else if (err.response?.status === 422) {
        setError('Please check your email and password');
      } else if (err.response?.status === 429) {
        setError('Too many attempts. Please try again later');
      } else {
        setError('An error occurred. Please try again');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post(
        `https://react-interview.crd4lc.easypanel.host/api/register`,
        formData,
        { headers: { Accept: 'application/json' } }
      );

      if (response.data.status) {
        setIsRightPanelActive(false);
        setError('Registration successful! Please login.');
        setFormData({ ...formData, name: '' });
      } else {
        setError(response.data.status_message || 'An error occurred');
      }
    } catch (err) {
      if (err.response?.data?.status_message) {
        setError(err.response.data.status_message);
      } else if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        if (validationErrors) {
          // Get the first validation error message
          const firstError = Object.values(validationErrors)[0][0];
          setError(firstError);
        } else {
          setError('Please check your input fields');
        }
      } else if (err.response?.status === 429) {
        setError('Too many attempts. Please try again later');
      } else {
        setError('An error occurred. Please try again');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form className="form" onSubmit={handleRegister}>
            <h1 className="title">Create Account</h1>
            <input 
              className="input"
              type="text" 
              placeholder="Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input 
              className="input"
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              className="input"
              type="password" 
              placeholder="Password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && (
              <div 
                role="alert" 
                className={`error-message ${error.includes('successful') ? 'success' : 'error'}`}
                aria-live="polite"
              >
                {error}
              </div>
            )}
            <button className="button" type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="title">Sign in</h1>
            <input 
              className="input"
              type="email" 
              placeholder="Email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              className="input"
              type="password" 
              placeholder="Password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && (
              <div 
                role="alert" 
                className={`error-message ${error.includes('successful') ? 'success' : 'error'}`}
                aria-live="polite"
              >
                {error}
              </div>
            )}
            <button className="button" type="submit">Sign In</button>
          </form>
        </div>
        <div className="mobile-nav">
          {isRightPanelActive ? (
            <button onClick={() => setIsRightPanelActive(false)}>
              Already have an account? Sign In
            </button>
          ) : (
            <button onClick={() => setIsRightPanelActive(true)}>
              Don't have an account? Sign Up
            </button>
          )}
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">Welcome Back!</h1>
              <p className="paragraph">
                To keep connected with us please login with your personal info
              </p>
              <button 
                className="button ghost" 
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">Hello, Friend!</h1>
              <p className="paragraph">
                Enter your personal details and start journey with us
              </p>
              <button 
                className="button ghost" 
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;