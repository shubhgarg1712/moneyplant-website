import React, { useState } from 'react';

// Configuration: Replace with actual MoneyPlant WhatsApp business number (e.g. 919876543210)
export const WHATSAPP_NUMBER = "91XXXXXXXXXX";

// Configurable pre-filled inquiry message
export const WHATSAPP_DEFAULT_MESSAGE = "Hello MoneyPlant, I would like to know more about your financial services.";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Clean WhatsApp URL formatting (no +, spaces, hyphens)
  const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  const whatsappUrl = `https://wa.me/${cleanNumber || '[WHATSAPP_NUMBER]'}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center">
      {/* Desktop Hover Tooltip */}
      <div
        className={`hidden md:block mr-3 px-3.5 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-sm pointer-events-none transition-all duration-200 transform whitespace-nowrap ${
          showTooltip 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span>Chat with us on WhatsApp</span>
        {/* Tooltip triangle */}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-slate-900/90 rotate-45"></div>
      </div>

      {/* Floating Circular WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MoneyPlant on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-13 h-13 sm:w-14 sm:h-14 w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
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
      </a>
    </div>
  );
};
