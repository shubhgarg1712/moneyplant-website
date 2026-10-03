import React, { useState } from 'react';
import { Landmark, Info, ArrowUpRight } from 'lucide-react';
import sbiLogo from '../assets/bank-sbi.png';
import hdfcLogo from '../assets/bank-hdfc.png';
import axisLogo from '../assets/bank-axis.png';
import unionLogo from '../assets/bank-union.png';
import boiLogo from '../assets/bank-boi.png';
import indianLogo from '../assets/bank-indian.jpg';
import centralLogo from '../assets/bank-central.webp';
import pnbLogo from '../assets/bank-pnb.jpg';
import bobLogo from '../assets/bank-bob.png';
import canaraLogo from '../assets/bank-canara.jpg';
import iciciLogo from '../assets/bank-icici.jpg';
import ucoLogo from '../assets/bank-uco.png';
import { BankRateModal } from './BankRateModal';

export interface BankRates {
  homeLoan: string;
  lap: string;
  workingCapital: string;
  businessLoan: string;
  personalLoan: string;
  professionalLoan: string;
  carLoan: string;
  usedCarLoan: string;
}

export interface BankItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  alt: string;
  rates: BankRates;
}

export interface RateProductMeta {
  key: keyof BankRates;
  label: string;
  shortDesc: string;
}

export const RATE_PRODUCTS: RateProductMeta[] = [
  { key: 'homeLoan', label: 'Home Loan', shortDesc: 'Purchase, construction & transfer' },
  { key: 'lap', label: 'LAP (Loan Against Property)', shortDesc: 'Secured residential / commercial loan' },
  { key: 'workingCapital', label: 'Working Capital', shortDesc: 'CC / OD limits & cash credit' },
  { key: 'businessLoan', label: 'Business Loan', shortDesc: 'Unsecured enterprise finance' },
  { key: 'personalLoan', label: 'Personal Loan', shortDesc: 'Flexible personal requirements' },
  { key: 'professionalLoan', label: 'Professional Loan', shortDesc: 'Doctors, CAs & professionals' },
  { key: 'carLoan', label: 'Car Loan', shortDesc: 'New passenger vehicles' },
  { key: 'usedCarLoan', label: 'Used Car Loan', shortDesc: 'Pre-owned vehicle financing' },
];

