import React from 'react';
import { useNavigate } from 'react-router-dom';

const Baner1: React.FC = () => {
  const navigate = useNavigate();

  const handleShopClick = () => {
    navigate('/products?categoryName=Clothing');
  };

  return (
    <div
      className="rounded-lg relative w-full h-[250px] md:h-[500px] bg-cover bg-center flex items-end justify-end"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/db4i0zaso/image/upload/v1750347336/Depth_6_Frame_0_lbbdu4.png')",
      }}
    >
      <div className="text-white p-4 md:p-10 transform translate-y-[-10%] translate-x-[-5%] max-w-[90%] md:max-w-[70%] text-right">
        <h2 className="text-[16px] sm:text-[18px] lg:text-[24px] font-semibold">Elevate Your Style</h2>
        <p className="text-[8px] sm:text-[14px] lg:text-[20px] hidden md:block">
          Discover the latest trends and timeless classics in fashion. Shop now <br className="hidden md:block" />
          and redefine your wardrobe with our curated collection.
        </p>
        <button
          onClick={handleShopClick}
          className="text-[12px] sm:text-[14px] lg:text-[20px] bg-[#525B88] mt-2 rounded-lg text-white px-12 py-1 md:py-2 md:px-20"
        >
          Shop
        </button>
      </div>
    </div>
  );
};


export default Baner1;
