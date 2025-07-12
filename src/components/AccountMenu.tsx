import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {
  LogOut,
  Package,
  Heart,
  Settings,
  Shield
} from 'lucide-react';
import { logout } from '../features/auth/authSlice';
import { useGetCurrentUserQuery } from '../features/api/userApi';

interface AccountMenuProps {
  onClose: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { data: currentUser, isLoading } = useGetCurrentUserQuery();

  const handleLogout = () => {
    dispatch(logout());
    onClose(); 
  };

  const links = [
    { label: 'My Orders', to: '/profile/orders', icon: <Package size={18} className="text-black" /> },
    { label: 'Wishlist', to: '/profile/wishlist', icon: <Heart size={18} className="text-black" /> },
    { label: 'Settings', to: '/profile/settings', icon: <Settings size={18} className="text-black" /> },
    { label: 'Admin Panel', to: '/profile/admin', icon: <Shield size={18} className="text-black" /> },
  ];

  return (
    <div className="relative w-[320px] bg-white rounded-xl shadow-xl px-4 pt-4 pb-14 text-black text-sm">
      <div className="font-semibold mb-3 px-2">
        {isLoading
          ? 'Loading...'
          : currentUser
            ? `Hello, ${currentUser.first_name} ${currentUser.last_name}`
            : 'Hello!'}
      </div>

      <div className="grid grid-cols-2 gap-4 px-2">
        {links.map(({ label, to, icon }) => (
          <Link
            key={label}
            to={to}
            onClick={onClose}
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-5 left-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-red-600 hover:text-red-700"
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
