import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { moneyPlantLogoSymbol, moneyPlantLogoFull } from '../assets/logo';

// Official MoneyPlant WhatsApp Business Configuration
export const WHATSAPP_PHONE_NUMBER = "918178419058";
export const WHATSAPP_NUMBER = WHATSAPP_PHONE_NUMBER;
export const WHATSAPP_PREFILLED_TEXT = "Hello MoneyPlant, I would like to know more about your financial services.";
export const WHATSAPP_DEFAULT_MESSAGE = WHATSAPP_PREFILLED_TEXT;

// Exact requested direct WhatsApp URL
export const WHATSAPP_DIRECT_URL = "https://wa.me/918178419058?text=Hello%20MoneyPlant,%20I%20would%20like%20to%20know%20more%20about%20your%20financial%20services.";

export const WhatsAppButton: React.FC = () => {
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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none"
    >
      {/* 2 & 3. WhatsApp Business Chat Popup */}
      {isOpen && (
        <div 
          role="dialog"
          aria-labelledby="whatsapp-chat-title"
          className="pointer-events-auto mb-3 sm:mb-4 w-[360px] max-w-[calc(100vw-32px)] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transform animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* MoneyPlant Logo */}
              <div className="w-10 h-10 rounded-xl bg-slate-50 p-1 border border-slate-100 flex items-center justify-center shrink-0">
                <img 
                  src={moneyPlantLogoSymbol} 
                  alt="MoneyPlant Official Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = moneyPlantLogoFull;
                  }}
                />
              </div>

              {/* Brand Name & Tagline */}
              <div className="flex flex-col min-w-0">
                <div id="whatsapp-chat-title" className="font-extrabold text-base tracking-tight leading-none flex items-center">
                  <span className="text-[#1E3F0A]">MONEY</span>
                  <span className="text-[#527E24]">PLANT</span>
                </div>
                <div className="text-[11px] text-slate-800 font-semibold tracking-normal mt-0.5 truncate">
                  “We speak financial fluently”
                </div>
              </div>
            </div>

            {/* Close Button "×" */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Status Below Header: "Typically replies within a day" */}
          <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0"></span>
            <span className="text-xs text-slate-600 font-medium">
              Typically replies within a day
            </span>
          </div>

          {/* 4. Chat Message Bubble Area */}
          <div className="p-4 sm:p-5 bg-[#efeae2]/40 min-h-[145px] flex flex-col justify-center">
            <div className="bg-white rounded-2xl rounded-tl-xs p-4 shadow-sm border border-slate-200/70 max-w-[92%] relative">
              {/* Sender Name */}
              <p className="text-[11px] font-bold text-[#1E3F0A] uppercase tracking-wider mb-1">
                MONEYPLANT
              </p>
              
              {/* Message Content */}
              <p className="text-sm text-slate-800 leading-relaxed font-normal">
                Hi there! 👋<br />
                How can we help you?
              </p>

              {/* Message Timestamp */}
              <div className="text-[10px] text-slate-400 text-right mt-1.5 font-medium">
                Just now
              </div>
            </div>
          </div>

          {/* 5. Start Chat Button */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-100">
            <a
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
            >
              {/* WhatsApp Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 shrink-0"
              >
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.204 8.204 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.187 8.187 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.8 11.66c-.2-.1-.18-.09-1.17-.58-.99-.49-1.15-.55-1.3-.32-.15.22-.59.73-.72.88-.13.15-.26.17-.46.07-.2-.1-.85-.31-1.62-.99-.6-.54-1-1.2-1.12-1.4-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.46-1.11-.63-1.52-.17-.4-.34-.35-.46-.35-.12 0-.26-.01-.4-.01s-.36.05-.55.26c-.19.21-.72.71-.72 1.72s.74 2 0 .84 2.13 1.83 3.51 2.43.76.32 1.05.3.62-.03.88-.34.39-.77.44-.88c.05-.12.05-.22-.05-.27z"/>
              </svg>
              <span>Start Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* 1. Floating Circular WhatsApp Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        aria-expanded={isOpen}
        className="pointer-events-auto w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Authentic White WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:rotate-6"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.204 8.204 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.187 8.187 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.8 11.66c-.2-.1-.18-.09-1.17-.58-.99-.49-1.15-.55-1.3-.32-.15.22-.59.73-.72.88-.13.15-.26.17-.46.07-.2-.1-.85-.31-1.62-.99-.6-.54-1-1.2-1.12-1.4-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.46-1.11-.63-1.52-.17-.4-.34-.35-.46-.35-.12 0-.26-.01-.4-.01s-.36.05-.55.26c-.19.21-.72.71-.72 1.72s.74 2 0 .84 2.13 1.83 3.51 2.43.76.32 1.05.3.62-.03.88-.34.39-.77.44-.88c.05-.12.05-.22-.05-.27z"/>
        </svg>
      </button>
    </div>
  );
};
