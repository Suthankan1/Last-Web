import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
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

// Admin Pages
import AdminDashboard from './admin/pages/DashboardPage';
import AddBook from './admin/pages/AddBook';
import AdminHome from './admin/pages/AdminHome';
import ViewBooks from './admin/pages/ViewBooks';

// Dynamic Category Page
import CategoryPage from './pages/CategoryPage';

// Admin Authentication Context
import { useAdminAuth } from './admin/context/AdminAuthContext';

// Protect Admin Routes
function AdminRoute({ children }) {
  const { admin } = useAdminAuth();
  return admin ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/top" element={<TopCategory />} />
      <Route path="/categories/fiction" element={<Fiction />} />
      <Route path="/categories/non-fiction" element={<NonFiction />} />
      <Route path="/categories/children" element={<Children />} />
      <Route path="/category/:category" element={<CategoryPage />} />

      <Route path="/top-picks" element={<TopPicks />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cart" element={<Cart />} />

      {/* User Auth Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/account" element={<Account />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Admin Routes (Protected) */}
      <Route 
        path="/admin/home"
        element={
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        }
      />
      <Route 
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard /> {/* Changed from <AdminDashboard /> to <AdminHome /> */}
          </AdminRoute>
        }
      />
      <Route 
        path="/admin/add-book"
        element={
          <AdminRoute>
            <AddBook />
          </AdminRoute>
        }
      />
      <Route 
        path="/admin/books"
        element={
          <AdminRoute>
            <ViewBooks />
          </AdminRoute>
        }
      />

      {/* Legacy Admin Route */}
      <Route path="/admin/login" element={<Navigate to="/signin" replace />} />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;