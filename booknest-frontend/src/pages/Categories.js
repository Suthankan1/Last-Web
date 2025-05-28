// src/pages/Categories.js
import React from 'react';
import { Outlet } from 'react-router-dom';

function Categories() {
  return (
    <div>
      <h1>Categories</h1>
      <Outlet /> {/* This renders the nested routes like TopCategory, Fiction, etc. */}
    </div>
  );
}

export default Categories;
