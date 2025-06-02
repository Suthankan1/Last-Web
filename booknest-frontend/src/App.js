import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter as Router

// Make sure each of these is a default export from its file!
import Home from './pages/Home';
import Categories from './pages/Categories';
import TopCategory from './pages/TopCategory';
import Fiction from './pages/Fiction';
import NonFiction from './pages/NonFiction';
import Children from './pages/Children';

import TopPicks from './pages/TopPicks';
import Contact from './pages/Contact';
import MyBooks from './pages/MyBooks';

import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HelpCenter from './pages/HelpCenter';
import TermsOfService from './pages/TermsOfService';

import Cart from './pages/Cart';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard'; // Import the Dashboard component

function App() {
  return (
    // Removed <Router> wrapper here, as it should be in index.js
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/top" element={<TopCategory />} />
      <Route path="/categories/fiction" element="/categories/fiction" />
      <Route path="/categories/non-fiction" element={<NonFiction />} />
      <Route path="/categories/children" element={<Children />} />
      
      <Route path="/top-picks" element={<TopPicks />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/my-books" element={<MyBooks />} />

      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/account" element={<Account />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* Add the Dashboard route */}
    </Routes>
  );
}

export default App;
