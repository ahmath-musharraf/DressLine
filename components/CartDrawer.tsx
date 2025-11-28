
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity
}) => {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const whatsappNumber = "94768685970";

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `*New Order Request via Dress Line Web*\n\n`;
    
    cartItems.forEach((item, index) => {
      const sizeInfo = item.selectedSize ? ` - Size: ${item.selectedSize}` : '';
      message += `${index + 1}. *${item.name}* (Ref: #${item.id})${sizeInfo}\n`;
      message += `   Brand: ${item.brand}\n`;
      message += `   Qty: ${item.quantity} x LKR ${item.price.toLocaleString()}\n`;
      message += `   Subtotal: LKR ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += `----------------------------\n`;
    message += `*TOTAL AMOUNT: LKR ${total.toLocaleString()}*\n`;
    message += `----------------------------\n\n`;
    message += "Please confirm availability and share payment details.";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <aside className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 id="cart-drawer-title" className="text-xl font-serif font-bold flex items-center gap-2">
            <ShoppingBag size={20} aria-hidden="true" /> Shopping Bag ({cartItems.length})
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Close shopping bag"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 animate-fade-in">
              <ShoppingBag size={48} className="mb-4 opacity-20" aria-hidden="true" />
              <p className="font-medium">Your bag is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-xs font-bold uppercase underline focus:outline-none focus:text-black hover:text-black transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div 
                key={`${item.id}-${item.selectedSize || 'nosize'}`} 
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
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">{item.brand}</p>
                    {item.selectedSize && (
                      <p className="text-xs font-bold text-black mt-1">Size: {item.selectedSize}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 disabled:opacity-30 focus:outline-none focus:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>
                    <span className="text-sm font-bold">LKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">Subtotal</span>
              <span className="text-xl font-bold">LKR {total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4 text-center">Shipping & taxes calculated at checkout via WhatsApp</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#25D366] text-white py-4 font-bold uppercase text-xs tracking-widest hover:bg-[#20bd5a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
            >
              Checkout on WhatsApp
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
