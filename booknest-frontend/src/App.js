import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // added Navigate

import Home from './pages/Home';
import Categories from './pages/Categories';
import TopCategory from './pages/TopCategory';
import Fiction from './pages/Fiction';
import NonFiction from './pages/NonFiction';
import Children from './pages/Children';
import NotFound from './pages/NotFound';

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
import Dashboard from './pages/Dashboard';

// Admin pages
import AdminDashboard from './admin/pages/DashboardPage';

// Import useAdminAuth hook to access the admin authentication context
import { useAdminAuth } from './admin/context/AdminAuthContext';

/**
 * AdminRoute component protects routes that should only be accessible by authenticated admins.
 * It checks the 'admin' state from the AdminAuthContext.
 * If 'admin' is true (meaning an admin is logged in), it renders the children (the protected component).
 * Otherwise, it redirects the user to the sign-in page.
 */
function AdminRoute({ children }) {
  const { admin } = useAdminAuth(); // Access the 'admin' state from the context
  return admin ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <Routes>
      {/* User routes */}
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/top" element={<TopCategory />} />
      <Route path="/categories/fiction" element={<Fiction />} />
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

      {/* Combined SignIn for both users and admin */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/account" element={<Account />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Admin dashboard protected by AdminRoute */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Redirect old admin login route to sign in */}
      <Route path="/admin/login" element={<Navigate to="/signin" replace />} />

      {/* Catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
