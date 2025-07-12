import { createContext } from 'react';

export interface MenuContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  positionClass: string;
}


export const MenuContext = createContext<MenuContextType | undefined>(undefined);