import { useParams } from 'react-router-dom';
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from '../features/product/productApi';
import ProductCard from '../compoundComponents/productCard';
import { Truck, RotateCw, Heart } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';


import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} from '../features/api/WishlistApi';
import { useAppSelector } from '../app/hooks';
import AuthModal from '../components/AuthModal';
import { Link } from 'react-router-dom';
import { useAddToCartMutation } from '../features/api/cartApi';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductByIdQuery(id!);

  const { data: wishlist } = useGetWishlistQuery(undefined, {
    skip: !accessToken,
  });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const likedItem = wishlist?.find((item) => item.product_id === product?.id);



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
                src={product?.image}
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
  

  const [addToCart] = useAddToCartMutation();

const handleAddToCart = async () => {
  if (!accessToken) {
    setAuthModalOpen(true);
    return;
  }

  for (let i = 0; i < quantity; i++) {
    await addToCart({ productId: product!.id });
  }
  showToast('Item added to your cart', 'cart');
};

const toggleWishlist = async () => {
  if (!accessToken) {
    setAuthModalOpen(true);
    return;
  }

  if (likedItem) {
    await removeFromWishlist({ likedProductId: likedItem.id });
    showToast('Item removed from your wishlist', 'wishlist'); 
  } else {
    await addToWishlist({ productId: product!.id });
    showToast('Item added to your wishlist', 'wishlist');
  }
};


  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const {
    data: relatedData,
    isLoading: isRelatedLoading,
  } = useGetProductsQuery(
    {
      categoryName: product?.categoryName,
      page: 1,
      pageSize: 10,
    },
    { skip: !product?.categoryName }
  );

  const relatedProducts = relatedData?.products
    ?.filter((p) => p.id !== product?.id)
    ?.sort(() => 0.5 - Math.random())
    ?.slice(0, 4);

  if (isProductLoading) return <Loader type='ripple'/>;
  if (isProductError || !product) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 ">
      <div className="flex flex-col md:flex-row gap-8 px-8">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-[350px] h-[350px] rounded-lg object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-start">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="mb-6">{product.description}</p>
          <div className="text-2xl font-semibold flex items-center gap-2">
            {product.salePrice != null && product.salePrice < product.price ? (
              <>
                <span className="line-through text-gray-400">${product.price}</span>
                <span className="text-red-600">${product.salePrice}</span>
              </>
            ) : (
              <span>${product.price}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-8">
            <div className="flex items-center border rounded">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 text-lg font-bold bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 text-lg font-bold bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <button
  onClick={handleAddToCart}
  className="px-4 py-2 bg-purpleBlue text-white rounded hover:opacity-90"
>
  Add to Cart
</button>
            <button onClick={toggleWishlist} className="p-2 border rounded hover:bg-gray-100">
              <Heart
                className="w-5 h-5"
                fill={likedItem ? 'red' : 'none'}
                color={likedItem ? 'red' : 'black'}
              />
            </button>
          </div>

          {authModalOpen && (
            <AuthModal
              onClose={() => setAuthModalOpen(false)}
              onSuccess={() => setAuthModalOpen(false)}
            />
          )}

          <div className="mt-6 flex flex-col gap-4 w-1/2">
            <div className="border rounded-lg p-4 flex items-center gap-3">
              <Truck className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-gray-500">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>

            <div className="border rounded-lg p-4 flex items-center gap-3">
              <RotateCw className="w-6 h-6 text-gray-600" />
              <div>
                <p className="font-semibold">Return Delivery</p>
                <p className="text-sm text-gray-500">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        {isRelatedLoading ? (
          <div>Loading related products...</div>
        ) : relatedProducts?.length ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  id: item.id,
                  image: item.image,
                  title: item.title,
                  discount:
                    item.salePrice != null && item.salePrice < item.price
                      ? +(((item.price - item.salePrice) / item.price) * 100).toFixed(0)
                      : undefined,
                  price: item.salePrice ?? item.price,
                  oldPrice:
                    item.salePrice != null && item.salePrice < item.price
                      ? item.price
                      : undefined,
                }}
              />
            ))}
          </div>
        ) : (
          <div>No related products found.</div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
