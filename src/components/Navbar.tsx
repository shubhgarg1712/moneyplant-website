import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { moneyPlantLogoSymbol, moneyPlantLogoFull } from '../assets/logo';
import { useRates, OFFICIAL_RBI_SOURCE_URL } from '../services/repoRateService';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 10;
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRatesOpen, setIsRatesOpen] = useState(false);
  const [mobileRatesOpen, setMobileRatesOpen] = useState(false);
  const ratesRef = useRef<HTMLDivElement>(null);

  const { data: ratesData, status: ratesStatus } = useRates();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ratesRef.current && !ratesRef.current.contains(event.target as Node)) {
        setIsRatesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsRatesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Why MoneyPlant', href: '#why-us' },
    { name: 'Resources', href: '#resources' },
    { name: 'Rates', href: '#rates', isRates: true },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white py-3.5 border-b border-slate-100 transition-[background-color,box-shadow] duration-200 ease-out ${
        isScrolled ? 'shadow-sm' : 'shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo on the left with exact official logo & brand typography */}
          <a href="#home" className="flex items-center gap-3.5 group focus:outline-none rounded-lg">
            <div className="w-11 h-11 sm:w-12 sm:h-12 aspect-square flex items-center justify-center shrink-0">
              <img 
                src={moneyPlantLogoSymbol} 
                alt="MoneyPlant Official Logo" 
                width={48}
                height={48}
                className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = moneyPlantLogoFull;
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-[23px] tracking-tight leading-none flex items-center">
                <span className="text-[#1E3F0A]">MONEY</span>
                <span className="text-[#527E24]">PLANT</span>
              </span>
              <span className="text-[11px] sm:text-xs text-slate-800 font-semibold tracking-normal mt-1">
                “We speak financial fluently”
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              if (link.isRates) {
                return (
                  <div
                    key={link.name}
                    ref={ratesRef}
                    className="relative"
                    onMouseEnter={() => setIsRatesOpen(true)}
                    onMouseLeave={() => setIsRatesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsRatesOpen((prev) => !prev)}
                      onFocus={() => setIsRatesOpen(true)}
                      aria-expanded={isRatesOpen}
                      aria-haspopup="dialog"
                      className={`px-2.5 lg:px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 ${
                        isRatesOpen
                          ? 'text-brand-forest bg-slate-50'
                          : 'text-slate-700 hover:text-brand-forest hover:bg-slate-50'
                      }`}
                    >
                      <span>Rates</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isRatesOpen ? 'rotate-180 text-brand-forest' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Premium Compact Dropdown anchored directly underneath Rates */}
                    <div
                      role="region"
                      aria-label="RBI Policy Rates Information"
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 p-4 sm:p-5 z-50 transform transition-all duration-200 ease-out ${
                        isRatesOpen
                          ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                          : 'opacity-0 translate-y-1 invisible pointer-events-none'
                      }`}
                    >
                      {/* Subtle Arrow */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-200/90 rotate-45" />

                      <div className="relative z-10 space-y-3.5">
                        {/* 1. Policy Repo Rate */}
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              RBI Policy Repo Rate
                            </span>
                            <span
                              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                              title="Official RBI Live Data"
                            />
                          </div>
                          <div className="mt-1">
                            {ratesStatus === 'loading' ? (
                              <div className="py-0.5">
                                <span className="text-xl font-bold text-slate-400 animate-pulse">
                                  Loading…
                                </span>
                              </div>
                            ) : ratesData?.repoRate ? (
                              <span className="text-2xl sm:text-3xl font-extrabold text-brand-forest tracking-tight">
                                {ratesData.repoRate}
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-slate-500">
                                Currently unavailable
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 2. MCLR (Overnight) */}
                        <div className="pt-3 border-t border-slate-100">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                            MCLR (Overnight)
                          </span>
                          <div className="mt-1">
                            {ratesStatus === 'loading' ? (
                              <div className="py-0.5">
                                <span className="text-xl font-bold text-slate-400 animate-pulse">
                                  Loading…
                                </span>
                              </div>
                            ) : ratesData?.mclrOvernight ? (
                              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                {ratesData.mclrOvernight}
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-slate-500">
                                Currently unavailable
                              </span>
                            )}
                          </div>
                        </div>

                        {/* 3. Last Updated & Source */}
                        <div className="space-y-0.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                          <p className="text-[11px] text-slate-400">
                            Last updated:{' '}
                            {ratesData?.asOn
                              ? `as on ${ratesData.asOn}`
                              : ratesData?.updatedAt
                              ? new Date(ratesData.updatedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : 'Official RBI Portal'}
                          </p>
                          <p className="font-medium text-slate-600">
                            Source: Reserve Bank of India
                          </p>
                        </div>

                        {/* 4. Link to official RBI source */}
                        <div className="pt-2 border-t border-slate-100">
                          <a
                            href={ratesData?.sourceUrl || OFFICIAL_RBI_SOURCE_URL}
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
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-2.5 lg:px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-forest rounded-lg transition-colors hover:bg-slate-50"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop "Get in Touch" CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-brand-forest text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 text-brand-fresh" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-600 hover:text-brand-dark hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-emerald"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2">
          {/* Mobile brand header inside drawer */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 px-2">
            <div className="w-10 h-10 aspect-square flex items-center justify-center shrink-0">
              <img 
                src={moneyPlantLogoSymbol} 
                alt="MoneyPlant" 
                width={40}
                height={40}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = moneyPlantLogoFull;
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight leading-none flex items-center">
                <span className="text-[#1E3F0A]">MONEY</span>
                <span className="text-[#527E24]">PLANT</span>
              </span>
              <span className="text-[10px] text-slate-800 font-semibold mt-1">
                “We speak financial fluently”
              </span>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              if (link.isRates) {
                return (
                  <div key={link.name} className="py-1">
                    <button
                      type="button"
                      onClick={() => setMobileRatesOpen((prev) => !prev)}
                      aria-expanded={mobileRatesOpen}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-brand-forest hover:bg-emerald-50/70 transition-colors"
                    >
                      <span>Rates</span>
                      <div className="flex items-center gap-2">
                        {ratesData?.repoRate && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-brand-forest">
                            {ratesData.repoRate}
                          </span>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            mobileRatesOpen ? 'rotate-180 text-brand-forest' : 'text-slate-400'
                          }`}
                        />
                      </div>
                    </button>

                    {mobileRatesOpen && (
                      <div className="mx-2 mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 animate-in fade-in slide-in-from-top-1">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              RBI Policy Repo Rate
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          </div>

                          <div className="mt-1">
                            {ratesStatus === 'loading' ? (
                              <span className="text-lg font-bold text-slate-400 animate-pulse">
                                Loading…
                              </span>
                            ) : ratesData?.repoRate ? (
                              <span className="text-2xl font-extrabold text-brand-forest">
                                {ratesData.repoRate}
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-slate-500">
                                Currently unavailable
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-slate-200/70">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                            MCLR (Overnight)
                          </span>
                          <div className="mt-1">
                            {ratesStatus === 'loading' ? (
                              <span className="text-lg font-bold text-slate-400 animate-pulse">
                                Loading…
                              </span>
                            ) : ratesData?.mclrOvernight ? (
                              <span className="text-xl font-extrabold text-slate-900">
                                {ratesData.mclrOvernight}
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-slate-500">
                                Currently unavailable
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 space-y-0.5 pt-1 border-t border-slate-200/70">
                          <p className="text-[11px] text-slate-400">
                            Last updated:{' '}
                            {ratesData?.asOn
                              ? `as on ${ratesData.asOn}`
                              : ratesData?.updatedAt
                              ? new Date(ratesData.updatedAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })
                              : 'Official RBI Portal'}
                          </p>
                          <p className="font-medium text-slate-600">
                            Source: Reserve Bank of India
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-200/70">
                          <a
                            href={ratesData?.sourceUrl || OFFICIAL_RBI_SOURCE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-forest hover:text-brand-dark"
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

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-brand-forest hover:bg-emerald-50/70 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-brand-forest text-white px-5 py-3 rounded-xl text-base font-semibold hover:bg-brand-dark transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 text-brand-fresh" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

