
import { useState } from 'react';
import { useGetPurchasesQuery, useDeletePurchaseMutation } from '../../features/api/purchaseApi';

const Orders = () => {
  const { data: orders = [], isLoading } = useGetPurchasesQuery();
  const [deletePurchase] = useDeletePurchaseMutation();

  // Track which order is open
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>;

  if (!orders.length) return <div>You have no orders yet.</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => {
          const isOpen = openOrderId === order.id;

          return (
            <div
              key={order.id}
              className="border rounded p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Order ID: {order.id}</p>
                  <p>Total Price: ₾{order.totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    onClick={() =>
                      setOpenOrderId(isOpen ? null : order.id)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {isOpen ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => deletePurchase(order.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="mt-4 bg-gray-50 p-4 rounded">
                  <p>Total Items: {order.totalItems}</p>
                  <p>Created: {new Date(order.created_at).toLocaleString()}</p>
                  <p>User ID: {order.user_id}</p>
                
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
