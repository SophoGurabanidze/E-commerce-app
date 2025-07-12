import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../features/product/productApi';
import ProductCard from '../compoundComponents/productCard';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

 
  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    pageSize: 9999,
  });

  const filteredProducts = data?.products?.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-lg mb-2">
        Search results for: <strong>{query}</strong>
      </h2>

      {isLoading && <p>Loading...</p>}

      {filteredProducts?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !isLoading && <p>No matching products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
