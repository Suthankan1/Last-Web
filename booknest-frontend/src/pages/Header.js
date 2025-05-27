import React from "react";

const Header = () => {
  return (
    <header>
      <h1>BookNest</h1>
      <nav>
        <a href="#" className="menu-link">Home</a>
        <div className="dropdown">
          <a href="#" className="menu-link">Categories</a>
          <div className="dropdown-content">
            <a href="#">Top Category</a>
            <a href="#">Fiction</a>
            <a href="#">Non-Fiction</a>
            <a href="#">Children</a>
          </div>
        </div>
        <a href="#" className="menu-link">Top Picks</a>
        <a href="#" className="menu-link">Contact</a>
        <a href="#" className="menu-link">My Books</a>
      </nav>
    </header>
  );
};

export default Header;
