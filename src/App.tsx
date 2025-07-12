import { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import AuthRequired from './components/AuthRequired';
import { getProductsLoader } from './features/products/productsLoaders';
import Loader from './components/Loader';
// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
// const Products = lazy(() => import('./pages/Products'));
import Products from './pages/Products'
const SingleProduct = lazy(() => import('./pages/SingleProduct'));
const Wishlist = lazy(() => import('./pages/profile/Wishlist'));

const Orders = lazy(() => import('./pages/profile/Orders'));
const Settings = lazy(() => import('./pages/profile/Settings'));
const AdminPanel = lazy(() => import('./pages/profile/AdminPanel'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/LogIn'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const ProfileLayout = lazy(() => import('./pages/profile/ProfileLayout'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'products',
        loader: getProductsLoader,
        element: <Products />,
      },
      { path: 'product/:id', element: <SingleProduct /> },

      { path: 'search', element: <SearchResults /> }, 

      {
        element: <AuthRequired />,
        children: [
          // ✅ Profile Section (with nested routes)
          {
            path: 'profile',
            element: <ProfileLayout />,
            children: [
              { index: true, element: <Orders /> },
              { path: 'orders', element: <Orders /> },
              { path: 'wishlist', element: <Wishlist /> },
              { path: 'settings', element: <Settings /> },
              { path: 'admin', element: <AdminPanel /> },
            ],
          },

          // ✅ Other protected routes
        
          { path: 'cart', element: <Cart /> },
        ],
      },

      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<Loader type='ripple' />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
