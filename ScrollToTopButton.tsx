

import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './icons/index.tsx';

interface ScrollToTopButtonProps {
  positionClass?: string;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ positionClass = 'bottom-24 md:bottom-6' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${positionClass} left-4 md:left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#7F1DFF] to-[#38BDF8] text-white flex items-center justify-center shadow-lg transition-all duration-300 z-50 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;