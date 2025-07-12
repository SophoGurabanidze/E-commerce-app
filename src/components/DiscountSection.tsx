import React from 'react';
import CategoryCard from './CategoryCard';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  title: string;
  discount: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 2,
    title: "Toys",
    discount: "40%",
    image: "https://res.cloudinary.com/db4i0zaso/image/upload/v1750494978/Depth_7_Frame_0_12_toa0gz.png"
  },
  {
    id: 3,
    title: "Books",
    discount: "25%",
    image: "https://res.cloudinary.com/db4i0zaso/image/upload/v1750494979/Depth_7_Frame_0_11_lcwihz.png"
  },
  {
    id: 1,
    title: "Garden",
    discount: "40%",
    image: "https://res.cloudinary.com/db4i0zaso/image/upload/v1750494979/Depth_7_Frame_0_8_qa1f1m.png"
  },
  {
    id: 4,
    title: "Electronics",
    discount: "50%",
    image: "https://res.cloudinary.com/db4i0zaso/image/upload/v1750494978/Depth_7_Frame_0_10_h6ihkl.png"
  }
];

const DiscountSection: React.FC = () => {
  return (
    <section className="my-8 px-4">
      {/* Banner */}
      <div className="relative bg-red-600 rounded-lg h-16 flex items-center px-6 text-white font-bold text-xl mb-6">
        <span>3 Days Only</span>

        {/* Cart Icon in White Circle */}
        <div className="absolute right-4 top-1/3 -translate-y-1/2 w-10 h-[60px] bg-white rounded-full flex items-center justify-center shadow-md">
          <ShoppingCart className="text-red-600" size={20} />
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {categories.map((item) => (
    <Link
      key={item.id}
      to={`/products?categoryName=${encodeURIComponent(item.title)}`}
    >
      <CategoryCard data={item} />
    </Link>
  ))}
</div>
    </section>
  );
};

export default DiscountSection;
