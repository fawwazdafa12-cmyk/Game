import React, { useState, useMemo } from 'react';
import { SearchIcon, PlusIcon, PencilIcon, TrashIcon } from '../icons/index.tsx';
import { AdminProduct } from '../../types.ts';

interface ProductsPageProps {
  products: AdminProduct[];
  onProductSelect: (product: AdminProduct) => void;
  onAddProduct: () => void;
  onDeleteProduct: (product: AdminProduct) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products, onProductSelect, onAddProduct, onDeleteProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-white">Product Management</h2>
            <p className="text-sm text-[#8A93A5]">Manage your game top-ups, vouchers, and variants.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A93A5]" />
                <input 
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 bg-[#101826] border border-[#1F2733] text-white rounded-xl focus:ring-2 focus:ring-[#38BDF8] focus:outline-none transition-all"
                />
            </div>
            <button 
                onClick={onAddProduct}
                className="flex-shrink-0 h-11 px-4 flex items-center justify-center space-x-2 font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all">
                <PlusIcon className="w-5 h-5" />
                <span>Add Product</span>
            </button>
        </div>
      </div>

      <div className="bg-[#0B0F12] border border-[#1F2733] rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-[#8A93A5] uppercase bg-[#101826]">
              <tr>
                <th scope="col" className="p-4"><input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#7F1DFF] focus:ring-[#38BDF8]"/></th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Brand</th>
                <th scope="col" className="px-6 py-3">Variants</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} onClick={() => onProductSelect(product)} className="border-b border-[#1F2733] hover:bg-[#101826] transition-colors cursor-pointer">
                  <td className="w-4 p-4"><input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-[#7F1DFF] focus:ring-[#38BDF8]"/></td>
                  <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                        <span>{product.name}</span>
                    </div>
                  </th>
                  <td className="px-6 py-4 capitalize">{product.type.replace('_', ' ')}</td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4">{product.variants.length}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        product.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/50 text-gray-400'
                    }`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                   <td className="px-6 py-4 text-right">
                        <button onClick={(e) => { e.stopPropagation(); onDeleteProduct(product); }} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-[#1F2733] rounded-md" title="Delete Product">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 px-4">
                <p className="text-[#8A93A5]">No products found for "{searchQuery}".</p>
            </div>
          )}
        </div>
         <div className="flex justify-between items-center p-4 text-xs text-[#8A93A5]">
            <span>Showing 1-{filteredProducts.length} of {products.length}</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border border-[#1F2733] rounded-md hover:bg-[#1F2733]">Previous</button>
                <button className="px-3 py-1 border border-[#1F2733] rounded-md hover:bg-[#1F2733]">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
