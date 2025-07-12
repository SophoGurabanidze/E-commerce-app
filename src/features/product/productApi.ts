// import { apiSlice } from '../api/apiSlice'; 


// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   categoryName: string;
//   category_name?: string; 
//   description: string;
//   salePrice?: number | null;
// }

// export interface CreateProductDto {
//   title: string;
//   price: number;
//   salePrice?: number | null;
//   image: string;
//   category_name: string;
//   description: string;
// }

// export interface UpdateProductDto extends CreateProductDto {
//   id: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   image: string;
// }

// export const productApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query<
//       { products: Product[]; total: number },
//       {
//         categoryName?: string;
//         productName?: string;
//         minPrice?: number;
//         maxPrice?: number;
//         onlySales?: boolean;
//         page?: number;
//         pageSize?: number;
//       }
//     >({
//       query: (params) => ({
//         url: '/product',
//         method: 'GET',
//         params,
//       }),
//       providesTags: ['Products'],
//       keepUnusedDataFor: 60, 
//     }),

//     getCategories: builder.query<Category[], void>({
//       query: () => ({ url: '/product-category' }),
//       providesTags: ['Categories'],
//     }),

//     getProductNames: builder.query<string[], { categoryName: string }>({
//       query: ({ categoryName }) => ({
//         url: '/product/names',
//         method: 'GET',
//         params: { categoryName },
//       }),
//     }),

//     getAllProductNames: builder.query<string[], void>({
//       query: () => ({
//         url: '/product',
//         method: 'GET',
//         params: {
//           page: 1,
//           pageSize: 9999,
//         },
//       }),
//       transformResponse: (response: { products: Product[]; total: number }) =>
//         Array.from(new Set(response.products.map((p) => p.title))),
//     }),
    

//     addProduct: builder.mutation<void, CreateProductDto>({
//       query: (newProduct) => ({
//         url: '/product',
//         method: 'POST',
//         data: newProduct,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     updateProduct: builder.mutation<void, UpdateProductDto>({
//       query: (product) => ({
//         url: '/product',
//         method: 'PUT',
//         data: product,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     getProductById: builder.query<Product, string>({
//       query: (id) => ({
//         url: `/product/${id}`,
//         method: 'GET',
//       }),
//     }),

//     deleteProduct: builder.mutation<void, string[]>({
//       query: (ids) => ({
//         url: '/product',
//         method: 'DELETE',
//         data: { ids },
//       }),
//       invalidatesTags: ['Products'],
//     }),

 

//     addCategory: builder.mutation<void, { name: string; image: string }>({
//       query: (newCategory) => ({
//         url: '/product-category',
//         method: 'POST',
//         data: newCategory,
//       }),
//       invalidatesTags: ['Categories'],
//     }),

//     deleteCategory: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/product-category/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Categories'],
//     }),

  
//   }),
//   overrideExisting: false,
// });

// export const {
//   useGetProductsQuery,
//   useGetCategoriesQuery,
//   useGetProductNamesQuery,
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetAllProductNamesQuery,
//   useGetProductByIdQuery,
//   useAddCategoryMutation,
//   useDeleteCategoryMutation,
 
// } = productApi;
import { apiSlice } from '../api/apiSlice';


export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  categoryName: string;
  description: string;
  salePrice?: number | null;
}


interface RawProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  category_name: string; 
  description: string;
  salePrice?: number | null;
}

interface RawProductsResponse {
  products: RawProduct[];
  total: number;
}

export interface CreateProductDto {
  title: string;
  price: number;
  salePrice?: number | null;
  image: string;
  category_name: string; 
  description: string;
}

export interface UpdateProductDto extends CreateProductDto {
  id: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { products: Product[]; total: number },
      {
        categoryName?: string;
        productName?: string;
        minPrice?: number;
        maxPrice?: number;
        onlySales?: boolean;
        page?: number;
        pageSize?: number;
      }
    >({
      query: (params) => ({
        url: '/product',
        method: 'GET',
        params,
      }),
      transformResponse: (response: RawProductsResponse) => ({
        ...response,
        products: response.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image: p.image,
          categoryName: p.category_name || '', 
          description: p.description,
          salePrice: p.salePrice ?? null,
        })),
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 60,
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'GET',
      }),
      transformResponse: (product: RawProduct) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        categoryName: product.category_name || '', 
        description: product.description,
        salePrice: product.salePrice ?? null,
      }),
    }),

    getCategories: builder.query<Category[], void>({
      query: () => ({ url: '/product-category' }),
      providesTags: ['Categories'],
    }),

    getProductNames: builder.query<string[], { categoryName: string }>({
      query: ({ categoryName }) => ({
        url: '/product/names',
        method: 'GET',
        params: { categoryName },
      }),
    }),

    getAllProductNames: builder.query<string[], void>({
      query: () => ({
        url: '/product',
        method: 'GET',
        params: {
          page: 1,
          pageSize: 9999,
        },
      }),
      transformResponse: (response: RawProductsResponse) =>
        Array.from(new Set(response.products.map((p) => p.title))),
    }),

    addProduct: builder.mutation<void, CreateProductDto>({
      query: (newProduct) => ({
        url: '/product',
        method: 'POST',
        data: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation<void, UpdateProductDto>({
      query: (product) => ({
        url: '/product',
        method: 'PUT',
        data: product,
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: builder.mutation<void, string[]>({
      query: (ids) => ({
        url: '/product',
        method: 'DELETE',
        data: { ids },
      }),
      invalidatesTags: ['Products'],
    }),

    addCategory: builder.mutation<void, { name: string; image: string }>({
      query: (newCategory) => ({
        url: '/product-category',
        method: 'POST',
        data: newCategory,
      }),
      invalidatesTags: ['Categories'],
    }),

    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product-category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductNamesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductNamesQuery,
  useGetProductByIdQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = productApi;
