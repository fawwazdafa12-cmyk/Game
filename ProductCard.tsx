import React from 'react';
import { Product } from '../types.ts';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const CardContent = () => (
    <>
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-cover rounded-lg" />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-[#FF4D4D] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="mt-2 text-center flex-grow flex flex-col justify-center">
        <h3 className="font-bold text-sm text-gray-200 group-hover:text-[#7F1DFF] transition-colors whitespace-normal leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-400">{product.category}</p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className="text-left bg-gray-800 rounded-xl border border-gray-700 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#7F1DFF] cursor-pointer group focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#38BDF8] flex flex-col h-full"
      >
        <CardContent />
      </button>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#7F1DFF] cursor-pointer group focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#38BDF8] flex flex-col h-full">
      <CardContent />
    </div>
  );
};

export default ProductCard;