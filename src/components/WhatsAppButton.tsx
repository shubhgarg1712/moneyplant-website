import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { moneyPlantLogoSymbol, moneyPlantLogoFull } from '../assets/logo';
import whatsappIcon from '../assets/whatsapp-icon.png';

// Official MoneyPlant WhatsApp Business Configuration
export const WHATSAPP_PHONE_NUMBER = "918178419058";
export const WHATSAPP_NUMBER = WHATSAPP_PHONE_NUMBER;
export const WHATSAPP_PREFILLED_TEXT = "Hello MoneyPlant, I would like to know more about your financial services.";
export const WHATSAPP_DEFAULT_MESSAGE = WHATSAPP_PREFILLED_TEXT;

// Exact requested direct WhatsApp URL
export const WHATSAPP_DIRECT_URL = "https://wa.me/918178419058?text=Hello%20MoneyPlant,%20I%20would%20like%20to%20know%20more%20about%20your%20financial%20services.";

export interface WhatsAppButtonProps {
  isBottomMarqueeVisible?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ isBottomMarqueeVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside the widget or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div 
      ref={widgetRef}
      className={`fixed right-4 sm:right-6 z-50 flex flex-col items-end pointer-events-none transition-[bottom] duration-500 ease-out motion-reduce:transition-none ${
        isBottomMarqueeVisible ? 'bottom-[60px] sm:bottom-[70px]' : 'bottom-4 sm:bottom-6'
      }`}
    >
      {/* WhatsApp "Chat with us" Popup */}
      {isOpen && (
        <div 
          role="dialog"
          aria-labelledby="whatsapp-chat-title"
          className="pointer-events-auto mb-3 sm:mb-4 w-[350px] max-w-[calc(100vw-32px)] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transform transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
        >
          {/* Header */}
          <div className="bg-white px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* MoneyPlant Logo */}
              <div className="w-10 h-10 rounded-full bg-slate-50 p-1 border border-slate-100 flex items-center justify-center shrink-0 shadow-xs">
                <img 
                  src={moneyPlantLogoSymbol} 
                  alt="MoneyPlant Official Logo" 
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = moneyPlantLogoFull;
                  }}
                />
              </div>

              {/* Title & Brand */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h3 id="whatsapp-chat-title" className="font-bold text-base text-slate-900 leading-tight truncate">
                    Chat with us
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#0DC143] animate-pulse shrink-0" title="Online" />
                </div>
                <div className="text-xs text-brand-forest font-semibold truncate mt-0.5">
                  MoneyPlant Finserve
                </div>
              </div>
            </div>

            {/* Close Button "×" */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Message Bubble Area */}
          <div className="p-4 sm:p-5 bg-slate-50/70 min-h-[135px] flex flex-col justify-center border-b border-slate-100">
            <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-slate-200/80 max-w-[92%] relative">
              {/* Sender Name */}
              <p className="text-[11px] font-bold text-brand-forest uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>MONEYPLANT</span>
                <span className="text-[10px] font-normal text-slate-400">· Advisory</span>
              </p>
              
              {/* Message Content */}
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                Hi there! 👋<br />
                How can we help you?
              </p>

              {/* Timestamp */}
              <div className="text-[10px] text-slate-400 text-right mt-1.5 font-medium">
                Just now
              </div>
            </div>
          </div>

          {/* Start Chat Button Area */}
          <div className="p-4 sm:p-5 bg-white">
            <a
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-[#0DC143] hover:bg-[#0bb03d] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0DC143]/30"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#0DC143]">
                <img 
                  src={whatsappIcon} 
                  alt="" 
                  className="w-full h-full object-cover scale-[1.78]" 
                />
              </div>
              <span>Start Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Circular WhatsApp Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Chat with MoneyPlant on WhatsApp"}
        aria-expanded={isOpen}
        className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#0DC143]/40 flex items-center justify-center bg-[#0DC143] border border-emerald-600/20"
      >
        {/* Uploaded Official WhatsApp Image */}
        <img 
          src={whatsappIcon} 
          alt="WhatsApp" 
          width={64}
          height={64}
          className="w-full h-full object-cover scale-[1.78] transition-transform duration-200 group-hover:scale-[1.86]" 
        />
      </button>
    </div>
  );
};
