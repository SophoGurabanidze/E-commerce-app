
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void; // ✅ make it optional
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-2xl"
        >
          &times;
        </button>

        <div className="flex flex-col items-center mb-4">
          <img
            src="https://res.cloudinary.com/db4i0zaso/image/upload/v1751203984/logo_bbsurs.png"
            alt="Logo"
            className="h-12 w-12 mb-2 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">Enjoy your shopping</h2>
        </div>

        <div className="flex justify-center gap-10 border-b border-gray-300 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`pb-2 font-medium ${tab === 'login' ? 'border-b-2 border-black' : 'text-gray-400'}`}
          >
            Sign in
          </button>
          <button
            onClick={() => setTab('register')}
            className={`pb-2 font-medium ${tab === 'register' ? 'border-b-2 border-black' : 'text-gray-400'}`}
          >
            Sign up
          </button>
        </div>

        {tab === 'login' ? (
          <>
            <LoginForm onSuccess={onSuccess ?? onClose} /> {/* ✅ Use onSuccess callback */}
            <p className="text-center text-sm mt-4">
              Not registered yet?{' '}
              <button
                onClick={() => setTab('register')}
                className="text-blue-600 underline"
              >
                Sign up here
              </button>
            </p>
          </>
        ) : (
          <RegisterForm onSuccess={() => setTab('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
