
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, Globe, Truck, ShieldCheck } from 'lucide-react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Effects
  useEffect(() => {
    const handleScroll = () => {
      // Progress Bar Logic
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Sticky Header Logic
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onCategorySelect) {
      onCategorySelect(linkName);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-[#9E0B3A] z-[60] transition-all duration-300 ease-out" style={{ width: `${scrollProgress * 100}%` }} />

      {/* Fixed Wrapper for Announcement + Header */}
      <div className="fixed top-0 left-0 w-full z-50 flex flex-col shadow-sm">
        
        {/* Top Announcement Bar - Hides on Scroll */}
        <div className={`bg-black text-white text-[10px] md:text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 ease-in-out ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 py-2 opacity-100'}`}>
          <div className="container mx-auto px-4 flex justify-between items-center md:justify-center">
             <div className="hidden md:flex gap-8 items-center animate-fade-in">
                <span className="flex items-center gap-2"><Globe size={12} /> International Shipping Available</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="flex items-center gap-2"><Truck size={12} /> Free Delivery in Batticaloa</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span className="flex items-center gap-2"><ShieldCheck size={12} /> 100% Authentic Brands</span>
             </div>
             {/* Mobile Ticker */}
             <div className="md:hidden w-full overflow-hidden whitespace-nowrap">
               <div className="inline-block animate-marquee pl-full">
                 International Shipping • Free Delivery in Batticaloa • 100% Authentic Brands • New Styles Added Weekly •
               </div>
             </div>
          </div>
        </div>

        <header 
          className={`w-full bg-white/95 backdrop-blur-md border-b border-gray-100 font-sans transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4 md:py-6'}`}
        >
          {/* Main Header */}
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              
              {/* Mobile Menu & Logo Group */}
              <div className="flex items-center gap-4 md:gap-0">
                <button 
                  className="md:hidden relative w-10 h-10 flex items-center justify-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-black rounded-sm hover:bg-gray-50 active:scale-95 transition-transform duration-200"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                   <span className={`absolute transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                     <Menu size={24} />
                   </span>
                   <span className={`absolute transition-all duration-500 ease-in-out transform ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`}>
                     <X size={24} />
                   </span>
                </button>

                {/* Logo - Image Based with scale animation on scroll */}
                <div 
                  className="group cursor-pointer select-none transition-all duration-500" 
                  onClick={() => onCategorySelect && onCategorySelect('Home')}
                >
                  <img 
                    src={LOGO_URL} 
                    alt={SHOP_DETAILS.name} 
                    className={`w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105 ${isScrolled ? 'h-7 md:h-8' : 'h-8 md:h-12'}`} 
                  />
                </div>
              </div>

              {/* Search Bar (Desktop) - Optimized Margins */}
              <div className={`hidden md:flex flex-1 mx-4 lg:mx-16 max-w-xl relative transition-all duration-500 ${isScrolled ? 'scale-95 origin-center' : 'scale-100'}`} role="search">
                <label htmlFor="desktop-search" className="sr-only">Search products, brands and more</label>
                <div className="relative w-full group">
                  <input 
                    id="desktop-search"
                    type="text" 
                    placeholder="Search products, brands and more" 
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-4 pl-12 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-300 ease-in-out placeholder:text-gray-400 group-hover:bg-white group-hover:shadow-sm"
                  />
                  <Search className="absolute left-4 top-2.5 text-gray-400 transition-colors duration-300 group-hover:text-black" size={18} aria-hidden="true" />
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
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                <button 
                  onClick={onOpenWishlist}
                  className="text-gray-800 hover:text-black transition-colors relative focus:outline-none focus:ring-2 focus:ring-black rounded-sm p-1 group"
                  aria-label={`View Wishlist, ${wishlistCount} items`}
                >
                  <div className="flex flex-col items-center">
                    <Heart size={22} strokeWidth={1.5} className={`transition-all duration-300 ease-out group-hover:fill-black/5 ${isScrolled ? 'scale-90' : 'scale-100'}`} aria-hidden="true" />
                    <span className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block opacity-70 group-hover:opacity-100 transition-all ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'mt-1'}`}>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center animate-scale-in shadow-sm" aria-hidden="true">
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
                    <ShoppingBag size={22} strokeWidth={1.5} className={`transition-all duration-300 ease-out group-hover:fill-black/5 ${isScrolled ? 'scale-90' : 'scale-100'}`} aria-hidden="true" />
                    <span className={`text-[9px] font-bold uppercase tracking-wider hidden sm:block opacity-70 group-hover:opacity-100 transition-all ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'mt-1'}`}>Bag</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center animate-scale-in shadow-sm" aria-hidden="true">
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-black text-sm transition-all duration-300"
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
                ? 'max-h-[500px] opacity-100 translate-y-0 backdrop-blur-md bg-white/95' 
                : 'max-h-0 md:max-h-full opacity-0 -translate-y-4 md:opacity-100 md:translate-y-0 md:bg-transparent'}
              ${isScrolled && !isMobileMenuOpen ? 'md:mt-0 md:pt-0' : 'md:mt-2 md:pt-1'}
            `} 
            aria-label="Main Navigation"
          >
            <ul className={`flex flex-col md:flex-row gap-0 md:gap-5 lg:gap-10 bg-transparent p-4 md:p-0 transition-all duration-500 ${isScrolled ? 'md:scale-95' : 'md:scale-100'}`}>
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
                    className="block w-full text-left py-3 md:py-3 text-xs md:text-[11px] lg:text-xs font-bold uppercase hover:text-[#9E0B3A] transition-colors duration-300 tracking-widest text-gray-900 focus:outline-none focus:text-[#9E0B3A] relative group whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute bottom-1 md:bottom-0 left-0 w-0 h-0.5 bg-[#9E0B3A] transition-all duration-300 ease-out group-hover:w-full hidden md:block origin-left"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
