import React from 'react';
import { banksList } from './BankingNetwork';

export interface BottomBankMarqueeProps {
  isVisible?: boolean;
}

export const BottomBankMarquee: React.FC<BottomBankMarqueeProps> = ({ isVisible = true }) => {
  // Duplicate the 11-bank list once for a 100% seamless, uninterrupted infinite CSS marquee loop
  const marqueeItems = [...banksList, ...banksList];

  return (
    <aside 
      aria-label="Partner banks continuous marquee"
      aria-hidden={!isVisible}
      className={`fixed bottom-0 left-0 right-0 z-30 h-[48px] sm:h-[54px] bg-white/98 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06),0_-1px_3px_rgba(0,0,0,0.03)] flex items-center overflow-hidden select-none transition-all duration-500 ease-out motion-reduce:transition-none ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-[110%] pointer-events-none'
      }`}
    >
      {/* Subtle floating ambient top shadow/gradient transition */}
      <div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-t from-slate-900/[0.03] to-transparent pointer-events-none" />

      {/* Subtle edge fades for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      {/* Continuously moving horizontal marquee */}
      <div className="animate-bottom-marquee flex items-center gap-3 sm:gap-4 px-2">
        {marqueeItems.map((bank, index) => (
          <div
            key={`bottom-${bank.id}-${index}`}
            className="flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:py-1.5 bg-slate-50/90 hover:bg-emerald-50/60 rounded-full border border-slate-200/70 hover:border-emerald-200 transition-colors shrink-0 group"
          >
            {/* Small Bank Logo with original aspect ratio preserved */}
            <div className="h-5 sm:h-6 w-14 sm:w-16 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={bank.logo}
                alt={bank.alt}
                className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                loading="eager"
              />
            </div>
            
            {/* Bank Name */}
            <span className="text-[11px] sm:text-xs font-semibold text-slate-800 group-hover:text-brand-forest transition-colors whitespace-nowrap">
              {bank.name}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};
