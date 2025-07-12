import { FC, ReactNode, useContext } from 'react';
import { MenuContext } from './MenuContext';

interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Item: FC<ItemProps> = ({ children, onClick, className = '' }) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('Item must be used within a MenuDropdown');
  const { close } = context;

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default Item;
