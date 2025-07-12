import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Package,
  Heart,
  Settings,
  Shield,
  LogOut,
} from 'lucide-react';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

const ProfileLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const links = [
    { to: 'orders', label: 'My Orders', icon: <Package size={18} /> },
    { to: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { to: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    { to: 'admin', label: 'Admin Panel', icon: <Shield size={18} /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto mt-6 px-4 gap-6">
      {/* Sidebar */}
      <div className="lg:w-1/4 w-full border rounded-lg p-4 shadow-sm flex flex-col justify-between h-fit lg:h-[400px]">
        <div className="flex flex-col gap-4">
          {links.map(({ to, label, icon }) => {
            const isActive =
              location.pathname === `/profile` && to === 'orders'
                ? true
                : location.pathname === `/profile/${to}`;

            return (
              <NavLink
                to={to}
                key={label}
                className={({ isActive: navIsActive }) =>
                  `flex items-center gap-2 text-sm px-2 py-1 rounded hover:bg-gray-100 ${
                    isActive || navIsActive ? 'font-semibold text-blue-600' : ''
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 mt-6 text-sm"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 w-full border rounded-lg p-4 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
