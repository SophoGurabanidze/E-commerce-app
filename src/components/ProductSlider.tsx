import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import ProductCard from '../compoundComponents/productCard';
import { useGetProductsQuery } from '../features/product/productApi';
import { useMemo } from 'react';

interface ProductSliderProps {
  categoryName?: string;
  title?: string;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  categoryName = 'Skincare',
  title 
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(true);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  const {
    data,
    isLoading,
    isError,
  } = useGetProductsQuery({ categoryName, page: 1, pageSize: 100 });

  const products = useMemo(() => data?.products || [], [data?.products]);
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    requestAnimationFrame(() => {
      handleScroll();
    });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };



  return (
    <div className="relative mt-10">
  <div className="flex items-center justify-between mb-2">
  <div className="font-bold text-[24px]">{title}</div>
  <a
    href={`/products?categoryName=${encodeURIComponent(categoryName)}`}
    className="flex items-center gap-1 font-bold text-black hover:underline text-[16px]"
  >
    See more
    <ChevronRight size={16} />
  </a>
</div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : isError ? (
        <div className="text-red-600 text-center py-4">Failed to load products.</div>
      ) : (
        <div className="relative">
          {showLeftArrow && (
            <button
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md"
              onClick={() => scroll('left')}
            >
              <ChevronLeft />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1 py-1 md:px-0"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[16.6%]"
              >
                <ProductCard
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
              </div>
            ))}
          </div>

          {showRightArrow && (
            <button
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
              onClick={() => scroll('right')}
            >
              <ChevronRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
