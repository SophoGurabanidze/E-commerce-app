
import { useNavigate } from 'react-router-dom';
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from '../features/api/cartApi';

const CartSidebar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const { data: cartItems = [], isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const total = cartItems.reduce((acc: number, item) => {
    const price = item.cartProduct.salePrice ?? item.cartProduct.price;
    return acc + price * item.count;
  }, 0);

  const handleViewFullCart = () => {
    navigate('/cart');
    onClose(); // ✅ close sidebar when navigating
  };

  return (
    <div className="w-full h-1/2 flex flex-col">
      <h2 className="text-xl font-bold mb-4">my cart</h2>

      {isLoading && <div>Loading...</div>}

      {cartItems.length === 0 ? (
         <div className="flex flex-col items-center justify-center space-y-4">
         <p>Your cart is empty.</p>
         <button
           onClick={() => {
             navigate('/products');
             onClose(); 
           }}
           className="bg-purpleBlue text-white px-4 py-2 rounded hover:bg-gray-900"
         >
           Start Shopping
         </button>
       </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img
                  src={item.cartProduct.image}
                  alt={item.cartProduct.title}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="ml-3 flex-1">
                  <p className="font-medium text-sm">{item.cartProduct.title}</p>
                  <p className="text-gray-500 text-xs">x{item.count}</p>
                  <p className="text-sm font-semibold">
                    ₾{((item.cartProduct.salePrice ?? item.cartProduct.price) * item.count).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart({ cartProductId: item.id })}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="font-semibold mb-2">სულ: ₾{total.toFixed(2)}</p>
            <button
              onClick={handleViewFullCart}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
            >
              View Full Cart
            </button>
            <button
              onClick={() => clearCart()}
              className="mt-2 w-full text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
