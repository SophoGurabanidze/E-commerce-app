interface ProductTitleProps {
  title: string;
}

const ProductTitle: React.FC<ProductTitleProps> = ({ title }) => (
  <p className="text-sm text-black mt-1 line-clamp-2 h-[42px]">{title}</p>
);

export default ProductTitle;