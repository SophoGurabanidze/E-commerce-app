
import React from 'react';

interface LoaderProps {
  type?: 'drop' | 'ripple' | 'wave';
}

const Loader: React.FC<LoaderProps> = ({ type = 'drop' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {type === 'drop' && <div className="water-drop"></div>}

      {type === 'ripple' && <div className="ripple-loader"></div>}

      {type === 'wave' && (
        <svg
          className="wave-loader"
          viewBox="0 0 120 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="28"
        >
          <path fill="#3b82f6">
            <animate
              attributeName="d"
              dur="2s"
              repeatCount="indefinite"
              values="
                M0 10 Q 30 0, 60 10 T 120 10 V30 H0 Z;
                M0 10 Q 30 20, 60 10 T 120 10 V30 H0 Z;
                M0 10 Q 30 0, 60 10 T 120 10 V30 H0 Z
              "
            />
          </path>
        </svg>
      )}
    </div>
  );
};

export default Loader;
