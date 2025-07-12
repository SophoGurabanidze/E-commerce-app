// import { useState } from 'react';
// import axios from '../lib/axios';
// import { useAppDispatch } from '../app/hooks';
// import { loginSuccess } from '../features/auth/authSlice';
// import { AxiosError } from 'axios';

// const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
//   const dispatch = useAppDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       // 1. Login: get access/refresh tokens
//       const loginRes = await axios.post('/auth/login', { email, password });
//       const accessToken = loginRes.data.access_token;
//       const refreshToken = loginRes.data.refresh_token;

//       // 2. Set access token temporarily for next request
//       const userRes = await axios.get('/user/current-user', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const user = userRes.data;

//       // 3. Dispatch all auth data
//       dispatch(
//         loginSuccess({
//           accessToken,
//           refreshToken,
//           first_name: user.first_name,
//           last_name: user.last_name,
//           email: user.email,
//           phone_number: user.phone_number,
//         })
//       );

//       onSuccess();
//     } catch (err) {
//       const axiosError = err as AxiosError<{ message?: string }>;
//       const status = axiosError?.response?.status;

//       if (status === 404) {
//         setError('User not found. Please register first.');
//       } else if (status === 401) {
//         setError('Incorrect password.');
//       } else if (axiosError.response?.data?.message) {
//         setError(axiosError.response.data.message);
//       } else {
//         setError('Login failed. Please try again later.');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="space-y-3">
//       {error && <div className="text-red-600 text-sm">{error}</div>}
//       <input
//   type="email"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
//   placeholder="Email"
//   required
//   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// />
// <input
//   type="password"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   placeholder="Password"
//   required
//   className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
// />
// <button
//   type="submit"
//   className="w-full bg-black text-white py-3 rounded-md font-medium"
// >
//   Log In
// </button>
//     </form>
//   );
// };

// export default LoginForm;

import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { loginSuccess } from '../features/auth/authSlice';
import {
  useLoginMutation,
  useLazyGetCurrentUserQuery,
} from '../features/api/userApi';
import {
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  function isFetchBaseQueryError(
    error: unknown
  ): error is FetchBaseQueryError {
    return (
      typeof error === 'object' &&
      error != null &&
      'status' in error
    );
  }

  function isSerializedError(
    error: unknown
  ): error is SerializedError {
    return (
      typeof error === 'object' &&
      error != null &&
      'message' in error
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

   

    try {
     
      const { accessToken, refreshToken } = await login({
        email,
        password,
      }).unwrap();

  

   

    
      const user = await getCurrentUser().unwrap();
      console.log('✅ Current user response:', user);

     
      dispatch(
        loginSuccess({
          accessToken,
          refreshToken,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
        })
      );

      Swal.fire({
        title: 'Good job!',
        text: 'You logged in successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        onSuccess();
      });

   
    } catch (err: unknown) {
      console.error('❌ Login error:', err);
      if (isFetchBaseQueryError(err)) {
        if (err.status === 401) {
          setError('Incorrect email or password.');
        } else {
          setError(`Login failed. Status: ${err.status}`);
        }
      } else if (isSerializedError(err)) {
        setError(err.message || 'Login failed.');
      } else {
        setError('Login failed.');
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        disabled={isLoginLoading}
        className="w-full bg-black text-white py-3 rounded-md font-medium"
      >
        {isLoginLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;
