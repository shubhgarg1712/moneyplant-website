import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why MoneyPlant', href: '#why-us' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' 
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Tagline - Strictly preserves original logo proportions and design */}
          <a href="#home" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-lg">
            <img 
              src="/assets/moneyplant-logo.png" 
              alt="MoneyPlant - We speak financial fluently" 
              className="h-10 sm:h-12 w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              onError={(e) => {
                // If png is not yet placed, fall back to the vector asset
                const target = e.currentTarget;
                if (!target.src.endsWith('moneyplant-logo.svg')) {
                  target.src = '/assets/moneyplant-logo.svg';
                }
              }}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-primary rounded-lg transition-colors hover:bg-slate-50"
              >
                {link.name}
              </a>
            ))}
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
              className="p-2 rounded-lg text-slate-600 hover:text-brand-dark hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-emerald-50 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100">
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
