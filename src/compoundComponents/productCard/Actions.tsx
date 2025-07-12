import { useState } from 'react';
import { Heart, ShoppingCart } from 'react-feather';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} from '../../features/api/WishlistApi';
import { useAddToCartMutation } from '../../features/api/cartApi';
import { useAppSelector } from '../../app/hooks';
import AuthModal from '../../components/AuthModal';

interface ActionsProps {
  productId: string;
  productImage: string; 
}

const Actions: React.FC<ActionsProps> = ({ productId, productImage }) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'wishlist' | 'cart' | null>(null);

  const { data: wishlist } = useGetWishlistQuery(undefined, {
    skip: !accessToken,
  });

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const likedItem = wishlist?.find((item) => item.product_id === productId);

  const showToast = (message: string, type: 'wishlist' | 'cart') => {
    toast.custom(
      (t) => (
        <div
          className={`max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
            t.visible ? 'animate-enter' : 'animate-leave'
          }`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <img
                src={productImage}
                alt="Product"
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{message}</p>
                <Link
                  to={type === 'wishlist' ? '/profile/wishlist' : '/cart'}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Go to {type} →
                </Link>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              ×
            </button>
          </div>
        </div>
      ),
      { duration: 3000 }
    );
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!accessToken) {
      setPendingAction('wishlist');
      setAuthModalOpen(true);
      return;
    }

    if (likedItem) {
      await removeFromWishlist({ likedProductId: likedItem.id });
      showToast('Item removed from your wishlist', 'wishlist');
    } else {
      await addToWishlist({ productId });
      showToast('Item added to your wishlist', 'wishlist');
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!accessToken) {
      setPendingAction('cart');
      setAuthModalOpen(true);
      return;
    }

    await addToCart({ productId });
    showToast('Item added to your cart', 'cart');
  };

  const handleLoginSuccess = async () => {
    setAuthModalOpen(false);

    if (pendingAction === 'wishlist') {
      await addToWishlist({ productId });
      showToast('Item added to your wishlist', 'wishlist');
    } else if (pendingAction === 'cart') {
      await addToCart({ productId });
      showToast('Item added to your cart', 'cart');
    }

    setPendingAction(null);
  };

  return (
    <>
      <div
        className="
          flex items-center gap-2 mt-2
          md:absolute md:top-4 md:right-4 md:mt-0 md:flex-col 
           md:group-hover:opacity-100 md:group-hover:visible
          transition-opacity duration-200
        "
      >
        <button
          onClick={toggleWishlist}
          className="w-[15%] md:w-auto text-gray-500 hover:text-red-500 flex justify-center
                     bg-gray-100 md:bg-white rounded-full p-1"
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={likedItem ? 'red' : 'none'} />
        </button>

        <button
  onClick={handleAddToCart}
  className='  w-[85%] md:w-auto 
  bg-[#7a96ea] md:bg-white 
  text-white md:text-gray-700 
  text-sm px-3 py-1 rounded-full 
  flex items-center justify-center gap-1 
  hover:opacity-80 md:hover:bg-purpleBlue md:hover:text-blue-300'
>
  <ShoppingCart
    className="text-white md:text-gray-700 md:hover:text-purpleBlue"
    size={16}
  />
  <span className="md:hidden">Add to Cart</span>
</button>
      </div>

      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Actions;
