import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white w-full max-w-2xl max-h-[80vh] flex flex-col rounded-sm shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 id="legal-modal-title" className="text-2xl font-serif font-bold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Close modal"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8" tabIndex={0}>
          <div className="prose prose-sm md:prose-base max-w-none text-gray-700">
             {content.split('\n').map((line, index) => (
                <p key={index} className="mb-4 whitespace-pre-line leading-relaxed">
                  {line.startsWith('**') ? (
                    <strong className="text-black block text-lg mt-6 mb-2">{line.replace(/\*\*/g, '')}</strong>
                  ) : line.startsWith('*') ? (
                     <em className="text-gray-500">{line.replace(/\*/g, '')}</em>
                  ) : (
                    line
                  )}
                </p>
             ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-black text-white px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;