import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Categories from './pages/Categories';
import TopCategory from './pages/TopCategory';
import Fiction from './pages/Fiction';
import NonFiction from './pages/NonFiction';
import Children from './pages/Children';
import TopPicks from './pages/TopPicks';
import Contact from './pages/Contact';
import MyBooks from './pages/MyBooks';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Account from './pages/Account';

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

        {/* Authentication routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
