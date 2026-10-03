import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { banksList, BankItem, getAvailableRates } from './BankingNetwork';

export interface BottomBankMarqueeProps {
  isVisible?: boolean;
  onSelectBank?: (bank: BankItem) => void;
}

export const BottomBankMarquee: React.FC<BottomBankMarqueeProps> = ({ 
  isVisible = true,
  onSelectBank
}) => {
  // Duplicate the complete 12-bank list once for a 100% seamless, uninterrupted infinite CSS marquee loop
  const marqueeItems = [...banksList, ...banksList];

  const [activeBank, setActiveBank] = useState<BankItem | null>(null);
  const [activePillCenter, setActivePillCenter] = useState<number>(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const startCloseTimer = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveBank(null);
    }, 220);
  };

  const handlePillMouseEnter = (bank: BankItem, e: React.MouseEvent<HTMLButtonElement>) => {
    clearCloseTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    setActivePillCenter(rect.left + rect.width / 2);
    setActiveBank(bank);
  };

  const handlePillMouseLeave = () => {
    startCloseTimer();
  };

  const handlePanelMouseEnter = () => {
    clearCloseTimer();
  };

  const handlePanelMouseLeave = () => {
    startCloseTimer();
  };

  const handlePillFocus = (bank: BankItem, e: React.FocusEvent<HTMLButtonElement>) => {
    clearCloseTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    setActivePillCenter(rect.left + rect.width / 2);
    setActiveBank(bank);
  };

  const handlePillClick = (bank: BankItem, e: React.MouseEvent<HTMLButtonElement>) => {
    clearCloseTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    setActivePillCenter(rect.left + rect.width / 2);
    if (activeBank?.id === bank.id) {
      // Second tap on the same active pill opens the full modal
      onSelectBank?.(bank);
      setActiveBank(null);
    } else {
      // First tap shows the quick rate preview
      setActiveBank(bank);
    }
  };

  // Close preview on escape key, outside clicks, or page scrolls
  useEffect(() => {
    if (!activeBank) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveBank(null);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveBank(null);
      }
    };

    const handleScroll = () => {
      // Gracefully dismiss on mobile page scroll so reading is never obstructed
      setActiveBank(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeBank]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  // Compute responsive horizontal position for the floating rate panel
  const panelWidth = typeof window !== 'undefined' ? Math.min(310, window.innerWidth - 24) : 310;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const panelLeft = Math.max(12, Math.min(windowWidth - panelWidth - 12, activePillCenter - panelWidth / 2));
  const arrowLeft = Math.max(20, Math.min(panelWidth - 20, activePillCenter - panelLeft));

  const availableRates = activeBank ? getAvailableRates(activeBank) : [];

  return (
    <aside 
      ref={containerRef}
      aria-label="Partner banks continuous marquee"
      aria-hidden={!isVisible}
      className={`fixed bottom-0 left-0 right-0 z-30 select-none transition-all duration-500 ease-out motion-reduce:transition-none pointer-events-none ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[110%]'
      }`}
    >
      {/* 1. Floating Hover Rate Preview (Positioned ABOVE the marquee bar) */}
      {activeBank && (
        <div
          ref={panelRef}
          role="region"
          aria-label={`${activeBank.name} quick rate preview`}
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handlePanelMouseLeave}
          className="pointer-events-auto absolute bottom-[54px] sm:bottom-[60px] z-40 bg-white/98 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-bottom-2 duration-200 transition-all select-none"
          style={{
            left: `${panelLeft}px`,
            width: `${panelWidth}px`,
          }}
        >
          {/* Invisible hit-test bridge connecting the preview to the marquee below */}
          <div className="absolute -bottom-3 left-0 right-0 h-3" />

          {/* Pointer notch pointing down to the hovered pill */}
          <div
            className="absolute -bottom-1.5 w-3 h-3 bg-white border-b border-r border-slate-200/90 rotate-45 transform -translate-x-1/2 pointer-events-none"
            style={{ left: `${arrowLeft}px` }}
          />

          {/* Header: Bank Logo + Name + Category Badge */}
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <div className="h-6 w-12 flex items-center justify-center shrink-0 overflow-hidden bg-slate-50 rounded border border-slate-200/60 p-0.5">
              <img
                src={activeBank.logo}
                alt={activeBank.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {activeBank.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200/60 leading-tight">
                  {activeBank.category}
                </span>
              </div>
            </div>
          </div>

          {/* Available Rates List (Only available products shown) */}
          <div className="py-2 space-y-1">
            {availableRates.map((product) => (
              <div
                key={product.key}
                className="flex items-center justify-between text-xs py-0.5"
              >
                <span className="text-slate-600 font-medium truncate pr-2">
                  {product.label}
                </span>
                <span className="font-extrabold text-brand-forest shrink-0">
                  {product.value}{' '}
                  <span className="text-[10px] font-normal text-slate-400">p.a.</span>
                </span>
              </div>
            ))}
          </div>

          {/* Action: View Full Details */}
          <button
            type="button"
            onClick={() => {
              onSelectBank?.(activeBank);
              setActiveBank(null);
            }}
            className="w-full mt-1.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-forest hover:text-emerald-700 transition-colors group/btn cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/40 rounded px-1"
          >
            <span>View Full Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 text-brand-forest" />
          </button>
        </div>
      )}

      {/* 2. Marquee Bar Strip */}
      <div className="pointer-events-auto relative h-[48px] sm:h-[54px] bg-white/98 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06),0_-1px_3px_rgba(0,0,0,0.03)] flex items-center overflow-hidden">
        {/* Subtle floating ambient top shadow/gradient transition */}
        <div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-t from-slate-900/[0.03] to-transparent pointer-events-none" />

        {/* Subtle edge fades for smooth entry/exit */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Continuously moving horizontal marquee */}
        <div 
          className="animate-bottom-marquee flex items-center gap-3 sm:gap-4 px-2"
          style={activeBank ? { animationPlayState: 'paused' } : undefined}
        >
          {marqueeItems.map((bank, index) => {
            const isHovered = activeBank?.id === bank.id;
            return (
              <button
                type="button"
                key={`bottom-${bank.id}-${index}`}
                onMouseEnter={(e) => handlePillMouseEnter(bank, e)}
                onMouseLeave={handlePillMouseLeave}
                onFocus={(e) => handlePillFocus(bank, e)}
                onClick={(e) => handlePillClick(bank, e)}
                className={`flex items-center gap-2 sm:gap-2.5 px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-200 shrink-0 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/40 text-left ${
                  isHovered
                    ? 'bg-emerald-50 border-emerald-300 shadow-sm scale-105'
                    : 'bg-slate-50/90 hover:bg-emerald-50/60 border-slate-200/70 hover:border-emerald-200'
                }`}
                aria-label={`View ${bank.name} rates`}
                aria-expanded={isHovered}
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
                <span className={`text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                  isHovered ? 'text-brand-forest font-bold' : 'text-slate-800 group-hover:text-brand-forest'
                }`}>
                  {bank.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
