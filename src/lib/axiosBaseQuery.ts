import { AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axiosInstance from './axios';
import axios from 'axios';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', data, params }) => {
    try {

    
      const result = await axiosInstance({ url, method, data, params });
    
      if (url === '/auth/login' && result.data?.access_token) {
        localStorage.setItem('access_token', result.data.access_token);
        localStorage.setItem('refresh_token', result.data.refresh_token);
      }
      return { data: result.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: {
            status: error.response?.status,
            data: error.response?.data || error.message,
          },
        };
      }
    
      return {
        error: {
          status: 500,
          data: error,
        },
      };
    }
  };
