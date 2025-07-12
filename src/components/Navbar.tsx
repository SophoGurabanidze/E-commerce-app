import React, { useState, useEffect } from 'react';
import {

  User,
  ShoppingCart,
  Home,
  LayoutGrid,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import AuthModal from './AuthModal';
import AccountMenu from './AccountMenu';
import CartSidebar from './CartSidebar';
import useMediaQuery from '../hooks/useMediaQuery';
import { useGetCartQuery } from '../features/api/cartApi';
import NavbarSearch from './NavbarSearch'; 

const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const { data: cartItems = [] } = useGetCartQuery(undefined, {
    skip: !accessToken,
  });

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.count, 0);

  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => {
        setDropdownOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

  const handleCartClick = () => {
    if (!accessToken) {
      setShowModal(true);
    } else if (isMobile) {
      navigate('/cart');
    } else {
      setShowCartSidebar(true);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full bg-purpleBlue shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center px-4 py-3 gap-4">
          {/* Logo */}
          <Link to="/" className="text-black text-3xl font-extrabold tracking-wider whitespace-nowrap">
            Store:
          </Link>

          {/* ✅ Search with auto-complete */}
          <div className="flex-grow max-w-[600px] mx-4">
            <NavbarSearch />
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-6 text-black whitespace-nowrap">
            <Link to="/products" className="flex gap-2 hover:text-white transition">
              <LayoutGrid size={24} />
              <span>Products</span>
            </Link>

            <button
              onClick={handleCartClick}
              className="relative flex gap-2 hover:text-white transition"
            >
              <ShoppingCart size={24} fill="currentColor" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full px-1">
                  {totalCartItems}
                </span>
              )}
              <span>Cart</span>
            </button>

            {!accessToken ? (
              <button
                onClick={() => setShowModal(true)}
                className="flex gap-2 hover:text-white transition"
              >
                <User size={24} fill="currentColor" />
                <span>Log in</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex gap-2 hover:text-white transition"
                >
                  <User size={24} fill="currentColor" />
                  <span>My Account</span>
                </button>

                {dropdownOpen && !isMobile && (
                  <div className="absolute right-0 mt-2 z-50">
                    <AccountMenu onClose={() => setDropdownOpen(false)} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center py-2 z-50 lg:hidden">
        <Link to="/" className="flex flex-col items-center text-xs">
          <Home size={22} fill="white" />
          <span>Home</span>
        </Link>

        <Link to="/products" className="flex flex-col items-center text-xs">
          <LayoutGrid size={22} />
          <span>Products</span>
        </Link>

        <button onClick={handleCartClick} className="relative flex flex-col items-center text-xs">
          <ShoppingCart size={22} fill="white" />
          {totalCartItems > 0 && (
            <span className="absolute top-0 right-3 bg-red-600 text-white text-[10px] font-bold rounded-full px-1">
              {totalCartItems}
            </span>
          )}
          <span>Cart</span>
        </button>

        <button
          className="flex flex-col items-center text-xs"
          onClick={() => {
            if (!accessToken) {
              setShowModal(true);
            } else if (isMobile) {
              navigate('/profile');
            } else {
              setDropdownOpen(!dropdownOpen);
            }
          }}
        >
          <User size={22} fill="white" />
          <span>{accessToken ? 'Account' : 'Log in'}</span>
        </button>
      </div>

      {/* ✅ Cart Sidebar Slide Over */}
      {accessToken && showCartSidebar && !isMobile && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowCartSidebar(false)}
          />
          <div className="relative w-full max-w-md bg-white shadow-lg h-2/3 overflow-y-auto self-start">
            <button
              onClick={() => setShowCartSidebar(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
            <div className="p-6">
              <CartSidebar onClose={() => setShowCartSidebar(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
