
import React, { useState } from 'react';
import { Product } from '../types.ts';
import ProductCard from './ProductCard.tsx';
import { ChevronDownIcon } from './icons/index.tsx';

interface ProductSectionProps {
  id?: string;
  title: string;
  products: Product[];
  icon?: React.ReactNode;
  onProductClick?: (product: Product) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({ id, title, products, icon, onProductClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialItemCount = 6; // Changed from 9 to 6 to show 2 rows

  const displayedProducts = isExpanded ? products : products.slice(0, initialItemCount);
  const canExpand = products.length > initialItemCount;

  return (
    <section id={id}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
            {icon}
            <h2 className="text-xl font-extrabold text-white">{title}</h2>
        </div>
        {/* Button was moved from here */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {displayedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick ? () => onProductClick(product) : undefined}
          />
        ))}
      </div>
      
      {/* "Show more" button moved below the grid and centered */}
      {canExpand && (
        <div className="mt-6 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-5 py-2.5 border-2 border-[#7F1DFF] text-white font-bold rounded-full hover:bg-[#7F1DFF] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7F1DFF] inline-flex items-center"
            >
              {isExpanded ? 'Tampilkan lebih sedikit' : 'Tampilkan lebih banyak'}
              <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;