import { FC, ReactNode, useContext, useEffect } from 'react';
import { MenuContext } from './MenuContext';

interface ContentProps {
  children: ReactNode;
}

const Content: FC<ContentProps> = ({ children }) => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('Content must be used within a MenuDropdown');
  const { isOpen, close } = context;

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" onClick={close}>
      <div className="md:h-1/2 h-4/5 bg-white pt-16 overflow-auto flex flex-col items-center">
        <div className="relative w-[95%] max-w-screen-xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-6 px-2 md:px-0">
            <h2 className="text-xl font-bold">All Categories</h2>
            <button
              onClick={close}
              className="text-2xl font-bold text-gray-600 hover:text-black transition"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{children}</div>
        </div>
      </div>
      <div className="h-1/3 md:h-1/2 backdrop-blur-sm bg-white/30" />
    </div>
  );
};

export default Content;
