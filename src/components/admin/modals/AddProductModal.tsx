import { useState } from 'react';
import { useAddProductMutation } from '../../../features/product/productApi';
import type { CreateProductDto } from '../../../features/product/productApi';

interface AddProductModalProps {
  onClose: () => void;
}

const AddProductModal = ({ onClose }: AddProductModalProps) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [salePrice, setSalePrice] = useState<number | ''>('');
  const [image, setImage] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');


  const [addProduct] = useAddProductMutation();

  const handleSubmit = async () => {
    if (!title || !price || !image || !categoryName) return;
  
    const payload: CreateProductDto = {
      title,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      image,
      category_name: categoryName,
      description,
      
    };
  
    try {
      await addProduct(payload);
      onClose();
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>

        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Sale Price"
            value={salePrice}
            onChange={(e) => setSalePrice(Number(e.target.value))}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <textarea
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="border rounded px-3 py-2"
/>

          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end mt-5 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;



