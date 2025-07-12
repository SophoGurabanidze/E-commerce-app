// import React, { useState } from 'react';
// import type { Category } from '../../../features/product/productApi';

// interface EditCategoryModalProps {
//   category: Category;
//   onSave: (updated: Category) => void;
//   onClose: () => void;
// }

// const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, onSave, onClose }) => {
//   const [form, setForm] = useState<Category>(category);

//   const handleSave = () => {
//     onSave(form);
//     onClose();
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow max-w-md w-full">
//         <h2 className="text-lg font-bold mb-4">Edit Category</h2>
//         <input
//           className="w-full border p-2 mb-4 rounded"
//           placeholder="Category Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="w-full border p-2 mb-4 rounded"
//           placeholder="Image URL"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//         />
//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditCategoryModal;
