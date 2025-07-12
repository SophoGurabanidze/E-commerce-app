import { apiSlice } from './apiSlice';

export interface CartProduct {
  id: string;
  product_id: string;
  user_id: string;
  count: number;
  cartProduct: {
    id: string;
    title: string;
    image: string;
    price: number;
    salePrice?: number | null;
  };
}

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartProduct[], void>({
      query: () => ({ url: '/cart' }),
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: ({ productId }) => ({
        url: '/cart',
        method: 'POST',
        data: { product_id: productId },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: ({ cartProductId }) => ({
        url: `/cart/${cartProductId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation<void, void>({   
      query: () => ({
        url: '/cart/clear',
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartApi;
