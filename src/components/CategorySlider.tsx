import React, { useRef, useState, useEffect } from 'react';
import { useGetCategoriesQuery } from '../features/product/productApi';
import MenuDropdown from '../compoundComponents/dropdownMenu';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategorySlider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      setShowLeftArrow(scrollLeft > 5);
    };

    el.addEventListener('scroll', onScroll);

    setTimeout(() => {
      onScroll();
    }, 100);

    return () => el.removeEventListener('scroll', onScroll);
  }, [categories]);

  if (isLoading) return   <div className="flex items-center justify-center py-10">
  <div className="water-drop"></div>
</div>
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load categories.</div>;

  return (
    <div className="relative flex items-center py-4 bg-white w-full gap-3 overflow-hidden">
      {/* All Categories Dropdown Button */}
      <MenuDropdown position="below">
        <MenuDropdown.Trigger>
          <button className="md:w-[148px] md:h-[172px] w-[120px] h-[132px] shrink-0 bg-black text-white rounded-xl flex flex-col items-center justify-center text-sm font-semibold z-10">
            <div className="flex flex-col items-center gap-4 mx-1">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            All Categories
            </div>
          </button>
        </MenuDropdown.Trigger>

        <MenuDropdown.Content >
       

          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?categoryName=${encodeURIComponent(cat.name)}`}
              className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-lg transition p-4 gap-4"
            >
              <span className="text-sm font-medium">{cat.name}</span>
              <img
                src={cat.image || 'https://via.placeholder.com/100?text=No+Image'}
                alt={cat.name}
                className="w-16 h-14 md:w-24 md:h-24 object-contain"
              />
            </Link>
          ))}
        </MenuDropdown.Content>
      </MenuDropdown>

      {/* Left Arrow - Desktop only */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="hidden lg:flex absolute left-[160px] top-1/2 -translate-y-1/2 z-30 px-2 py-2 rounded-full shadow bg-white"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Scrollable Categories */}
      <div
        ref={sliderRef}
        className="flex-1 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar md:h-[172px] relative z-0"
      >
        <div className="flex w-max h-[130px] gap-3 pl-2">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={`/products?categoryName=${encodeURIComponent(cat.name)}`}
              className="relative md:w-[148px] md:h-[172px] w-[120px] h-[132px] shrink-0 bg-gray-100 hover:bg-gray-200 rounded-xl text-center p-2 transition"
            >
              <p className="text-sm font-medium text-center mt-2">{cat.name}</p>
              <img
                src={cat.image || 'https://via.placeholder.com/100?text=No+Image'}
                alt={cat.name}
                className="absolute bottom-2 right-2 w-20 h-20 object-contain overflow-hidden"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Right Arrow - Desktop only */}
      <button
        onClick={scrollRight}
        className="hidden lg:flex absolute right-2 z-20 bg-white px-3 py-2 rounded-full shadow hover:scale-105"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default React.memo(CategorySlider);

