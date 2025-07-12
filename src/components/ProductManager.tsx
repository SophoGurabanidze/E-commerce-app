import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  // useUpdateProductMutation,
  // useAddProductMutation,
} from '../features/product/productApi';
import type { Product } from '../features/product/productApi';
import AddProductModal from './admin/modals/AddProductModal';
import EditProductModal from './admin/modals/EditProductModal';

const ProductManager = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { data } = useGetProductsQuery({ page, pageSize });
  const [deleteProducts] = useDeleteProductMutation();
  // const [updateProduct] = useUpdateProductMutation();
  // const [addProduct] = useAddProductMutation();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const totalPages = data ? Math.ceil((data.total || 0) / pageSize) : 1;

  const handleDelete = async (id: string) => {
    if (!id) return;
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;
    await deleteProducts([id]);
  };

  const handleUpdate = async (product: Product) => {
    setEditProduct(product);
  };

  return (
    <div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddModal(true)}
      >
        Add Product
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.products?.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded flex flex-col gap-2"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-contain"
            />
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-sm">Price: ${product.price}</p>
            {product.salePrice && <p className="text-sm text-red-500">Sale Price: ${product.salePrice}</p>}
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(product)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductManager;
