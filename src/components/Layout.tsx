import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer';
import { Toaster } from 'react-hot-toast'; 
import ScrollToTop from './ScrollToTop'; 

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
     
      <ScrollToTop />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* ✅ Toaster INSIDE Router context */}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;
