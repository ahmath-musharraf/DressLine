import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react';
import { NAV_LINKS, SHOP_DETAILS, LOGO_URL } from '../constants';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCategorySelect?: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchTerm,
  onSearchChange,
  onCategorySelect
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onCategorySelect) {
      onCategorySelect(linkName);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 font-sans transition-all duration-300">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          
          {/* Mobile Menu & Logo Group */}
          <div className="flex items-center gap-4 md:gap-0">
            <button 
              className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-black rounded-sm hover:bg-gray-50 active:scale-95 transition-transform duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
               <span className={`absolute transition-all duration-300 ease-out transform ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                 <Menu size={24} />
               </span>
               <span className={`absolute transition-all duration-300 ease-out transform ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                 <X size={24} />
               </span>
            </button>

            {/* Logo - Image Based for easy swapping */}
            <div 
              className="group cursor-pointer select-none" 
              onClick={() => onCategorySelect && onCategorySelect('Home')}
            >
              <img 
                src={LOGO_URL} 
                alt={SHOP_DETAILS.name} 
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110" 
              />
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 mx-12 max-w-2xl relative" role="search">
            <label htmlFor="desktop-search" className="sr-only">Search products, brands and more</label>
            <input 
              id="desktop-search"
              type="text" 
              placeholder="Search products, brands and more" 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-sm py-2.5 px-4 pl-10 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 ease-in-out"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 transition-colors duration-300 peer-focus:text-black" size={18} aria-hidden="true" />
            {searchTerm && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-black focus:outline-none focus:text-black animate-scale-in"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 md:gap-8">
            <button 
              onClick={onOpenWishlist}
              className="text-gray-800 hover:text-black transition-colors relative focus:outline-none focus:ring-2 focus:ring-black rounded-sm p-1 group"
              aria-label={`View Wishlist, ${wishlistCount} items`}
            >
              <div className="flex flex-col items-center">
                <Heart size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300 ease-out group-hover:fill-black/5" aria-hidden="true" />
                <span className="text-[10px] mt-1 font-medium uppercase tracking-wider hidden sm:block opacity-70 group-hover:opacity-100 transition-opacity">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 right-1 sm:right-3 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-scale-in shadow-sm" aria-hidden="true">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </button>
            <button 
              onClick={onOpenCart}
              className="text-gray-800 hover:text-black transition-colors relative focus:outline-none focus:ring-2 focus:ring-black rounded-sm p-1 group"
              aria-label={`View Bag, ${cartCount} items`}
            >
              <div className="flex flex-col items-center">
                <ShoppingBag size={24} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300 ease-out group-hover:fill-black/5" aria-hidden="true" />
                <span className="text-[10px] mt-1 font-medium uppercase tracking-wider hidden sm:block opacity-70 group-hover:opacity-100 transition-opacity">Bag</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-1 sm:right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-scale-in shadow-sm" aria-hidden="true">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search (Below header on mobile) */}
        <div className="md:hidden mt-3 relative" role="search">
            <label htmlFor="mobile-search" className="sr-only">Search</label>
             <input 
              id="mobile-search"
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-sm py-2 px-4 pl-10 focus:outline-none focus:border-black text-sm transition-all duration-300"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} aria-hidden="true" />
            {searchTerm && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-black focus:outline-none focus:text-black"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav 
        className={`
          md:flex justify-center border-t border-gray-100 overflow-hidden 
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-top 
          ${isMobileMenuOpen 
            ? 'max-h-[500px] opacity-100 translate-y-0 backdrop-blur-sm bg-white/90' 
            : 'max-h-0 md:max-h-full opacity-0 -translate-y-4 md:opacity-100 md:translate-y-0 md:bg-transparent'}
        `} 
        aria-label="Main Navigation"
      >
        <ul className="flex flex-col md:flex-row md:gap-10 bg-white/90 md:bg-transparent p-4 md:p-0">
          {NAV_LINKS.map((link, index) => (
            <li 
              key={link.name} 
              className={`
                border-b md:border-none border-gray-100 last:border-none 
                transform transition-all duration-500 ease-out
                ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                md:transform-none md:opacity-100 md:transition-none
              `}
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms' }}
            >
              <button 
                onClick={(e) => handleNavClick(e, link.name)}
                className="block w-full text-left py-3 md:py-4 text-sm font-bold uppercase hover:text-[#900C3F] transition-colors duration-300 tracking-widest text-gray-900 focus:outline-none focus:text-[#900C3F] relative group"
              >
                {link.name}
                <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-[#900C3F] transition-all duration-300 ease-out group-hover:w-full hidden md:block origin-left"></span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;