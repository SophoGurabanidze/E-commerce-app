import React from 'react';

interface Props {
  filters: {
    categoryName: string;
    productName: string;
    minPrice: string;
    maxPrice: string;
    onlySales: boolean;
  };
  categories: { id: string; name: string }[];
  productNames: string[];
  updateFilters: (values: Partial<Props['filters']>) => void;
  clearAllFilters: () => void;
}

const ProductFilters: React.FC<Props> = ({
  filters,
  categories,
  productNames,
  updateFilters,
  clearAllFilters,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const updatedValue = type === 'checkbox' ? (target as HTMLInputElement).checked : value;
    const resetProductName = name === 'categoryName' ? { productName: '' } : {};
    updateFilters({ [name]: updatedValue, ...resetProductName });
  };

  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md shadow-sm bg-white">
      <select
        name="categoryName"
        value={filters.categoryName}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>

      <select
        name="productName"
        value={filters.productName}
        onChange={handleChange}
        disabled={!filters.categoryName}
        className="border px-2 py-1 rounded"
      >
        <option value="">All Products</option>
        {productNames.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="onlySales"
          checked={filters.onlySales}
          onChange={handleChange}
        />
        Sales Only
      </label>

      <button
        onClick={clearAllFilters}
        className="text-sm text-red-500 underline self-start"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;
// import React, { useCallback } from 'react';
// import { useDebouncedFilter } from '../hooks/useDebouncedFilters';

// interface Props {
//   filters: {
//     categoryName: string;
//     productName: string;
//     minPrice: string;
//     maxPrice: string;
//     onlySales: boolean;
//     page: number;
//   };
//   categories: { id: string; name: string }[];
//   productNames: string[];
//   updateFilters: (values: Partial<Props['filters']>) => void;
//   clearAllFilters: () => void;
// }

// const ProductFilters: React.FC<Props> = ({
//   filters,
//   categories,
//   productNames,
//   updateFilters,
//   clearAllFilters,
// }) => {
//   // ✅ Wrap update callbacks to be stable for debounce hook
//   const handleMinDebounce = useCallback(
//     (val: string) => updateFilters({ minPrice: val || '', page: 1 }),
//     [updateFilters]
//   );
//   const handleMaxDebounce = useCallback(
//     (val: string) => updateFilters({ maxPrice: val || '', page: 1 }),
//     [updateFilters]
//   );

//   const [localMinPrice, setLocalMinPrice] = useDebouncedFilter(
//     filters.minPrice,
//     handleMinDebounce
//   );

//   const [localMaxPrice, setLocalMaxPrice] = useDebouncedFilter(
//     filters.maxPrice,
//     handleMaxDebounce
//   );

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const target = e.target;
//     const { name, value, type } = target;
//     const updatedValue =
//       type === 'checkbox' ? (target as HTMLInputElement).checked : value;

//     const resetProductName =
//       name === 'categoryName' ? { productName: '' } : {};

//     updateFilters({ [name]: updatedValue, ...resetProductName, page: 1 });
//   };

//   return (
//     <div className="flex flex-col gap-4 border p-4 rounded-md shadow-sm bg-white">
//       <select
//         name="categoryName"
//         value={filters.categoryName}
//         onChange={handleChange}
//         className="border px-2 py-1 rounded"
//       >
//         <option value="">All Categories</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.name}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       <select
//         name="productName"
//         value={filters.productName}
//         onChange={handleChange}
//         disabled={!filters.categoryName}
//         className="border px-2 py-1 rounded"
//       >
//         <option value="">All Products</option>
//         {productNames.map((name) => (
//           <option key={name} value={name}>
//             {name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="number"
//         placeholder="Min Price"
//         value={localMinPrice}
//         onChange={(e) => setLocalMinPrice(e.target.value)}
//         className="border px-2 py-1 rounded"
//       />

//       <input
//         type="number"
//         placeholder="Max Price"
//         value={localMaxPrice}
//         onChange={(e) => setLocalMaxPrice(e.target.value)}
//         className="border px-2 py-1 rounded"
//       />

//       <label className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           name="onlySales"
//           checked={filters.onlySales}
//           onChange={handleChange}
//         />
//         Sales Only
//       </label>

//       <button
//         onClick={clearAllFilters}
//         className="text-sm text-red-500 underline self-start"
//       >
//         Clear All Filters
//       </button>
//     </div>
//   );
// };

// export default ProductFilters;
