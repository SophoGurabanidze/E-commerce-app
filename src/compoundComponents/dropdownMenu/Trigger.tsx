import { FC, ReactNode, useContext } from 'react';
import { MenuContext } from './MenuContext';

interface TriggerProps {
  children: ReactNode;
}

const Trigger: FC<TriggerProps> = ({ children }) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('Trigger must be used within a MenuDropdown');
  const { toggle, isOpen } = context;

  if (isOpen) return null;

  return (
    <div onClick={toggle} className="cursor-pointer">
      {children}
    </div>
  );
};

export default Trigger;
