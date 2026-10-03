import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useRates, OFFICIAL_RBI_SOURCE_URL } from '../services/rates';

interface RatesDropdownProps {
  mode?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

export const RatesDropdown: React.FC<RatesDropdownProps> = ({ mode = 'desktop', onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, status } = useRates();

  // Handle outside click & Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Desktop hover with gentle exit delay to prevent accidental closing
  const handleMouseEnter = () => {
    if (mode === 'desktop') {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
        leaveTimerRef.current = null;
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (mode === 'desktop') {
      leaveTimerRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 180);
    }
  };

  const formatLastUpdated = (dateStr: string, asOn?: string | null): string => {
    if (asOn) return `as on ${asOn}`;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return 'Official RBI Portal';
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Official RBI Portal';
    }
  };

  // MOBILE ACCORDION / DRAWER MODE
  if (mode === 'mobile') {
    return (
      <div ref={containerRef} className="py-1">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-brand-forest hover:bg-emerald-50/70 transition-colors"
        >
          <span>RBI Policy Rates</span>
          <div className="flex items-center gap-2 shrink-0">
            {data?.repoRate && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-brand-forest">
                Repo {data.repoRate}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-brand-forest' : 'text-slate-400'
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="mx-2 mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5 animate-in fade-in slide-in-from-top-1">
            {/* Repo Rate */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  RBI Policy Repo Rate
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live RBI benchmark" />
              </div>
              <div className="mt-1">
                {status === 'loading' ? (
                  <span className="text-lg font-bold text-slate-400 animate-pulse">Loading…</span>
                ) : data?.repoRate ? (
                  <span className="text-2xl font-extrabold text-brand-forest tracking-tight">
                    {data.repoRate}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-500">
                    Rates temporarily unavailable
                  </span>
                )}
              </div>
            </div>

            {/* MCLR (Overnight) */}
            <div className="pt-2.5 border-t border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                MCLR (Overnight)
              </span>
              <div className="mt-1">
                {status === 'loading' ? (
                  <span className="text-lg font-bold text-slate-400 animate-pulse">Loading…</span>
                ) : data?.mclrOvernight ? (
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {data.mclrOvernight}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-slate-500">
                    Rates temporarily unavailable
                  </span>
                )}
              </div>
            </div>

            {/* Last updated & Source */}
            <div className="text-xs text-slate-500 space-y-0.5 pt-1 border-t border-slate-200/70">
              <p className="text-[11px] text-slate-400">
                Last updated: {formatLastUpdated(data?.lastUpdated || '', data?.asOn)}
                {data?.stale && <span className="ml-1 text-amber-600">(Cached)</span>}
              </p>
              <p className="font-medium text-slate-600">
                Source: {data?.source || 'Reserve Bank of India'}
              </p>
            </div>

            {/* View RBI Source link */}
            <div className="pt-2 border-t border-slate-200/70">
              <a
                href={data?.sourceUrl || OFFICIAL_RBI_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-forest hover:text-brand-dark transition-colors"
              >
                <span>View RBI Source</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // DESKTOP NAVIGATION & HOVER DROPDOWN
  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onFocus={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`px-2 md:px-2 lg:px-3 py-2 text-xs md:text-[13px] lg:text-sm font-medium rounded-lg transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 whitespace-nowrap ${
          isOpen
            ? 'text-brand-forest bg-slate-50'
            : 'text-slate-700 hover:text-brand-forest hover:bg-slate-50'
        }`}
      >
        <span>RBI Policy Rates</span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-forest' : 'text-slate-400'
          }`}
        />
      </button>

      {/* Premium Compact Dropdown */}
      <div
        role="region"
        aria-label="RBI Policy Rates Information"
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-4 sm:p-5 z-50 transform transition-all duration-200 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 visible pointer-events-auto'
            : 'opacity-0 translate-y-1 invisible pointer-events-none'
        }`}
      >
        {/* Subtle Arrow indicator */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200/90 rotate-45" />

        <div className="relative z-10 space-y-3.5">
          {/* Section 1: RBI Policy Repo Rate */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                RBI Policy Repo Rate
              </span>
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                title="Live RBI Official Data"
              />
            </div>
            <div className="mt-1">
              {status === 'loading' ? (
                <div className="py-0.5">
                  <span className="text-xl font-bold text-slate-400 animate-pulse">
                    Loading…
                  </span>
                </div>
              ) : data?.repoRate ? (
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-forest tracking-tight">
                  {data.repoRate}
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  Rates temporarily unavailable
                </span>
              )}
            </div>
          </div>

          {/* Section 2: MCLR (Overnight) */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              MCLR (Overnight)
            </span>
            <div className="mt-1">
              {status === 'loading' ? (
                <div className="py-0.5">
                  <span className="text-lg font-bold text-slate-400 animate-pulse">
                    Loading…
                  </span>
                </div>
              ) : data?.mclrOvernight ? (
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {data.mclrOvernight}
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-500">
                  Rates temporarily unavailable
                </span>
              )}
            </div>
          </div>

          {/* Section 3: Last updated & Source */}
          <div className="space-y-0.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
            <p className="text-[11px] text-slate-400">
              Last updated: {formatLastUpdated(data?.lastUpdated || '', data?.asOn)}
              {data?.stale && <span className="ml-1 text-amber-600">(Cached)</span>}
            </p>
            <p className="font-medium text-slate-600">
              Source: {data?.source || 'Reserve Bank of India'}
            </p>
          </div>

          {/* Section 4: Official RBI Link */}
          <div className="pt-2 border-t border-slate-100">
            <a
              href={data?.sourceUrl || OFFICIAL_RBI_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-forest hover:text-brand-dark transition-colors group/link"
            >
              <span>View RBI Source</span>
              <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
