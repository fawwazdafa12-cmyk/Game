

import React, { useState, useEffect, useCallback } from 'react';
import { promoSliderSlides } from './ImageAssets.ts';

const PromoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === promoSliderSlides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full aspect-[2/1] md:aspect-[3/1] lg:rounded-xl overflow-hidden group">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promoSliderSlides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full relative">
            <img src={slide.image} alt={`Promotional banner ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold max-w-2xl">{slide.headline}</h2>
              <p className="mt-2 md:mt-4 text-sm md:text-lg max-w-xl">{slide.subheadline}</p>
              <button className="mt-4 md:mt-6 px-6 py-3 bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] rounded-full text-white font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8]">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {promoSliderSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-4' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PromoSlider;