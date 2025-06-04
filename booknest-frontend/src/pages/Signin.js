import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../admin/context/AdminAuthContext'; // Import useAdminAuth hook

function SignIn() {
  const navigate = useNavigate();
  // Destructure the 'login' function from useAdminAuth,
  // renaming it to 'updateAdminAuthStatus' for clarity
  const { login: updateAdminAuthStatus } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // default to 'user'
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    try {
      // Always send the login request to your backend's /api/login endpoint
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          requiredUserType: userType, // Crucially, send the selected userType to the backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // *******************************************************************
        // CRITICAL STEP: Update the AdminAuthContext state with the actual user data
        // This is what tells AdminRoute that an admin is logged in.
        updateAdminAuthStatus(data.user);
        // *******************************************************************

        if (userType === 'admin') {
          navigate('/admin/dashboard'); // Navigate to admin dashboard if admin
        } else {
          navigate('/dashboard'); // Navigate to user dashboard if user
        }
      } else {
        // Display error message from the backend
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your network connection or try again later.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        {error && (
          <p style={{ color: 'salmon', fontWeight: '600', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="user-typeStyle" style={{ textAlign: 'center' }}>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={{
              fontWeight: 'bold',
              color: '#000',
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '12px',
              border: '1.5px solid rgba(0,0,0,0.3)',
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundColor: 'rgba(255,255,255,0.9)',
              cursor: 'pointer',
              marginTop: '0.5rem',
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignIn;
