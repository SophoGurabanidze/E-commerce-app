interface DiscountBadgeProps {
  discount?: number;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ discount }) =>
  discount ? (
    <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
      -{discount}%
    </span>
  ) : null;

export default DiscountBadge;