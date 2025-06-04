import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <h1>
        <Link to="/" className="logo-link">
          <img src="/assets/logo.png" alt="BookNest Logo" className="logo-img" />
        </Link>
      </h1>

      <nav>
        <Link to="/" className="menu-link">Home</Link>

        <div className="dropdown">
          <Link to="/categories" className="menu-link">Categories ▾</Link>
          <div className="dropdown-content">
            <Link to="/categories/top">Top Category</Link>
            <Link to="/categories/fiction">Fiction</Link>
            <Link to="/categories/non-fiction">Non-Fiction</Link>
            <Link to="/categories/children">Children</Link>
          </div>
        </div>

        <Link to="/top-picks" className="menu-link">Top Picks</Link>
        <Link to="/contact" className="menu-link">Contact</Link>
        <Link to="/my-books" className="menu-link">My Books</Link>
        <Link to="/cart" className="menu-link">Cart</Link>

        {/* Admin Panel Link */}
        <Link to="/admin/dashboard" className="menu-link admin-link">Admin Panel</Link>

        {/* Optional: add auth links here if you want */}
        <Link to="/signup" className="menu-link">Account</Link>
      </nav>
    </header>
  );
};

export default Header;
