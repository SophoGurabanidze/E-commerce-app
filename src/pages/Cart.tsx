import { useNavigate } from 'react-router-dom';
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from '../features/api/cartApi';
import { useCreatePurchaseMutation } from '../features/api/purchaseApi';

const Cart = () => {
  const { data: cartItems = [], isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();
  const [createPurchase] = useCreatePurchaseMutation();
  const navigate = useNavigate();

  // Calculate total price
  const total = cartItems.reduce((acc, item) => {
    const price = item.cartProduct.salePrice ?? item.cartProduct.price;
    return acc + price * item.count;
  }, 0);

  // ✅ Calculate total items as sum of counts
  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);

  const handleCheckout = async () => {
    try {
      await createPurchase({
        totalPrice: total,
        totalItems: totalItems,
      }).unwrap();
      await clearCart();
      navigate('/profile/orders');
    } catch (err) {
      console.error('Checkout failed:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>

      {isLoading && <div>Loading...</div>}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border rounded p-4 justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.cartProduct.image}
                    alt={item.cartProduct.title}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.cartProduct.title}</p>
                    <p className="text-gray-500">
  x{item.count} * ₾
  {(item.cartProduct.salePrice ?? item.cartProduct.price).toFixed(2)} 
</p>
                  
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-semibold">
                    ₾
                    {(
                      (item.cartProduct.salePrice ?? item.cartProduct.price) *
                      item.count
                    ).toFixed(2)}
                  </p>
                  <button
                    onClick={() =>
                      removeFromCart({ cartProductId: item.id })
                    }
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment summary */}
          <div className="border rounded p-6">
            <h2 className="text-lg font-bold mb-4">Payment</h2>
            <div className="flex justify-between mb-2">
              <span>Products ({totalItems})</span>
              <span>₾{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>₾0.00</span>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between font-bold">
              <span>Total price</span>
              <span>₾{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-black-700"
            >
              Place Your Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
