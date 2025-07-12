import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from '../../features/api/userApi';
import { updateUserInfo } from '../../features/auth/authSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth);

  // ✅ 1️⃣ Auto-fetch user on load to rehydrate Redux state
  const { data, isSuccess } = useGetCurrentUserQuery(undefined, {
    skip: !localStorage.getItem('access_token'),
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateUserInfo({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
      }));
    }
  }, [isSuccess, data, dispatch]);

 
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
  });


  
  useEffect(() => {
    if (modalOpen) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
      });
    }
  }, [modalOpen, user]);

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await updateUser(formData).unwrap();
      dispatch(updateUserInfo(updated));
      setModalOpen(false);
      alert('User info updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update user info.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded space-y-6">
      <h2 className="text-xl font-bold">Your Information</h2>

      <div className="space-y-2">
        <p><strong>First Name:</strong> {user.first_name || '-'}</p>
        <p><strong>Last Name:</strong> {user.last_name || '-'}</p>
        <p><strong>Email:</strong> {user.email || '-'}</p>
        <p><strong>Phone Number:</strong> {user.phone_number || '-'}</p>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Update Info
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">Update Your Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
                required
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;



// import React, { useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { useUpdateUserMutation } from '../../features/product/productSlice';
// import { updateUserInfo } from '../../features/auth/authSlice';

// const Settings = () => {
//   const user = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();

//   const [modalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     first_name: user.first_name || '',
//     last_name: user.last_name || '',
//     email: user.email || '',
//     phone_number: user.phone_number || '',
//   });

//   const [updateUser, { isLoading }] = useUpdateUserMutation();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const updated = await updateUser(formData).unwrap();
//       dispatch(updateUserInfo(updated));
//       setModalOpen(false);
//       alert('User info updated successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Update failed.');
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
//       <h2 className="text-xl font-bold">Your Information</h2>

//       <div className="space-y-2">
//         <p><strong>First Name:</strong> {user.first_name}</p>
//         <p><strong>Last Name:</strong> {user.last_name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Phone Number:</strong> {user.phone_number}</p>
//       </div>

//       <button
//         onClick={() => setModalOpen(true)}
//         className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//       >
//         Update Info
//       </button>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg relative">
//             <h3 className="text-lg font-semibold mb-4">Update Your Information</h3>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 placeholder="First Name"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full p-2 border rounded"
//                 required
//               />
//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 className="w-full p-2 border rounded"
//                 required
//               />

//               <div className="flex justify-between mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setModalOpen(false)}
//                   className="px-4 py-2 border rounded hover:bg-gray-100"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//                 >
//                   {isLoading ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;
