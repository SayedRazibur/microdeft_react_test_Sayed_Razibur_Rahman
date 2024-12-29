import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/auth.css';

const API_BASE_URL = 'https://react-interview.crd4lc.easypanel.host/api';

const INITIAL_FORM_STATE = {
  name: '',
  email: '',
  password: '',
};

const PANEL_TEXT = {
  signIn: {
    title: "Welcome Back!",
    description: "Access your courses and continue your learning journey with us",
    buttonText: "Sign In",
  },
  signUp: {
    title: "Join Microdeft",
    description: "Start your learning journey with our expert-led courses",
    buttonText: "Sign Up",
  }
};

const Auth = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePanelSwitch = (isRight) => {
    setIsRightPanelActive(isRight);
    setError('');
    setFormData(INITIAL_FORM_STATE);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
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
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register`,
        formData,
        { headers: { Accept: 'application/json' } }
      );

      if (response.data.status) {
        setIsRightPanelActive(false);
        setError('Registration successful! Please login.');
        setFormData(INITIAL_FORM_STATE);
      } else {
        setError(response.data.status_message);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (err.response?.data?.status_message) {
      setError(err.response.data.status_message);
    } else if (err.response?.status === 422) {
      const validationErrors = err.response.data.errors;
      if (validationErrors) {
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
  };

  const renderForm = (type) => {
    const isSignUp = type === 'signup';
    return (
      <form className="form" onSubmit={isSignUp ? handleRegister : handleLogin}>
        <h1 className="title">{isSignUp ? 'Create Account' : 'Sign in'}</h1>
        
        {isSignUp && (
          <input 
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            required
          />
        )}
        
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
        
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input"
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

        <button 
          type="submit"
          disabled={loading}
          className={`button ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? `${isSignUp ? 'Signing Up...' : 'Signing In...'}` : 
                    `${isSignUp ? 'Sign Up' : 'Sign In'}`}
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          {renderForm('signup')}
        </div>

        <div className="form-container sign-in-container">
          {renderForm('signin')}
        </div>

        <div className="mobile-nav">
          <button onClick={() => handlePanelSwitch(false)}>
            Already have an account? Sign In
          </button>
          <button onClick={() => handlePanelSwitch(true)}>
            Don't have an account? Sign Up
          </button>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="title">{PANEL_TEXT.signUp.title}</h1>
              <p className="paragraph">{PANEL_TEXT.signUp.description}</p>
              <button 
                className="button ghost" 
                onClick={() => handlePanelSwitch(false)}
              >
                {PANEL_TEXT.signIn.buttonText}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="title">{PANEL_TEXT.signIn.title}</h1>
              <p className="paragraph">{PANEL_TEXT.signIn.description}</p>
              <button 
                className="button ghost" 
                onClick={() => handlePanelSwitch(true)}
              >
                {PANEL_TEXT.signUp.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;