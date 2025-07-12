
import React, { useState } from 'react';
import ProductManager from '../../components/ProductManager';
import CategoryManager from '../../components/CategoryManager';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === 'categories' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Manage Categories
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 mx-2 rounded ${
            activeTab === 'products' ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          Manage Products
        </button>
      </div>

      {activeTab === 'categories' ? <CategoryManager /> : <ProductManager />}
    </div>
  );
};

export default AdminPanel;


// import React from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import CategoryForm from './CategoryForm';
// import CategoryList from './CategoryList';
// import ProductForm from './ProductForm';
// import ProductList from './ProductList';

// const AdminPanel = () => {
//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
//       <Tabs defaultValue="categories">
//         <TabsList className="flex gap-4 mb-4">
//           <TabsTrigger value="categories">Manage Categories</TabsTrigger>
//           <TabsTrigger value="products">Manage Products</TabsTrigger>
//         </TabsList>

//         <TabsContent value="categories">
//           <div className="grid md:grid-cols-2 gap-4">
//             <CategoryForm />
//             <CategoryList />
//           </div>
//         </TabsContent>

//         <TabsContent value="products">
//           <div className="grid md:grid-cols-2 gap-4">
//             <ProductForm />
//             <ProductList />
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminPanel;
