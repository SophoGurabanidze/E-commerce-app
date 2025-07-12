interface PriceInfoProps {
  price: number;
  oldPrice?: number;
}

const PriceInfo: React.FC<PriceInfoProps> = ({ price, oldPrice }) => (
  <div className="text-lg font-semibold">
    <span className="text-black">{price} ₾</span>
    {oldPrice && (
      <span className="line-through text-gray-400 md:text-sm ml-2">{oldPrice} ₾</span>
    )}
  </div>
);

export default PriceInfo;
