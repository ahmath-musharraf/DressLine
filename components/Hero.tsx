import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface HeroProps {
  onShopNow?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative w-full min-h-[600px] md:h-[700px] bg-[#f8f5f2] overflow-hidden flex items-center">
      
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[120px] md:text-[250px] font-serif font-bold text-black/[0.03] uppercase leading-none whitespace-nowrap">
          Dress Line
        </h1>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full items-center">
          
          {/* Left Content */}
          <div className="md:col-span-5 flex flex-col items-start pt-12 md:pt-0">
            <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
              <span className="w-8 h-[1px] bg-brand-gold"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Est. 2024 Collection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] text-black mb-6 animate-fade-in-up [animation-delay:200ms]">
              Simply <br/> 
              <span className="italic font-light text-gray-600">The</span> Best
            </h1>
            
            <p className="text-gray-600 max-w-sm mb-10 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
              Redefining elegance for the modern woman. Discover silhouettes that celebrate your style with our exclusive new arrivals.
            </p>
            
            <div className="flex flex-wrap gap-6 animate-fade-in-up [animation-delay:600ms]">
              <button 
                onClick={onShopNow}
                className="group relative px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest overflow-hidden hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Shop Collection <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              
              <button className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-colors">
                View Lookbook
              </button>
            </div>
          </div>

          {/* Right Content - Creative Image Composition */}
          <div className="md:col-span-7 relative h-[500px] md:h-[600px] flex items-center justify-center md:justify-end mt-8 md:mt-0">
            
            {/* Abstract Shape */}
            <div className="absolute top-1/2 left-1/2 md:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-white rounded-full opacity-60 blur-3xl animate-pulse"></div>

            {/* Rotating Badge */}
            <div className="absolute top-0 right-0 md:top-10 md:right-10 z-30 hidden md:flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
               <div className="relative w-full h-full animate-spin-slow">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                   <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                   <text className="text-[11px] font-bold uppercase tracking-[0.15em] fill-black">
                     <textPath href="#circlePath" startOffset="0%">
                       New Arrivals • Dress Line • Fashion •
                     </textPath>
                   </text>
                 </svg>
               </div>
               <Star size={20} className="absolute text-brand-gold fill-brand-gold" />
            </div>

            {/* Main Image - Tall */}
            <div className="relative z-10 w-[260px] md:w-[320px] h-[380px] md:h-[500px] shadow-2xl animate-fade-in-up [animation-delay:300ms]">
               <div className="absolute inset-0 border-[1px] border-white/30 z-20 pointer-events-none m-2"></div>
               <img 
                 src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
                 alt="Main Fashion Model" 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Secondary Image - Floating & Overlapping */}
            <div className="absolute bottom-10 left-0 md:bottom-20 md:left-20 z-20 w-[180px] md:w-[220px] aspect-[4/5] shadow-2xl animate-float">
               <div className="w-full h-full bg-white p-2 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800" 
                    alt="Fabric Detail" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-6 left-6 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    Premium Silk
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;