import React from 'react';
import { Phone, Mail, MapPin, Globe, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-slate-300 pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row: 3 Clean Focused Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          
          {/* Column 1: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-brand-fresh transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-fresh transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-brand-fresh transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#resources" className="hover:text-brand-fresh transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-fresh transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2.5">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#privacy" className="hover:text-brand-fresh transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-brand-fresh transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-brand-fresh transition-colors">
                  Disclaimer
                </a>
              </li>
            </ul>
            <div className="pt-2 text-xs text-slate-400">
              <p>Official Portal: <a href="https://moneyplant.in" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:underline">moneyplant.in</a></p>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2.5">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-fresh shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Phone</span>
                  <span className="text-slate-200 font-medium">[ADD PHONE NUMBER]</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-fresh shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Email</span>
                  <a href="mailto:info.mpfinserve@gmail.com" className="text-slate-200 font-medium hover:text-brand-fresh transition-colors">
                    info.mpfinserve@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-fresh shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">Office Address</span>
                  <span className="text-slate-200 font-medium">[ADD OFFICE ADDRESS]</span>
                </div>
              </li>
            </ul>
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
          <p className="text-slate-400">moneyplant.in</p>
        </div>

      </div>
    </footer>
  );
};
