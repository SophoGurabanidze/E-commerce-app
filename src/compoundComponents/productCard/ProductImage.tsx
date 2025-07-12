import { ReactNode } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  children?: ReactNode;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, children }) => (
  <div className="relative flex justify-center">
    <img src={src} alt={alt} className="h-[100px] md:h-[160px] object-contain" />
    {children}
  </div>
);

export default ProductImage;
