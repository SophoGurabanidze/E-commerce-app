
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirectTo') || '/profile';
  const message = searchParams.get('message'); 
  const handleSuccess = () => {
    navigate(redirectTo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border p-6 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">Log In</h2>

        {message && (
          <div className="mb-4 px-4 py-2 bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm rounded">
            {decodeURIComponent(message)}
          </div>
        )}

        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default Login;