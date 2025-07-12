import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f7f8fa] text-gray-700 border-t">
      <div className="max-w-[1440px] mx-auto px-[100px] py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center place-items-center">
        {/* Logo & Tagline */}
        <div>
          <Link to="/" className="text-2xl font-bold text-gray-900">Store:</Link>
          <p className="mt-2 text-sm text-gray-500 max-w-[200px] mx-auto">
            Elevate your shopping experience with curated collections.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products?categoryName=Clothing" className="hover:underline">Fashion</Link></li>
            <li><Link to="/products?categoryName=Electronics" className="hover:underline">Electronics</Link></li>
            <li><Link to="/products?categoryName=Skincare" className="hover:underline">Skincare</Link></li>
            <li><Link to="/products" className="hover:underline">All Products</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-black">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-black">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-black">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-black">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t mt-4">
        <div className="max-w-[1440px] mx-auto px-4 py-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Store:. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
