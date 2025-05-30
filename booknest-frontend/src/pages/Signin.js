import React, { useState } from 'react';
import '../styles/Home.css'; // Use your shared styles here
import Header from './Header';
import Footer from './Footer';

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setMessage('All fields are required.');
      setMessageColor('red');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Please enter a valid email.');
      setMessageColor('red');
      return;
    }

    const payload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      // Replace with your backend signin API endpoint
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful! Redirecting...');
        setMessageColor('green');
        // You can redirect user or store token here
        // For example:
        // localStorage.setItem('token', data.token);
        // window.location.href = '/dashboard';
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
        setMessageColor('red');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
      setMessageColor('red');
    }
  };

  return (
    <div className="page-container">
      <Header />

      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {message && <p style={{ color: messageColor, fontWeight: 'bold' }}>{message}</p>}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

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
