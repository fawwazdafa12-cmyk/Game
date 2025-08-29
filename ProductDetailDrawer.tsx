import React from 'react';
import { AdminProduct, AdminProductVariant } from '../../types.ts';
import { XMarkIcon, PencilIcon, TrashIcon, PlusIcon } from '../icons/index.tsx';

interface ProductDetailDrawerProps {
  product: AdminProduct | null;
  onClose: () => void;
  onEditProduct: () => void;
  onAddVariant: () => void;
  onEditVariant: (variant: AdminProductVariant) => void;
  onDeleteVariant: (variant: AdminProductVariant) => void;
}

const DetailRow: React.FC<{ label: string; value: string | null | boolean; }> = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-4 text-sm py-2">
        <span className="text-[#8A93A5] col-span-1">{label}</span>
        <span className="font-semibold text-white col-span-2">
            {typeof value === 'boolean' ? (
                <span className={`px-2 py-0.5 text-xs rounded-full ${value ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/50 text-gray-400'}`}>
                    {value ? 'Yes' : 'No'}
                </span>
            ) : (
                value || '-'
            )}
        </span>
    </div>
);


const ProductDetailDrawer: React.FC<ProductDetailDrawerProps> = ({ product, onClose, onEditProduct, onAddVariant, onEditVariant, onDeleteVariant }) => {
  const isOpen = !!product;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <aside className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-[#0B0F12] z-[70] transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {product && (
          <>
            <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 border-b border-[#1F2733]">
              <div>
                <h2 className="text-lg font-bold text-white">Product Details</h2>
                <p className="text-xs text-[#8A93A5] font-mono">{product.id}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-[#1F2733] text-[#8A93A5] hover:text-white">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Product Info */}
              <section className="bg-[#101826] border border-[#1F2733] rounded-xl p-4">
                 <div className="flex items-center space-x-4 mb-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                        <h3 className="text-xl font-bold text-white">{product.name}</h3>
                        <p className="text-sm text-[#8A93A5] font-mono">{product.slug}</p>
                    </div>
                 </div>
                 <div className="space-y-1 divide-y divide-[#1F2733]/50">
                    <DetailRow label="Brand" value={product.brand} />
                    <DetailRow label="Type" value={product.type.replace('_', ' ')} />
                    <DetailRow label="Active" value={product.active} />
                    <DetailRow label="Maintenance" value={product.maintenance} />
                 </div>
              </section>

              {/* Variants */}
              <section>
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-bold text-white">Variants ({product.variants.length})</h3>
                    <button onClick={onAddVariant} className="flex items-center space-x-1 text-xs font-semibold text-white bg-[#1F2733] px-2 py-1 rounded-md hover:bg-gray-700">
                        <PlusIcon className="w-3.5 h-3.5" />
                        <span>Add Variant</span>
                    </button>
                 </div>
                 <div className="bg-[#101826] border border-[#1F2733] rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left text-gray-300">
                             <thead className="text-[11px] text-[#8A93A5] uppercase bg-[#0B0F12]">
                                <tr>
                                    <th className="px-4 py-2">Label</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.variants.map(variant => (
                                    <tr key={variant.id} className="border-t border-[#1F2733]/80">
                                        <td className="px-4 py-2 font-semibold text-white">{variant.label}</td>
                                        <td className="px-4 py-2">Rp{variant.price_idr.toLocaleString('id-ID')}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-2 py-0.5 text-[10px] rounded-full ${variant.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/50 text-gray-400'}`}>
                                                {variant.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => onEditVariant(variant)} className="p-1.5 text-gray-400 hover:text-white hover:bg-[#1F2733] rounded-md"><PencilIcon className="w-3.5 h-3.5" /></button>
                                                <button onClick={() => onDeleteVariant(variant)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-[#1F2733] rounded-md"><TrashIcon className="w-3.5 h-3.5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {product.variants.length === 0 && <p className="text-center text-[#8A93A5] py-8 text-xs">No variants found for this product.</p>}
                    </div>
                 </div>
              </section>
            </main>
            
            <footer className="flex-shrink-0 p-6 border-t border-[#1F2733] bg-[#0B0F12] flex justify-end">
                <button onClick={onEditProduct} className="h-11 px-6 font-semibold bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] text-white rounded-xl hover:brightness-110 transition-all flex items-center space-x-2">
                     <PencilIcon className="w-4 h-4" />
                    <span>Edit Product</span>
                </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
};

export default ProductDetailDrawer;
