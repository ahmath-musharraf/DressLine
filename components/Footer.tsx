import React from 'react';
import { Facebook, Instagram, Phone, MapPin, Smartphone } from 'lucide-react';
import { SHOP_DETAILS, LOGO_URL_WHITE } from '../constants';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-black text-white pt-16 pb-6 font-sans">
      <div className="container mx-auto px-4">
        {/* Top Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 border-b border-gray-800 pb-12">
          
          {/* Brand Column */}
          <div className="col-span-1">
            {/* Logo */}
            <div className="mb-6 select-none">
              <img 
                src={LOGO_URL_WHITE} 
                alt={SHOP_DETAILS.name} 
                className="h-10 w-auto object-contain" 
              />
            </div>

            <p className="text-gray-400 text-sm mb-6 tracking-wide">{SHOP_DETAILS.tagline}</p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-white/10 p-2.5 rounded-full hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-2.5 rounded-full hover:bg-white hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Store Location */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Store Location</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-white" aria-hidden="true" />
                <a 
                  href="https://maps.app.goo.gl/YR8oRbbJbg3SNNcQ8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="leading-relaxed hover:text-white transition-colors underline decoration-gray-600 underline-offset-4 hover:decoration-white focus:outline-none focus:ring-1 focus:ring-white"
                >
                  {SHOP_DETAILS.location}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-white" aria-hidden="true" />
                <span>{SHOP_DETAILS.phone}</span>
              </li>
            </ul>
          </div>

          {/* Contact Management */}
          <div className="col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6 text-gray-500">Contact Management</h3>
            <div className="space-y-8">
              {SHOP_DETAILS.founders.map((founder, idx) => (
                <div key={idx} className="text-sm border-l-2 border-white/20 pl-4">
                  <p className="font-bold text-white uppercase text-[10px] mb-1 tracking-widest">{founder.role}</p>
                  <p className="font-semibold text-gray-200 mb-1">{founder.name}</p>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Smartphone size={14} aria-hidden="true" />
                    <span className="text-xs tracking-wide">{founder.phone}</span>
                    {founder.phone.includes("76 86 85 970") && (
                       <a 
                         href="https://wa.me/94768685970" 
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="text-[#25D366] hover:text-[#128C7E] transition-colors ml-2 focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                         title="Chat on WhatsApp"
                         aria-label="Chat with Yusuf on WhatsApp"
                       >
                         <WhatsAppIcon width={16} height={16} />
                       </a>
                    )}
                  </div>
                </div>
              ))}
              
              {/* WhatsApp Group Link */}
              <div className="pt-2">
                 <a 
                   href="https://chat.whatsapp.com/CY22AgqycMmFmFHzy1ve2l?mode=wwt" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wide hover:bg-[#20bd5a] transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                 >
                   <WhatsAppIcon width={16} height={16} /> Join WhatsApp Group
                 </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider gap-4 md:gap-0">
          <p>&copy; {new Date().getFullYear()} {SHOP_DETAILS.name}. All rights reserved.</p>
          
          <div>
            Website created by <a href="https://mushieditz.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-white transition-colors focus:outline-none focus:underline text-gray-400">Mushi Editz</a>
          </div>

          <div className="flex gap-6">
            <button 
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors uppercase tracking-wider focus:outline-none focus:text-white"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onOpenTerms}
              className="hover:text-white transition-colors uppercase tracking-wider focus:outline-none focus:text-white"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;