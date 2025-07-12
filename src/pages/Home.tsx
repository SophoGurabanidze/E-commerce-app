import React, { useState, useEffect } from 'react';
import CategorySlider from '../components/CategorySlider';
import Baner1 from '../components/Baner1';
import ProductSlider from '../components/ProductSlider';
import DiscountSection from '../components/DiscountSection';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ⏳ Simulate page loading or replace with real logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds for demo

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="water-drop"></div>
      </div>
    );
  }

  return (
    <div className="lg:px-[157px] sm:px-6 py-5 px-3 flex flex-col">
      <CategorySlider />
      <Baner1 />
      <ProductSlider categoryName="Skincare" title="Pamper Your Skin" />
      <DiscountSection />
      <ProductSlider categoryName="Pets" title="Safe Pets, Happy Hearts" />
    </div>
  );
};

export default Home;
