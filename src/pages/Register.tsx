import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../lib/axios';

type FormField = 'first_name' | 'last_name' | 'email' | 'password' | 'phone_number';

type FormDataType = Record<FormField, string>;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as FormField]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    try {
      await axios.post('/auth/register', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed.');
      console.error(error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 mt-10 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {(['first_name', 'last_name', 'email', 'password', 'phone_number'] as FormField[]).map((field) => (
          <input
            key={field}
            name={field}
            type={
              field === 'password'
                ? 'password'
                : field === 'email'
                ? 'email'
                : 'text'
            }
            placeholder={field.replace('_', ' ')}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        ))}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
      <p className="mt-3 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
