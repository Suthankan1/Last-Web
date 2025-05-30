import React, { useState } from 'react';
import '../styles/Home.css'; // Use the styles I gave you earlier
import Header from './Header';  // Import Header component
import Footer from './Footer';  // Import Footer component

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    user_type: 'user',
  });

  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.cpassword) {
      setMessage('All fields are required.');
      setMessageColor('red');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage('Please enter a valid email.');
      setMessageColor('red');
      return;
    }
    if (formData.password !== formData.cpassword) {
      setMessage('Passwords do not match.');
      setMessageColor('red');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      user_type: formData.user_type,
    };

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! You can now log in.');
        setMessageColor('green');
        setFormData({
          name: '',
          email: '',
          password: '',
          cpassword: '',
          user_type: 'user',
        });
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
        setMessageColor('red');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
      setMessageColor('red');
    }
  };

  return (
    <div className="page-container">
      <Header /> {/* HEADER at the top */}

      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Register Now</h2>
          {message && <p style={{ color: messageColor, fontWeight: 'bold' }}>{message}</p>}

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <input
            type="password"
            name="cpassword"
            placeholder="Confirm your password"
            value={formData.cpassword}
            onChange={handleChange}
            required
          />

          <select name="user_type" value={formData.user_type} onChange={handleChange} className="box">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register Now</button>

          <p className="auth-switch">
            Already have an account? <a href="/signin">Login now</a>
          </p>
        </form>
      </div>

      <Footer /> {/* FOOTER at the bottom */}
    </div>
  );
}

export default Signup;
