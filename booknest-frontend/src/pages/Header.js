import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';  // Import the CSS

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src="/assets/logo.png" alt="BookNest Logo" className="logo-img" />
          <span className="brand-name">BOOKNEST</span> {/* <-- This adds the text */}
        </Link>
      </div>

      <nav className="navbar">
        <Link to="/" className="menu-link">Home</Link>

        <div className="dropdown">
          <span className="menu-link">Categories ▾</span>
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
        <Link to="/signup" className="menu-link">Account</Link>
      </nav>
    </header>
  );
};

export default Header;
