// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages from the pages folder
import Home from './pages/Home';
import Categories from './pages/Categories';
import TopCategory from './pages/TopCategory';
import Fiction from './pages/Fiction';
import NonFiction from './pages/NonFiction';
import Children from './pages/Children';
import TopPicks from './pages/TopPicks';
import Contact from './pages/Contact';
import MyBooks from './pages/MyBooks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/top" element={<TopCategory />} />
        <Route path="/categories/fiction" element={<Fiction />} />
        <Route path="/categories/non-fiction" element={<NonFiction />} />
        <Route path="/categories/children" element={<Children />} />

        <Route path="/top-picks" element={<TopPicks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-books" element={<MyBooks />} />
      </Routes>
    </Router>
  );
}

export default App;
