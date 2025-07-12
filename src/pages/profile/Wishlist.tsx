import { useGetWishlistQuery } from '../../features/api/WishlistApi';
import ProductCard from '../../compoundComponents/productCard';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { data: wishlist = [], isLoading } = useGetWishlistQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading your wishlist...</div>;

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
      <img
        src="https://res.cloudinary.com/db4i0zaso/image/upload/v1751219428/empty-wishlist_jgwitk.png"
        alt="Empty wishlist"
        className="w-40 h-40 mb-4"
      />
      <h2 className="text-lg font-semibold">Your list is empty</h2>
      <p className="text-gray-500 mb-4">
        Tap the ❤️ icon on any product to add it.
      </p>
      <button
        onClick={() => navigate('/products')}
        className="px-6 py-2 rounded bg-black text-white hover:bg-gray-900 transition"
      >
        Start Exploring
      </button>
    </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {wishlist.map((liked) =>
        liked.likedProduct ? (
          <ProductCard
            key={liked.likedProduct.id}
            product={{
              id: liked.likedProduct.id,
              title: liked.likedProduct.title,
              image: liked.likedProduct.image,
              price:
                liked.likedProduct.salePrice ?? liked.likedProduct.price,
              oldPrice:
                liked.likedProduct.salePrice &&
                liked.likedProduct.salePrice < liked.likedProduct.price
                  ? liked.likedProduct.price
                  : undefined,
              discount:
                liked.likedProduct.salePrice &&
                liked.likedProduct.salePrice < liked.likedProduct.price
                  ? Math.round(
                      ((liked.likedProduct.price -
                        liked.likedProduct.salePrice) /
                        liked.likedProduct.price) *
                        100
                    )
                  : undefined,
            }}
          />
        ) : null
      )}
    </div>
  );
};

export default Wishlist;
