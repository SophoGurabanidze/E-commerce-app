import { apiSlice } from './apiSlice';



export interface LikedProduct {
  id: string;
  product_id: string;
  likedProduct: {
    id: string;
    title: string;
    image: string;
    price: number;
    salePrice?: number | null;
  };
}

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<LikedProduct[], void>({
      query: () => ({ url: '/liked-products' }),
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation<LikedProduct, { productId: string }>({
      query: ({ productId }) => ({
        url: '/liked-products',
        method: 'POST',
        data: { product_id: productId }, 
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation<{ success: boolean }, { likedProductId: string }>({
      query: ({ likedProductId }) => ({
        url: `/liked-products/${likedProductId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