// Exactly 12 unique banks in the requested sequential order:
// 1. State Bank of India (SBI)
// 2. HDFC Bank
// 3. Axis Bank
// 4. Union Bank of India
// 5. Bank of India
// 6. Indian Bank
// 7. Central Bank of India
// 8. Punjab National Bank (PNB)
// 9. Bank of Baroda
// 10. Canara Bank
// 11. ICICI Bank
// 12. UCO Bank
export const banksList: BankItem[] = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    category: 'Public Sector Bank',
    logo: sbiLogo,
    alt: 'State Bank of India (SBI) Official Logo',
    rates: {
      homeLoan: '7.25%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    category: 'Private Sector Bank',
    logo: hdfcLogo,
    alt: 'HDFC Bank Official Logo',
    rates: {
      homeLoan: '7.15%',
      lap: '8.25%',
      workingCapital: '7.50%',
      businessLoan: '15.00%',
      personalLoan: '12.00%',
      professionalLoan: '9.99%',
      carLoan: '7.80%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    category: 'Private Sector Bank',
    logo: axisLogo,
    alt: 'Axis Bank Official Logo',
    rates: {
      homeLoan: '7.15%',
      lap: '8.25%',
      workingCapital: '7.50%',
      businessLoan: '15.00%',
      personalLoan: '12.00%',
      professionalLoan: '9.99%',
      carLoan: '7.80%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'union',
    name: 'Union Bank of India',
    category: 'Public Sector Bank',
    logo: unionLogo,
    alt: 'Union Bank of India Official Logo',
    rates: {
      homeLoan: '7.10%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'boi',
    name: 'Bank of India',
    category: 'Public Sector Bank',
    logo: boiLogo,
    alt: 'Bank of India Official Logo',
    rates: {
      homeLoan: '7.25%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'indian',
    name: 'Indian Bank',
    category: 'Public Sector Bank',
    logo: indianLogo,
    alt: 'Indian Bank Official Logo',
    rates: {
      homeLoan: '7.10%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'central',
    name: 'Central Bank of India',
    category: 'Public Sector Bank',
    logo: centralLogo,
    alt: 'Central Bank of India Official Logo',
    rates: {
      homeLoan: '7.00%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank (PNB)',
    category: 'Public Sector Bank',
    logo: pnbLogo,
    alt: 'Punjab National Bank (PNB) Official Logo',
    rates: {
      homeLoan: '7.25%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    category: 'Public Sector Bank',
    logo: bobLogo,
    alt: 'Bank of Baroda Official Logo',
    rates: {
      homeLoan: '7.10%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'canara',
    name: 'Canara Bank',
    category: 'Public Sector Bank',
    logo: canaraLogo,
    alt: 'Canara Bank Official Logo',
    rates: {
      homeLoan: '7.25%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    category: 'Private Sector Bank',
    logo: iciciLogo,
    alt: 'ICICI Bank Official Logo',
    rates: {
      homeLoan: '7.15%',
      lap: '8.25%',
      workingCapital: '7.50%',
      businessLoan: '15.00%',
      personalLoan: '12.00%',
      professionalLoan: '9.99%',
      carLoan: '7.80%',
      usedCarLoan: '14.00%',
    },
  },
  {
    id: 'uco',
    name: 'UCO Bank',
    category: 'Public Sector Bank',
    logo: ucoLogo,
    alt: 'UCO Bank Official Logo',
    rates: {
      homeLoan: '7.10%',
      lap: 'Not Available',
      workingCapital: '7.50%',
      businessLoan: 'Not Available',
      personalLoan: 'Not Available',
      professionalLoan: 'Not Available',
      carLoan: '7.50%',
      usedCarLoan: '14.00%',
    },
  },
];

export interface BankingNetworkProps {
  onSelectBank?: (bank: BankItem) => void;
}

export const BankingNetwork: React.FC<BankingNetworkProps> = ({ onSelectBank }) => {
  const [internalSelectedBank, setInternalSelectedBank] = useState<BankItem | null>(null);

  // Duplicate the complete 12-bank list once for a 100% seamless, uninterrupted infinite CSS marquee loop
  const marqueeItems = [...banksList, ...banksList];

  const handleBankClick = (bank: BankItem) => {
    if (onSelectBank) {
      onSelectBank(bank);
    } else {
      setInternalSelectedBank(bank);
    }
  };

  return (
    <>
      <section id="banking-network" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-14">
          
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
              Financing options may be available through participating banks and financial institutions, subject to applicable eligibility criteria and lender terms. Click any institution to view indicative ROI schedules.
            </p>
          </div>

        </div>

        {/* Marquee Container with subtle gradient edge fades */}
        <div className="relative w-full overflow-hidden py-6 sm:py-8 my-2">
          {/* Left Gradient Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50/90 via-slate-50/40 to-transparent z-10 pointer-events-none" />
          
          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50/90 via-slate-50/40 to-transparent z-10 pointer-events-none" />

          {/* Continuous Looping Marquee Track showing all 12 banks */}
          <div className="animate-marquee-track flex gap-4 sm:gap-6 px-4">
            {marqueeItems.map((bank, index) => (
              <button
                type="button"
                key={`${bank.id}-${index}`}
                onClick={() => handleBankClick(bank)}
                className="bg-white rounded-2xl p-4 sm:px-6 sm:py-4 border border-slate-200/90 shadow-soft hover:shadow-lg hover:border-emerald-300 transition-all duration-200 flex flex-col items-center justify-center min-w-[220px] sm:min-w-[260px] h-32 sm:h-36 select-none group shrink-0 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                aria-label={`View ${bank.name} ROI rates`}
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
                <div className="mt-2 text-center w-full px-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-forest transition-colors truncate">
                    {bank.name}
                  </h4>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase truncate">
                      {bank.category}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                      • Rates <ArrowUpRight className="w-2.5 h-2.5 inline ml-0.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notice / Regulatory Callout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-14">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-soft text-xs text-slate-500 flex items-start gap-3">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Advisory Framework:</strong> MoneyPlant acts as an independent financial advisor assisting clients in comparing options and preparing institutional credit files. Mention of institutional lenders indicates the wider scheduled banking landscape in India; terms, rates, and sanction decisions remain solely at the discretion of respective lending institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Modal fallback if not managed by parent */}
      {!onSelectBank && internalSelectedBank && (
        <BankRateModal
          bank={internalSelectedBank}
          onClose={() => setInternalSelectedBank(null)}
        />
      )}
    </>
  );
};
