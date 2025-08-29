import React, { useState } from 'react';

const categories = [
  'Lagi Populer',
  'Top Up Langsung',
  'Baru Rilis',
  'Voucher',
  'Entertainment'
];

interface CategoryChipsProps {
  onCategorySelect: (category: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState('Lagi Populer');

  const handleClick = (category: string) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  return (
    <div className="sticky top-16 md:top-20 z-40 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
      <div className="relative max-w-7xl mx-auto">
        <div className="flex space-x-3 overflow-x-auto p-4 no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleClick(category)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 border-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#38BDF8]
                ${
                  activeCategory === category
                    ? 'bg-slate-700 text-white border-[#7F1DFF]'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-500'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChips;