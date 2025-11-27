import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveItem: (id: number) => void;
  onMoveToCart: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="wishlist-drawer-title">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <aside className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 id="wishlist-drawer-title" className="text-xl font-serif font-bold flex items-center gap-2">
            <Heart size={20} className="text-red-500 fill-current animate-pulse" aria-hidden="true" /> My Wishlist ({wishlistItems.length})
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Close wishlist"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 animate-fade-in">
              <Heart size={48} className="mb-4 opacity-20" aria-hidden="true" />
              <p className="font-medium">Your wishlist is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-xs font-bold uppercase underline focus:outline-none focus:text-black hover:text-black transition-colors"
              >
                Start Saving Items
              </button>
            </div>
          ) : (
            wishlistItems.map((item, index) => (
              <div 
                key={item.id} 
                className="flex gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden group">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:text-red-500 hover:scale-110 duration-200"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{item.brand}</p>
                    <span className="text-sm font-bold mt-1 block">LKR {item.price.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => onMoveToCart(item)}
                    className="flex items-center justify-center gap-2 bg-black text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black"
                  >
                    <ShoppingBag size={12} aria-hidden="true" /> Add to Bag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};

export default WishlistDrawer;