import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import DiscountBadge from './DiscountBadge';
import PriceInfo from './PriceInfo';
import ProductTitle from './ProductTitle';
import Actions from './Actions';

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
   
      <div className="relative group p-4 w-full max-w-[200px] md:max-w-[240px] bg-white rounded-lg shadow-md group">
         <Link to={`/product/${product.id}`} className="block">
        <ProductImage src={product.image} alt={product.title}>
          <DiscountBadge discount={product.discount} />
        </ProductImage>

        <div className="mt-1">
          <PriceInfo price={product.price} oldPrice={product.oldPrice} />
          <ProductTitle title={product.title} />
        </div>
        </Link>
        {/* ✅ Pass productId so Actions works */}
        <Actions productId={product.id}
        productImage={product.image}  />
      </div>
   
  );
};

export default ProductCard;
