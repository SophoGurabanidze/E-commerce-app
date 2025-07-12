import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery, useGetCategoriesQuery } from '../features/product/productApi';
import ProductCard from '../compoundComponents/productCard';
import ProductFilters from '../components/ProductFilters';
import { Filter } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    categoryName: searchParams.get('categoryName') || '',
    productName: searchParams.get('productName') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    onlySales: searchParams.get('onlySales') === 'true',
    page: parseInt(searchParams.get('page') || '1'),
    pageSize: parseInt(searchParams.get('pageSize') || '20'),
  };

  const updateFilters = (newValues: Partial<typeof filters>) => {
    const updated = { ...filters, ...newValues };
    const newParams = new URLSearchParams();
    if (updated.categoryName) newParams.set('categoryName', updated.categoryName);
    if (updated.productName) newParams.set('productName', updated.productName);
    if (updated.minPrice) newParams.set('minPrice', updated.minPrice.toString());
    if (updated.maxPrice) newParams.set('maxPrice', updated.maxPrice.toString());
    if (updated.onlySales) newParams.set('onlySales', 'true');
    newParams.set('page', updated.page.toString());
    newParams.set('pageSize', updated.pageSize.toString());
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({ page: '1', pageSize: filters.pageSize.toString() });
  };

  const { data: categories = [] } = useGetCategoriesQuery();

  const backendFilters = {
    categoryName: filters.categoryName,
    minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
    onlySales: filters.onlySales,
    page: filters.page,
    pageSize: filters.pageSize,
  };

  const { data, isLoading } = useGetProductsQuery(backendFilters, {
    refetchOnMountOrArgChange: false,   
  });

  const availableProductNames = useMemo(() => {
    const set = new Set<string>();
    data?.products.forEach((p) => set.add(p.title));
    return Array.from(set);
  }, [data?.products]);

  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.filter((product) => {
      return !filters.productName ||
        product.title.toLowerCase() === filters.productName.toLowerCase();
    });
  }, [data?.products, filters.productName]);

  return (
    <div className="p-4">
      <div   className={`flex flex-col md:flex-row gap-6 ${
    showFilters ? 'justify-start' : 'justify-center'
  }`}>
        {/* Filters on left for desktop, top for mobile */}
        {showFilters && (
          <div className="w-full md:w-64 shrink-0">
            <ProductFilters
              filters={filters}
              categories={categories}
              productNames={availableProductNames}
              updateFilters={updateFilters}
              clearAllFilters={clearAllFilters}
            />
          </div>
        )}

        {/* Main content */}
        <div
  className={`flex-1 transition-all ${
    showFilters ? 'w-full' : 'max-w-[1200px] mx-auto'
  }`}
>
          <div className="flex justify-between items-start mb-4 md:me-[50px]">
            <button
              className="flex items-center gap-2 px-3 py-2 border rounded text-sm hover:bg-gray-100"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Filter size={18} /> <span>Filters</span>
            </button>
            <div className="flex gap-2">
              {[20, 40, 60].map((size) => (
                <button
                  key={size}
                  onClick={() => updateFilters({ pageSize: size, page: 1 })}
                  className={`px-2 py-1 border rounded ${
                    filters.pageSize === size ? 'bg-black text-white' : ''
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id:product.id,
                      image: product.image,
                      title: product.title,
                      discount:
                        product.salePrice != null && product.salePrice < product.price
                          ? +(((product.price - product.salePrice) / product.price) * 100).toFixed(0)
                          : undefined,
                      price: product.salePrice ?? product.price,
                      oldPrice:
                        product.salePrice != null && product.salePrice < product.price
                          ? product.price
                          : undefined,
                    }}
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-4">
                {[...Array(Math.ceil((data?.total ?? 0) / filters.pageSize))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => updateFilters({ page: i + 1 })}
                    className={`px-3 py-1 border rounded ${
                      filters.page === i + 1 ? 'bg-black text-white' : ''
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

// import React, { useState, useMemo } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import {
//   useGetProductsQuery,
//   useGetCategoriesQuery,
// } from '../features/product/productApi';
// import ProductCard from '../compoundComponents/productCard';
// import ProductFilters from '../components/ProductFilters';
// import { Filter } from 'lucide-react';

// const Products = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [showFilters, setShowFilters] = useState(false);

//   const filters = {
//     categoryName: searchParams.get('categoryName') || '',
//     productName: searchParams.get('productName') || '',
//     minPrice: searchParams.get('minPrice') || '',
//     maxPrice: searchParams.get('maxPrice') || '',
//     onlySales: searchParams.get('onlySales') === 'true',
//     page: parseInt(searchParams.get('page') || '1'),
//     pageSize: parseInt(searchParams.get('pageSize') || '20'),
//   };

//   const updateFilters = (newValues: Partial<typeof filters>) => {
//     const updated = { ...filters, ...newValues };
//     const newParams = new URLSearchParams();

//     if (updated.categoryName) newParams.set('categoryName', updated.categoryName);
//     if (updated.productName) newParams.set('productName', updated.productName);

//     if (updated.minPrice !== '') newParams.set('minPrice', updated.minPrice.toString());
//     if (updated.maxPrice !== '') newParams.set('maxPrice', updated.maxPrice.toString());

//     if (updated.onlySales) newParams.set('onlySales', 'true');

//     newParams.set('page', updated.page.toString());
//     newParams.set('pageSize', updated.pageSize.toString());

//     setSearchParams(newParams);
//   };

//   const clearAllFilters = () => {
//     setSearchParams({
//       page: '1',
//       pageSize: filters.pageSize.toString(),
//     });
//   };

//   const { data: categories = [] } = useGetCategoriesQuery();

//   const backendFilters = {
//     categoryName: filters.categoryName || undefined,
//     minPrice: filters.minPrice !== '' ? Number(filters.minPrice) : undefined,
//     maxPrice: filters.maxPrice !== '' ? Number(filters.maxPrice) : undefined,
//     onlySales: filters.onlySales || undefined,
//     page: filters.page,
//     pageSize: filters.pageSize,
//   };

//   const { data, isLoading } = useGetProductsQuery(backendFilters, {
//     refetchOnMountOrArgChange: false,
//   });

//   const availableProductNames = useMemo(() => {
//     const set = new Set<string>();
//     data?.products.forEach((p) => set.add(p.title));
//     return Array.from(set);
//   }, [data?.products]);

//   const filteredProducts = useMemo(() => {
//     if (!data?.products) return [];
//     return data.products.filter((product) => {
//       return (
//         !filters.productName ||
//         product.title.toLowerCase() === filters.productName.toLowerCase()
//       );
//     });
//   }, [data?.products, filters.productName]);

//   return (
//     <div className="p-4">
//       <div
//         className={`flex flex-col md:flex-row gap-6 ${
//           showFilters ? 'justify-start' : 'justify-center'
//         }`}
//       >
//         {/* Filters */}
//         {showFilters && (
//           <div className="w-full md:w-64 shrink-0">
//             <ProductFilters
//               filters={filters}
//               categories={categories}
//               productNames={availableProductNames}
//               updateFilters={updateFilters}
//               clearAllFilters={clearAllFilters}
//             />
//           </div>
//         )}

//         {/* Main */}
//         <div
//           className={`flex-1 transition-all ${
//             showFilters ? 'w-full' : 'max-w-[1200px] mx-auto'
//           }`}
//         >
//           <div className="flex justify-between items-start mb-4 md:me-[50px]">
//             <button
//               className="flex items-center gap-2 px-3 py-2 border rounded text-sm hover:bg-gray-100"
//               onClick={() => setShowFilters((prev) => !prev)}
//             >
//               <Filter size={18} /> <span>Filters</span>
//             </button>
//             <div className="flex gap-2">
//               {[20, 40, 60].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => updateFilters({ pageSize: size, page: 1 })}
//                   className={`px-2 py-1 border rounded ${
//                     filters.pageSize === size ? 'bg-black text-white' : ''
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {isLoading ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {filteredProducts.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={{
//                       id: product.id,
//                       image: product.image,
//                       title: product.title,
//                       discount:
//                         product.salePrice != null &&
//                         product.salePrice < product.price
//                           ? +(
//                               ((product.price - product.salePrice) /
//                                 product.price) *
//                               100
//                             ).toFixed(0)
//                           : undefined,
//                       price: product.salePrice ?? product.price,
//                       oldPrice:
//                         product.salePrice != null &&
//                         product.salePrice < product.price
//                           ? product.price
//                           : undefined,
//                     }}
//                   />
//                 ))}
//               </div>

//               <div className="mt-6 flex justify-center gap-4">
//                 {[
//                   ...Array(
//                     Math.ceil((data?.total ?? 0) / filters.pageSize)
//                   ),
//                 ].map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => updateFilters({ page: i + 1 })}
//                     className={`px-3 py-1 border rounded ${
//                       filters.page === i + 1 ? 'bg-black text-white' : ''
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
