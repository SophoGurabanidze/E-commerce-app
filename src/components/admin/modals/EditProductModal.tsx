import React from 'react';
import { useUpdateProductMutation } from '../../../features/product/productApi';
import type { Product } from '../../../features/product/productApi';
import type { UpdateProductDto } from '../../../features/product/productApi';


interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSaved?: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, onClose, onSaved }) => {
  const [updateProduct] = useUpdateProductMutation();
  const [form, setForm] = React.useState<UpdateProductDto>({
    id: product.id,
    title: product.title,
    price: product.price,
    salePrice: product.salePrice ?? null,
    image: product.image,
    category_name: product.categoryName,
    description: product.description, 
  });
  

  const handleSave = async () => {
    await updateProduct(form);
    onClose();
    onSaved?.();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <input
          type="number"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Sale Price"
          value={form.salePrice ?? ''}
          onChange={(e) =>
            setForm({ ...form, salePrice: e.target.value ? Number(e.target.value) : null })
          }
        />
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-4 rounded"
          placeholder="Category Name"
          value={form.category_name}
          onChange={(e) => setForm({ ...form, category_name: e.target.value })}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
