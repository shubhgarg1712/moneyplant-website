import React from 'react';
import { Landmark, Info } from 'lucide-react';
import sbiLogo from '../assets/bank-sbi.png';
import hdfcLogo from '../assets/bank-hdfc.png';
import axisLogo from '../assets/bank-axis.png';

interface BankItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  alt: string;
}

const banksList: BankItem[] = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    category: 'Public Sector Bank',
    logo: sbiLogo,
    alt: 'State Bank of India (SBI) Official Logo'
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    category: 'Private Sector Bank',
    logo: hdfcLogo,
    alt: 'HDFC Bank Official Logo'
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    category: 'Private Sector Bank',
    logo: axisLogo,
    alt: 'Axis Bank Official Logo'
  }
];

export const BankingNetwork: React.FC = () => {
  // Repeat the 3 banks 4 times per half (12 items per half, 24 items total)
  // Ensures a continuous, seamless loop across all viewport widths with zero gaps
  const singleCycle = [...banksList, ...banksList, ...banksList, ...banksList];
  const marqueeItems = [...singleCycle, ...singleCycle];

  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold mb-3">
            <Landmark className="w-3.5 h-3.5" />
            <span>Lending Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Banking & Lending Network
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Financing options may be available through participating banks and financial institutions, subject to applicable eligibility criteria and lender terms.
          </p>
        </div>

      </div>

      {/* Marquee Container with subtle gradient edge fades */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50/90 via-slate-50/40 to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50/90 via-slate-50/40 to-transparent z-10 pointer-events-none" />

        {/* Continuous Looping Marquee Track */}
        <div className="animate-marquee-track flex gap-4 sm:gap-6 px-4">
          {marqueeItems.map((bank, index) => (
            <div
              key={`${bank.id}-${index}`}
              className="bg-white rounded-2xl p-4 sm:px-6 sm:py-4 border border-slate-200/90 shadow-soft hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center min-w-[220px] sm:min-w-[260px] h-32 sm:h-36 select-none group shrink-0"
            >
              {/* Logo Container: Centered with consistent visual height, object-contain preserves original aspect ratio */}
              <div className="w-full h-16 sm:h-20 flex items-center justify-center overflow-hidden">
                <img
                  src={bank.logo}
                  alt={bank.alt}
                  className="max-h-full max-w-[85%] object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Bank Title & Classification */}
              <div className="mt-2 text-center">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-forest transition-colors truncate">
                  {bank.name}
                </h4>
                <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5 truncate">
                  {bank.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notice / Regulatory Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-xs text-slate-500 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Advisory Framework:</strong> MoneyPlant acts as an independent financial advisor assisting clients in comparing options and preparing institutional credit files. Mention of institutional lenders indicates the wider scheduled banking landscape in India; terms, rates, and sanction decisions remain solely at the discretion of respective lending institutions.
          </p>
        </div>
      </div>
    </section>
  );
};
