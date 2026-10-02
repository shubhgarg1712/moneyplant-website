import React from 'react';
import { Linkedin, Instagram, Facebook, Youtube, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Prominent Logo & Brand Tagline */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0">
                <img 
                  src="/assets/moneyplant-logo-symbol.png" 
                  alt="MoneyPlant Official Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/assets/moneyplant-logo.png';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white leading-tight">
                  MONEY<span className="text-brand-fresh">PLANT</span>
                </span>
                <span className="text-xs text-brand-fresh font-medium tracking-wide">
                  “We speak financial fluently”
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Providing objective, transparent, and structured guidance for personal and commercial financial requirements across India.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="#linkedin" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#instagram" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#facebook" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#youtube" 
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-brand-fresh transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-brand-fresh transition-colors">Our Services</a></li>
              <li><a href="#resources" className="hover:text-brand-fresh transition-colors">Resources</a></li>
              <li><a href="#contact" className="hover:text-brand-fresh transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal Links & Portal */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#privacy" className="hover:text-brand-fresh transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-brand-fresh transition-colors">Terms & Conditions</a></li>
              <li><a href="#disclaimer" className="hover:text-brand-fresh transition-colors">Disclaimer</a></li>
            </ul>
            <div className="pt-3 text-xs text-slate-400">
              <p>Official Website: <a href="https://moneyplant.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:underline">moneyplant.in</a></p>
            </div>
          </div>

        </div>

        {/* VERBATIM REGULATORY / COMPLIANCE DISCLAIMER */}
        <div className="pt-8 border-t border-white/10 space-y-3">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-brand-fresh shrink-0 mt-0.5" />
            <p>
              Information provided on this website is for general informational purposes only and should not be considered financial, investment, legal or tax advice. Financial products and services are subject to applicable terms, conditions, eligibility requirements and risks. Please evaluate products carefully and seek appropriate professional advice where required.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 MoneyPlant. All Rights Reserved.</p>
          <p className="text-slate-400">“We speak financial fluently”</p>
        </div>

      </div>
    </footer>
  );
};
