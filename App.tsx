import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import LegalModal from './components/LegalModal';
import { MOCK_PRODUCTS, MOCK_REVIEWS, PRIVACY_POLICY_TEXT, TERMS_OF_SERVICE_TEXT } from './constants';
import { Product, CartItem } from './types';
import { Star, Search, ArrowUp } from 'lucide-react';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // Search & Navigation State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Home');
  const [showAllTrending, setShowAllTrending] = useState(false);
  const [showAllNew, setShowAllNew] = useState(false);
  
  // Legal Modals State
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Scroll to Top State
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Review Carousel State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [isHoveringReviews, setIsHoveringReviews] = useState(false);

  // Handle Resize for Carousel
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide for Reviews
  useEffect(() => {
    if (isHoveringReviews) return;
    
    const maxIndex = Math.max(0, MOCK_REVIEWS.length - itemsPerPage);
    const interval = setInterval(() => {
      setCurrentReviewIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [itemsPerPage, isHoveringReviews]);

  // Handle Scroll for "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Functions
  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleUpdateCartQuantity = (id: number, delta: number) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  // Wishlist Functions
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    handleRemoveFromWishlist(product.id);
  };

  // Navigation Logic
  const handleCategorySelect = (category: string) => {
    if (category === 'Home') {
      setSearchTerm('');
      setSelectedCategory('Home');
    } else {
      setSearchTerm(category);
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShopNowScroll = () => {
      const newArrivalsSection = document.getElementById('new-arrivals-title');
      if (newArrivalsSection) {
          newArrivalsSection.scrollIntoView({ behavior: 'smooth' });
      }
  };

  // Filter Logic
  const isHomeView = !searchTerm && selectedCategory === 'Home';
  
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
     if (isHomeView) return true;
     
     const term = searchTerm.toLowerCase();

     // Special Navigation Filtering
     if (term === 'new arrivals') return product.tag === 'New';
     if (term === 'sale') return product.tag === 'Sale';
     if (term === 'shoes & bags') {
        const t = product.name.toLowerCase();
        return t.includes('shoe') || t.includes('bag') || t.includes('heel') || t.includes('clutch') || t.includes('sneaker') || t.includes('sandal');
     }
     if (term === 'dresses') return product.name.toLowerCase().includes('dress') || product.name.toLowerCase().includes('gown') || product.name.toLowerCase().includes('frock') || product.name.toLowerCase().includes('maxi');
     if (term === 'abayas') return product.name.toLowerCase().includes('abaya');
     if (term === 'sarees') return product.name.toLowerCase().includes('saree');
     if (term === 'tops') return product.name.toLowerCase().includes('top') || product.name.toLowerCase().includes('shirt') || product.name.toLowerCase().includes('blouse') || product.name.toLowerCase().includes('kurti');

     // General Search
     return (
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        (product.tag && product.tag.toLowerCase().includes(term))
     );
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCategorySelect={handleCategorySelect}
      />
      
      <main className="flex-grow">
        {!isHomeView ? (
          // Search/Category Results View
          <div className="container mx-auto px-4 py-8 min-h-[60vh] animate-fade-in">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <button onClick={() => handleCategorySelect('Home')} className="font-bold uppercase underline hover:text-brand-red focus:outline-none focus:text-brand-red transition-colors">Home</button>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{searchTerm ? 'Search Results' : selectedCategory}</span>
              </div>
              <h2 className="text-3xl font-serif font-bold animate-slide-down">
                {selectedCategory !== 'Home' && !searchTerm ? selectedCategory : (
                   <>Results for <span className="text-brand-red">"{searchTerm}"</span></>
                )}
              </h2>
              <p className="text-gray-500 text-sm">{filteredProducts.length} items found</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
                {filteredProducts.map((product, idx) => (
                  <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={!!wishlist.find(item => item.id === product.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-lg animate-scale-in">
                <Search size={48} className="text-gray-300 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">
                  We couldn't find any items matching your criteria. Try checking for typos or using different keywords.
                </p>
                <button 
                  onClick={() => handleCategorySelect('Home')}
                  className="bg-black text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-gray-800 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        ) : (
          // Default Homepage Content
          <div className="animate-fade-in">
            <Hero onShopNow={handleShopNowScroll} />

            {/* Brand Ticker */}
            <div className="bg-black py-4 overflow-hidden whitespace-nowrap border-b border-gray-800" aria-hidden="true">
              <div className="inline-flex gap-12 animate-marquee text-gray-400 uppercase text-xs font-bold tracking-[0.2em] hover:pause-animation">
                <span>Calvin Klein</span>
                <span>Tommy Hilfiger</span>
                <span>Dress Line Exclusive</span>
                <span>Michael Kors</span>
                <span>Gucci</span>
                <span>Prada</span>
                <span>Mango</span>
                <span>Zara</span>
                <span>Calvin Klein</span>
                <span>Tommy Hilfiger</span>
                <span>Dress Line Exclusive</span>
                <span>Michael Kors</span>
                <span>Gucci</span>
                <span>Prada</span>
                <span>Mango</span>
                <span>Zara</span>
              </div>
            </div>

            {/* New Arrivals */}
            <section className="py-16 bg-white relative overflow-hidden" aria-labelledby="new-arrivals-title">
              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 animate-fade-in-up">
                  <h2 id="new-arrivals-title" className="text-3xl md:text-4xl font-serif font-bold mb-3">New Arrivals</h2>
                  <p className="text-gray-500 uppercase text-xs tracking-widest font-semibold">Fresh looks just for you</p>
                  <div className="w-12 h-0.5 bg-black mx-auto mt-4"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
                  {MOCK_PRODUCTS.slice(12, showAllNew ? 16 : 16).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={!!wishlist.find(item => item.id === product.id)}
                    />
                  ))}
                </div>
                 <div className="mt-12 text-center">
                   <button 
                     onClick={() => setShowAllNew(!showAllNew)}
                     className="border border-black text-black px-10 py-3 uppercase text-xs font-bold hover:bg-black hover:text-white transition-all tracking-widest focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                   >
                      {showAllNew ? 'Show Less' : 'New Arrivals'}
                   </button>
                 </div>
              </div>
            </section>

            {/* Promo Grid */}
            <section className="py-8 bg-gray-50" aria-label="Promotions">
              <div className="container mx-auto px-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {/* Left Big Promo */}
                   <div className="relative h-[400px] md:h-[500px] bg-gray-100 group overflow-hidden cursor-pointer" tabIndex={0} role="link" aria-label="Shop Summer Dresses" onClick={() => handleCategorySelect('Dresses')}>
                     <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
                       <h3 className="text-3xl font-serif font-bold mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">Summer Elegance</h3>
                       <p className="mb-6 max-w-sm text-sm opacity-90 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">Discover the new collection of dresses designed for the modern woman.</p>
                       <span className="inline-block uppercase tracking-widest text-xs font-bold border-b border-white pb-1 w-max group-hover:text-brand-gold group-hover:border-brand-gold transition-colors delay-200">Shop Dresses</span>
                     </div>
                   </div>

                   {/* Right Split Promos */}
                   <div className="flex flex-col gap-4 h-[400px] md:h-[500px]">
                      <div className="flex-1 relative bg-gray-100 group overflow-hidden cursor-pointer" tabIndex={0} role="link" aria-label="Shop Designer Bags" onClick={() => handleCategorySelect('Shoes & Bags')}>
                        <img src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
                        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 bg-black/10 group-hover:bg-black/20 transition-colors">
                          <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider mb-3 shadow-md">Trending</span>
                          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">Designer Bags</h3>
                          <button className="bg-black text-white px-6 py-2 text-xs font-bold uppercase hover:bg-white hover:text-black transition-all transform group-hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white">Shop Now</button>
                        </div>
                      </div>
                      <div className="flex-1 relative bg-gray-100 group overflow-hidden cursor-pointer" tabIndex={0} role="link" aria-label="Shop Footwear Collection" onClick={() => handleCategorySelect('Shoes & Bags')}>
                        <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800" alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
                        <div className="absolute inset-0 flex flex-col justify-center items-end p-8 bg-black/10 group-hover:bg-black/20 transition-colors text-right">
                           <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Footwear <br/> Collection</h3>
                           <p className="text-white text-xs mb-4 drop-shadow-md">Complete your look</p>
                           <span className="text-white text-xs font-bold uppercase border-b border-white pb-1 group-hover:border-brand-gold group-hover:text-brand-gold transition-colors">Explore</span>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>
            </section>

             {/* Split Banner (Sale) */}
            <section className="grid grid-cols-1 md:grid-cols-2" aria-labelledby="sale-banner-title">
                <div className="bg-[#f5f5f5] p-12 md:p-24 flex flex-col justify-center items-start group">
                   <span className="text-red-600 font-bold text-sm uppercase tracking-widest mb-4 animate-pulse">Sale is Live</span>
                   <h2 id="sale-banner-title" className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Up to 70% off <br/> on Abayas</h2>
                   <p className="text-gray-600 mb-8 max-w-md">Grab your favorites before they are gone. Limited stocks available on selected premium brands.</p>
                   <a 
                     href={`https://wa.me/94768685970?text=${encodeURIComponent("Hello Dress Line! ✨ I spotted your 70% OFF Abaya Sale and I'm interested! 🛍️ Can you share the available designs and prices? I don't want to miss out!")}`}
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="bg-black text-white px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black hover:scale-105 transform duration-300"
                   >
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25D366]" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                     </svg>
                     ORDER ON WHATSAPP
                   </a>
                </div>
                <div className="h-[400px] md:h-auto relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1485230946387-43302e56488b?auto=format&fit=crop&q=80&w=1000" alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" aria-hidden="true" />
                </div>
            </section>

            {/* Trending Now */}
            <section className="py-16 bg-white relative overflow-hidden" aria-labelledby="trending-title">
              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 animate-fade-in-up">
                  <h2 id="trending-title" className="text-3xl md:text-4xl font-serif font-bold mb-3">Trending Now</h2>
                  <p className="text-gray-500 uppercase text-xs tracking-widest font-semibold">Handpicked for you</p>
                  <div className="w-12 h-0.5 bg-black mx-auto mt-4"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12">
                  {MOCK_PRODUCTS.slice(0, showAllTrending ? 16 : 8).map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={!!wishlist.find(item => item.id === product.id)}
                    />
                  ))}
                </div>
                 <div className="mt-12 text-center">
                   <button 
                    onClick={() => setShowAllTrending(!showAllTrending)}
                    className="border border-black text-black px-10 py-3 uppercase text-xs font-bold hover:bg-black hover:text-white transition-all tracking-widest focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                   >
                     {showAllTrending ? 'Show Less' : 'Trending collection'}
                   </button>
                 </div>
              </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-16 bg-white border-t border-gray-100" aria-labelledby="reviews-title">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12 animate-fade-in-up">
                  <h2 id="reviews-title" className="text-3xl md:text-4xl font-serif font-bold mb-3">Customer Love</h2>
                  <p className="text-gray-500 uppercase text-xs tracking-widest font-semibold">Real reviews from real style icons</p>
                  <div className="w-12 h-0.5 bg-black mx-auto mt-4"></div>
                </div>

                <div 
                  className="max-w-6xl mx-auto relative overflow-hidden px-2 animate-fade-in delay-200"
                  onMouseEnter={() => setIsHoveringReviews(true)}
                  onMouseLeave={() => setIsHoveringReviews(false)}
                >
                   {/* Reviews Track */}
                   <div 
                      className="flex transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={{ transform: `translateX(-${currentReviewIndex * (100 / itemsPerPage)}%)` }}
                   >
                     {MOCK_REVIEWS.map((review, index) => (
                       <div 
                        key={review.id} 
                        className="flex-shrink-0 px-4 w-full md:w-1/3 box-border"
                       >
                         <div 
                          className="bg-gray-50 p-8 rounded-sm relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out h-full flex flex-col justify-between border border-transparent hover:border-gray-100 opacity-0 animate-fade-in"
                          style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                         >
                            <div className="absolute -top-4 left-8 bg-black text-white p-2 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 z-10" aria-hidden="true">
                              <Star size={16} fill="white" />
                            </div>
                            <div>
                              <div className="flex gap-1 mb-4" aria-label={`Rated ${review.rating} out of 5 stars`}>
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    fill={i < review.rating ? "black" : "none"} 
                                    className={i < review.rating ? "text-black" : "text-gray-300"} 
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <p className="text-gray-600 mb-6 text-sm leading-relaxed font-medium">"{review.comment}"</p>
                            </div>
                            <div className="flex items-center gap-3 mt-auto">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-serif font-bold text-xs" aria-hidden="true">
                                  {review.userName.charAt(0)}
                              </div>
                              <div>
                                  <h4 className="font-bold text-xs uppercase tracking-wider">{review.userName}</h4>
                                  <span className="text-[10px] text-gray-400 block mt-0.5">{review.date}</span>
                              </div>
                            </div>
                         </div>
                       </div>
                     ))}
                   </div>
                   
                   {/* Dots Indicator */}
                   <div className="flex justify-center gap-2 mt-8">
                      {Array.from({ length: Math.ceil(MOCK_REVIEWS.length / itemsPerPage) + (itemsPerPage > 1 ? (MOCK_REVIEWS.length % itemsPerPage === 0 ? 0 : 0) : 0) }).map((_, idx) => {
                         if (idx > MOCK_REVIEWS.length - itemsPerPage) return null;
                         
                         return (
                          <button
                            key={idx}
                            onClick={() => setCurrentReviewIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-500 ${
                              currentReviewIndex === idx ? 'w-8 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to review slide ${idx + 1}`}
                          />
                        );
                      })}
                   </div>
                </div>
              </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-12 bg-gray-50 border-t border-gray-100" aria-label="Our Guarantees">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                   {[
                     { title: "100% Authentic", desc: "Products sourced directly from brands" },
                     { title: "Express Shipping", desc: "Fast delivery across Sri Lanka" },
                     { title: "Easy Returns", desc: "14 days hassle-free returns" },
                     { title: "Secure Payment", desc: "100% secure checkout process" }
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center text-center group">
                        <div className="mb-3 text-black transition-transform duration-300 group-hover:scale-125" aria-hidden="true">
                          <Star size={20} fill={i === 0 ? "black" : "none"} />
                        </div>
                        <h4 className="font-bold text-sm uppercase mb-1">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                     </div>
                   ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer 
        onOpenPrivacy={() => setActiveLegalModal('privacy')}
        onOpenTerms={() => setActiveLegalModal('terms')}
      />

      {/* Floating Join Group Button (Left) */}
      <a 
        href="https://chat.whatsapp.com/CY22AgqycMmFmFHzy1ve2l?mode=wwt" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-3 md:py-3 md:px-6 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 animate-scale-in"
        aria-label="Join our WhatsApp Group"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-5 md:h-5" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="font-bold text-xs uppercase tracking-wide">Join Our Group</span>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 bg-white text-black border border-gray-200 p-3 rounded-full shadow-xl hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-black animate-scale-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}

      {/* Floating WhatsApp Button (Right) */}
      <a 
        href="https://wa.me/94768685970" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 animate-scale-in"
        aria-label="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Drawers */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveItem={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />

      {/* Legal Modals */}
      <LegalModal 
        title="Privacy Policy"
        content={PRIVACY_POLICY_TEXT}
        isOpen={activeLegalModal === 'privacy'}
        onClose={() => setActiveLegalModal(null)}
      />
      <LegalModal 
        title="Terms of Service"
        content={TERMS_OF_SERVICE_TEXT}
        isOpen={activeLegalModal === 'terms'}
        onClose={() => setActiveLegalModal(null)}
      />
    </div>
  );
}

export default App;