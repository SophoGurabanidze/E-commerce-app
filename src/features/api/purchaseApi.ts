

import { apiSlice } from './apiSlice';

export interface Purchase {
  id: string;
  totalPrice: number;
  totalItems: number;
  user_id: string;
  created_at: string;
}

export const purchaseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchases: builder.query<Purchase[], void>({
      query: () => ({
        url: '/purchases',
      }),
      providesTags: ['Purchase'],
    }),
    getPurchaseById: builder.query<Purchase, string>({
      query: (id) => ({
        url: `/purchases/${id}`,
      }),
      providesTags: ['Purchase'],
    }),
    createPurchase: builder.mutation<Purchase, Partial<Purchase>>({
      query: (purchase) => ({
        url: '/purchases',
        method: 'POST',
        data: purchase,
      }),
      invalidatesTags: ['Purchase'],
    }),
    deletePurchase: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Purchase'],
    }),
  }),
});

export const {
  useGetPurchasesQuery,
  useGetPurchaseByIdQuery,
  useCreatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchaseApi;
