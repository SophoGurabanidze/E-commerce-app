import React, { useState } from 'react';
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
} from '../features/product/productApi';
// import EditCategoryModal from './admin/modals/EditCategoryModal';
// import type { Category } from '../features/product/productApi';

const CategoryManager = () => {
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory] = useAddCategoryMutation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', image: '' });
  // const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (!confirmed) return;
    await deleteCategory(id);
  };

  const handleAdd = async () => {
    await addCategory(newCategory);
    setShowAddModal(false);
    setNewCategory({ name: '', image: '' });
  };

  // const handleEditSave = async (updated: Category) => {
   
  //   console.log('Save edit category (needs mutation):', updated);
  // };

  return (
    <div>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Category
      </button>

      {isLoading ? <p>Loading categories...</p> : (
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div className="flex gap-4 items-center">
                <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />
                <span>{cat.name}</span>
              </div>
              <div className="flex gap-2">
                {/* <button
                  onClick={() => setEditingCategory(cat)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Add New Category</h2>
            <input
              className="w-full border p-2 mb-4 rounded"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              className="w-full border p-2 mb-4 rounded"
              placeholder="Image URL"
              value={newCategory.image}
              onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default CategoryManager;
