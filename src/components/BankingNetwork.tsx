import React from 'react';
import { Landmark, Info, ShieldCheck } from 'lucide-react';

interface BankItem {
  id: string;
  name: string;
  category: string;
  renderLogo: () => React.ReactNode;
}

const banksList: BankItem[] = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    category: 'Public Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="State Bank of India Logo">
        <circle cx="50" cy="50" r="48" fill="#0082CA" />
        <circle cx="50" cy="42" r="16" fill="white" />
        <rect x="45" y="42" width="10" height="42" fill="#0082CA" />
      </svg>
    )
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    category: 'Private Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="HDFC Bank Logo">
        <rect width="100" height="100" rx="16" fill="#004C8F" />
        <rect x="18" y="18" width="64" height="64" fill="#ED232A" />
        <rect x="36" y="36" width="28" height="28" fill="#004C8F" />
        <rect x="45" y="18" width="10" height="64" fill="white" />
        <rect x="18" y="45" width="64" height="10" fill="white" />
      </svg>
    )
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    category: 'Private Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ICICI Bank Logo">
        <circle cx="50" cy="50" r="48" fill="#A82025" />
        <circle cx="50" cy="50" r="34" fill="#F58220" />
        <circle cx="50" cy="36" r="8" fill="white" />
        <path d="M45 48 H55 V74 H45 Z" fill="white" />
        <circle cx="68" cy="40" r="6" fill="#FBD8A8" />
      </svg>
    )
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    category: 'Private Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Axis Bank Logo">
        <rect width="100" height="100" rx="16" fill="#97144D" />
        <path d="M50 20 L80 80 H62 L50 56 L38 80 H20 Z" fill="white" />
        <polygon points="50,20 62,80 50,56" fill="#750036" />
      </svg>
    )
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    category: 'Private Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kotak Mahindra Bank Logo">
        <rect width="100" height="100" rx="16" fill="#ED1C24" />
        <path d="M30 38 C30 26 42 24 50 34 C58 24 70 26 70 38 C70 54 50 76 50 76 C50 76 30 54 30 38 Z" fill="white" />
        <circle cx="50" cy="44" r="8" fill="#003366" />
      </svg>
    )
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    category: 'Public Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Bank of Baroda Logo">
        <rect width="100" height="100" rx="16" fill="#F26522" />
        <circle cx="45" cy="50" r="24" fill="white" />
        <circle cx="45" cy="50" r="14" fill="#F26522" />
        <path d="M60 30 L80 20 M68 42 L88 38 M68 58 L88 62 M60 70 L80 80" stroke="white" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    category: 'Public Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Punjab National Bank Logo">
        <circle cx="50" cy="50" r="48" fill="#A20000" />
        <circle cx="50" cy="50" r="32" fill="#F9A01B" />
        <circle cx="50" cy="50" r="18" fill="white" />
        <circle cx="50" cy="50" r="8" fill="#A20000" />
      </svg>
    )
  },
  {
    id: 'indusind',
    name: 'IndusInd Bank',
    category: 'Private Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="IndusInd Bank Logo">
        <rect width="100" height="100" rx="16" fill="#981A1E" />
        <path d="M26 30 Q50 18 74 30 V56 Q50 82 26 56 Z" fill="white" />
        <path d="M38 48 C42 40 58 40 62 48 C60 58 50 64 50 64 C50 64 40 58 38 48 Z" fill="#981A1E" />
      </svg>
    )
  },
  {
    id: 'canara',
    name: 'Canara Bank',
    category: 'Public Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Canara Bank Logo">
        <rect width="100" height="100" rx="16" fill="#0072BC" />
        <polygon points="50,22 80,74 20,74" fill="#FFCC00" />
        <polygon points="50,42 70,74 30,74" fill="#0072BC" />
      </svg>
    )
  },
  {
    id: 'union',
    name: 'Union Bank of India',
    category: 'Public Sector Bank',
    renderLogo: () => (
      <svg className="w-10 h-10 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Union Bank of India Logo">
        <rect width="100" height="100" rx="16" fill="#005596" />
        <path d="M28 28 V56 C28 68 38 76 50 76 C62 76 72 68 72 56 V28 H58 V54 C58 58 54 62 50 62 C46 62 42 58 42 54 V28 Z" fill="#ED1C24" />
        <path d="M38 28 V46 C38 52 44 56 50 56 C56 56 62 52 62 46 V28 Z" fill="white" />
      </svg>
    )
  }
];

export const BankingNetwork: React.FC = () => {
  // Duplicate array once for a 100% seamless, uninterrupted CSS infinite marquee loop
  const marqueeItems = [...banksList, ...banksList];

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
              className="bg-white rounded-2xl p-4 sm:px-6 sm:py-4.5 border border-slate-200/90 shadow-soft hover:shadow-md transition-all duration-200 flex items-center gap-4 min-w-[240px] sm:min-w-[270px] select-none group"
            >
              <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                {bank.renderLogo()}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-forest transition-colors truncate">
                  {bank.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-medium tracking-wide uppercase mt-0.5 truncate">
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
