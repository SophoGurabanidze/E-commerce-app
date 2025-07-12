import { LoaderFunctionArgs } from 'react-router-dom';
import { store } from '../../app/store';
import { productApi } from '../product/productApi';

export const getProductsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const categoryName = url.searchParams.get('categoryName') || '';
  const page = parseInt(url.searchParams.get('page') || '1');
  const pageSize = parseInt(url.searchParams.get('pageSize') || '20');

  // ✅ Use RTK Query endpoint to fill cache
  store.dispatch(
    productApi.endpoints.getProducts.initiate({ categoryName, page, pageSize })
  );

  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));
  return null; 
};
