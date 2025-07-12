import { useAppSelector } from '../app/hooks';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthRequired = () => {
  const token = useAppSelector((state) => state.auth.accessToken);
  const location = useLocation();

  if (!token) {
    const redirectPath = `/login?message=Please+log+in+to+continue.&redirectTo=${location.pathname}`;
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AuthRequired;

