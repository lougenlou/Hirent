import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductSidebar from './components/layout/ProductSidebar';
import Cart from './pages/Cart';

function Layout() {
  const location = useLocation();
  
  // Show footer only on these routes
  const showFooterRoutes = ['/cart'];
  const shouldShowFooter = showFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      <Navbar />
      <ProductSidebar />
      
      <Routes>
        <Route path="/cart" element={<Cart />} />
        {/* Add your other routes here */}
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
