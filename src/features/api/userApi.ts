import { apiSlice } from './apiSlice';
import { User, UpdateUserPayload } from '../../types/user';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { accessToken: string; refreshToken: string },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        data: body,
      }),
      
      transformResponse: (response: { access_token: string; refresh_token: string }) => ({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
      }),
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/user/current-user',
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<User, UpdateUserPayload>({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        data: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLazyGetCurrentUserQuery,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = userApi;
