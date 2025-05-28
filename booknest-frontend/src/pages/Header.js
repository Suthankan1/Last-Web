// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';  // You can keep your header styles here or import Home.css if you want to reuse the same styles

const Header = () => {
  return (
    <header>
      <h1>BookNest</h1>
      <nav>
        <Link to="/" className="menu-link">Home</Link>
        <div className="dropdown">
          <Link to="/categories" className="menu-link">Categories</Link>
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
      </nav>
    </header>
  );
};

export default Header;
