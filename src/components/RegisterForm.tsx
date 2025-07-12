import { useState } from 'react';
import axios from '../lib/axios';
import Swal from 'sweetalert2';

type FormField = 'first_name' | 'last_name' | 'email' | 'password' | 'phone_number';

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState<Record<FormField, string>>({
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
      Swal.fire({
        title: 'Error',
        text: 'Password must be at least 8 characters long.',
        icon: 'error',
      });
      return;
    }
  
    try {
      await axios.post('/auth/register', formData);
      Swal.fire({
        title: 'Success!',
        text: 'Registration successful!',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        onSuccess();
      });
      onSuccess();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Registration failed.',
        icon: 'error',
      });
      console.error(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {(['first_name', 'last_name', 'email', 'password', 'phone_number'] as FormField[]).map((field) => (
        <input
          key={field}
          name={field}
          type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
          placeholder={field.replace('_', ' ')}
          value={formData[field]}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md"
        />
      ))}
      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;

