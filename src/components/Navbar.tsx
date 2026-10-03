import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { moneyPlantLogoSymbol, moneyPlantLogoFull } from '../assets/logo';
import { RatesDropdown } from './RatesDropdown';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > 10;
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Why MoneyPlant', href: '#why-us' },
    { name: 'Resources', href: '#resources' },
    { name: 'RBI Policy Rates', href: '#rates', isRates: true },
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
          <a href="#home" className="flex items-center gap-3.5 group focus:outline-none rounded-lg shrink-0">
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
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 xl:gap-2">
            {navLinks.map((link) => {
              if (link.isRates) {
                return <RatesDropdown key="rates-desktop" mode="desktop" />;
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-2 md:px-2 lg:px-3 py-2 text-xs md:text-[13px] lg:text-sm font-medium text-slate-700 hover:text-brand-forest rounded-lg transition-colors hover:bg-slate-50 whitespace-nowrap"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop "Get in Touch" CTA Button */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 lg:gap-2 bg-brand-forest text-white px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full text-xs md:text-[13px] lg:text-sm font-semibold hover:bg-brand-dark transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brand-fresh shrink-0" />
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
                  <RatesDropdown
                    key="rates-mobile"
                    mode="mobile"
                    onNavigate={() => setMobileMenuOpen(false)}
                  />
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
