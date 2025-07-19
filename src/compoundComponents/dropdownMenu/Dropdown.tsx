import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { MenuContext, MenuContextType } from './MenuContext';



interface MenuDropdownProps {
  children: ReactNode;
  position?: 'below' | 'next';
}

const Dropdown: React.FC<MenuDropdownProps> = ({ children, position = 'below' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

 
  const positionClass = position === 'below' ? 'dropdown-below' : 'dropdown-next';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contextValue: MenuContextType = {
    isOpen,
    toggle,
    close,
    positionClass,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </MenuContext.Provider>
  );
};

export default Dropdown;
