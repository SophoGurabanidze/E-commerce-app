import React from 'react';

interface CategoryCardProps {
  data: {
    image: string;
    title: string;
    discount: string | number;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-sm group">
      <img
        src={data.image}
        alt={data.title}
        className="w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-[250px] h-40"
      />

      {/* Discount badge */}
      <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded-md">
        {data.discount} OFF
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 text-center py-2 text-sm text-purpleBlue font-semibold">
        {data.title}
      </div>
    </div>
  );
};

export default CategoryCard;
