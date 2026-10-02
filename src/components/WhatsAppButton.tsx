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

// Sharp, high-resolution official vector WhatsApp icon (Simple Icons standard path)
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.101-.477-.15-.678.15-.2.302-.779.98-1.028 1.206-.25.226-.452.251-.753.1-.301-.15-1.272-.469-2.423-1.496-.897-.8-1.503-1.789-1.679-2.09-.176-.302-.019-.465.132-.615.136-.135.301-.352.451-.528.151-.176.201-.302.302-.503.1-.201.05-.377-.025-.528-.075-.151-.678-1.633-.929-2.236-.245-.588-.493-.508-.678-.518-.176-.01-.377-.01-.578-.01-.201 0-.527.076-.803.377-.276.302-1.054 1.03-1.054 2.512 0 1.482 1.079 2.914 1.23 3.115.15.201 2.124 3.243 5.145 4.545.719.31 1.28.495 1.718.634.723.23 1.381.197 1.901.12.579-.087 1.78-.728 2.032-1.432.252-.704.252-1.307.176-1.432-.076-.126-.276-.202-.577-.352zm-5.467 6.43c-1.921 0-3.805-.516-5.454-1.493l-.391-.233-4.053 1.063 1.082-3.952-.256-.407a10.97 10.97 0 0 1-1.684-5.836c0-6.079 4.945-11.024 11.026-11.024 2.946 0 5.716 1.148 7.798 3.231 2.083 2.083 3.23 4.853 3.23 7.8 0 6.08-4.946 11.024-11.027 11.024zm8.683-19.708A12.28 12.28 0 0 0 12.005 0C5.385 0 .002 5.383 0 12.004c0 2.115.553 4.179 1.602 6.001L0 24l6.143-1.611A12.25 12.25 0 0 0 12.005 24c6.621 0 12.004-5.383 12.004-12.004 0-3.21-1.249-6.227-3.52-8.502z" />
  </svg>
);

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
      {/* WhatsApp "Chat with us" Popup */}
      {isOpen && (
        <div 
          role="dialog"
          aria-labelledby="whatsapp-chat-title"
          className="pointer-events-auto mb-3 sm:mb-4 w-[360px] max-w-[calc(100vw-32px)] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden transform transition-all duration-200"
        >
          {/* Header */}
          <div className="bg-[#1E3F0A] text-white px-5 py-4 border-b border-[#2d5c12] flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3 min-w-0">
              {/* MoneyPlant Logo */}
              <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-white/20">
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
                  <h3 id="whatsapp-chat-title" className="font-bold text-base text-white leading-tight truncate">
                    Chat with us
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" title="Online" />
                </div>
                <div className="text-xs text-white/85 font-medium truncate mt-0.5">
                  MoneyPlant Finserve
                </div>
              </div>
            </div>

            {/* Close Button "×" */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Message Bubble Area */}
          <div className="p-4 sm:p-5 bg-[#efeae2]/45 min-h-[140px] flex flex-col justify-center">
            <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-slate-200/80 max-w-[92%] relative">
              {/* Sender Name */}
              <p className="text-[11px] font-bold text-[#1E3F0A] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <span>MONEYPLANT</span>
                <span className="text-[10px] font-normal text-slate-400">· Official</span>
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
          <div className="p-4 sm:p-5 bg-white border-t border-slate-100">
            <a
              href={WHATSAPP_DIRECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>Start Chat</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Circular WhatsApp Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat on WhatsApp with MoneyPlant"}
        aria-expanded={isOpen}
        className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Authentic White WhatsApp Icon */}
        <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white transition-transform group-hover:rotate-6" />
      </button>
    </div>
  );
};
