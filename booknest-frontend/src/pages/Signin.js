import React, { useState } from 'react';
// Assuming '../styles/Home.css' provides necessary styling for page-container, auth-container, auth-form, etc.
import '../styles/Home.css';
import Header from './Header'; // Assuming Header component exists
import Footer from './Footer'; // Assuming Footer component exists

function Signin() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to manage messages displayed to the user (e.g., success, error)
  const [message, setMessage] = useState('');
  // State to control the color of the message
  const [messageColor, setMessageColor] = useState('red');
  // State to manage loading state during API calls
  const [isLoading, setIsLoading] = useState(false);

  // Handles changes to form input fields
  const handleChange = (e) => {
    // Updates the formData state with the new input value
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Reset messages and set loading state
    setMessage('');
    setIsLoading(true);

    // Client-side validation: Check if all fields are filled
    if (!formData.email || !formData.password) {
      setMessage('All fields are required.');
      setMessageColor('red');
      setIsLoading(false);
      return;
    }
    // Client-side validation: Check for valid email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Please enter a valid email address.');
      setMessageColor('red');
      setIsLoading(false);
      return;
    }

    // Prepare the payload to be sent to the backend
    const payload = {
      email: formData.email.trim(), // Trim whitespace from email
      password: formData.password,
    };

    // Log the payload to the console for debugging purposes
    // This helps verify what data is actually being sent to the backend
    console.log("Attempting login with payload:", payload);

    try {
      // Make the API call to your backend login endpoint
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Parse the JSON response from the server
      const data = await response.json();

      // Check if the response was successful (status code 2xx)
      if (response.ok) {
        setMessage('Login successful! Redirecting...');
        setMessageColor('green');

        // Store token and user information in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        // If response is not OK, display the error message from the backend
        // Fallback message if data.message is not provided by the backend
        setMessage(data.message || 'Login failed. Please check your credentials and try again.');
        setMessageColor('red');
      }
    } catch (error) {
      // Catch any network errors or issues with the fetch request itself
      console.error('Network or server error during login:', error);
      setMessage('Server is unreachable or an unexpected error occurred. Please try again later.');
      setMessageColor('red');
    } finally {
      // Always set loading to false after the API call completes (success or failure)
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />

      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {/* Display messages to the user */}
          {message && <p style={{ color: messageColor, fontWeight: 'bold' }}>{message}</p>}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading} // Disable input when loading
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading} // Disable input when loading
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <p className="auth-switch">
            Don't have an account? <a href="/signup">Register now</a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Signin;