import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  first_name: null,
  last_name: null,
  email: null,
  phone_number: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
      }>
    ) => {
      const {
        accessToken,
        refreshToken,
        first_name,
        last_name,
        email,
        phone_number,
      } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.phone_number = phone_number;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.first_name = null;
      state.last_name = null;
      state.email = null;
      state.phone_number = null;

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },

    updateUserInfo: (
      state,
      action: PayloadAction<{
        first_name: string;
        last_name: string;
        email: string;
        phone_number: string;
      }>
    ) => {
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
    },
  },
});

export const { loginSuccess, logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
