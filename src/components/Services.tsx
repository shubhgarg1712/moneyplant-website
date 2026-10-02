import React, { useState } from 'react';
import { 
  Globe2, 
  Building2, 
  Coins, 
  Building, 
  Briefcase, 
  Home, 
  Wallet, 
  Car, 
  ShieldCheck, 
  PieChart, 
  ArrowRight,
  Info
} from 'lucide-react';
import { ServiceModal } from './ServiceModal';
import { ServiceItem } from '../types';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const servicesList: ServiceItem[] = [
    {
      id: 'debt-syndication',
      title: 'Domestic & Foreign Debt Syndication',
      shortDesc: 'Structured financing solutions for suitable domestic and international debt requirements.',
      fullDesc: 'Facilitating structured debt syndication through established domestic financial institutions and international lending channels to meet large-scale funding and cross-border capital requirements.',
      keyFeatures: [
        'Domestic consortium and multiple-banking debt structuring',
        'Facilitation of foreign currency credit and overseas debt',
        'Comprehensive documentation and financial modeling'
      ],
      iconName: 'Globe2',
      badge: 'Corporate Debt'
    },
    {
      id: 'project-finance',
      title: 'Project Finance & Restructuring',
      shortDesc: 'Financial solutions for project financing and restructuring requirements.',
      fullDesc: 'Tailored financial advisory for capital-intensive infrastructure, manufacturing, and commercial projects, alongside debt restructuring assistance to streamline obligations.',
      keyFeatures: [
        'Detailed project viability and appraisal review',
        'Long-term capital expenditure financing guidance',
        'Debt restructuring and liability realignment advisory'
      ],
      iconName: 'Building2',
      badge: 'Project & Turnaround'
    },
    {
      id: 'working-capital',
      title: 'Working Capital',
      shortDesc: 'Financing solutions designed to support eligible day-to-day business requirements.',
      fullDesc: 'Assisting operating enterprises in assessing and obtaining optimal working capital limits, including cash credit, overdraft facilities, and invoice discounting mechanisms.',
      keyFeatures: [
        'Cash credit (CC) and overdraft (OD) facility evaluation',
        'Letter of credit (LC) and bank guarantee (BG) structuring',
        'Operating cycle and inventory funding optimization'
      ],
      iconName: 'Coins',
      badge: 'Liquidity & Trade'
    },
    {
      id: 'lap',
      title: 'Loan Against Property (LAP)',
      shortDesc: 'Financing solutions secured against eligible property, subject to applicable terms.',
      fullDesc: 'Facilitating secured funding by leveraging the value of residential or commercial properties to fund business expansion, debt consolidation, or long-term financial commitments.',
      keyFeatures: [
        'Evaluation against residential and commercial property values',
        'Structured repayment tenures with competitive interest rates',
        'Assistance with clear title documentation and legal scrutiny'
      ],
      iconName: 'Building',
      badge: 'Secured Finance'
    },
    {
      id: 'business-loan',
      title: 'Business Loan',
      shortDesc: 'Financing options designed to support eligible business requirements.',
      fullDesc: 'Financing facilities structured for proprietors, partnerships, and corporate entities seeking expansion capital, machinery acquisition, or operational growth funds.',
      keyFeatures: [
        'Collateral-free and asset-backed business credit assessment',
        'Evaluation of financials, turnover, and cash flows',
        'Transparent comparison of lending partners and terms'
      ],
      iconName: 'Briefcase',
      badge: 'Commercial Credit'
    },
    {
      id: 'home-loan',
      title: 'Home Loan',
      shortDesc: 'Explore suitable home-financing options based on eligibility and applicable terms.',
      fullDesc: 'Structured advisory for purchasing new residential units, resale properties, plot purchases, and construction, helping identify optimal tenure and interest rate structures.',
      keyFeatures: [
        'Assessment of borrowing capacity and repayment tenure',
        'Comparative evaluation across top housing finance institutions',
        'Guidance on documentation, legal checks, and processing terms'
      ],
      iconName: 'Home',
      badge: 'Housing Finance'
    },
    {
      id: 'personal-loan',
      title: 'Personal Loan',
      shortDesc: 'Financing options for eligible personal requirements, subject to applicable terms.',
      fullDesc: 'Facilitating access to personal financing solutions to address planned milestones, contingencies, education, or debt consolidation based on applicant credit profile.',
      keyFeatures: [
        'Credit score and repayment capacity review',
        'Quick processing with minimal documentation assistance',
        'Transparent tenure options and clear repayment schedules'
      ],
      iconName: 'Wallet',
      badge: 'Personal Finance'
    },
    {
      id: 'car-loan',
      title: 'Car Loan',
      shortDesc: 'Financing options for eligible vehicle purchases.',
      fullDesc: 'Financing options designed to facilitate the acquisition of new and pre-owned personal or commercial vehicles with balanced monthly commitments.',
      keyFeatures: [
        'Comparison of on-road vehicle loan financing terms',
        'Tenure structuring for balanced monthly commitments',
        'Assistance with documentation and verification procedures'
      ],
      iconName: 'Car',
      badge: 'Vehicle Finance'
    },
    {
      id: 'insurance',
      title: 'Insurance',
      shortDesc: 'Insurance solutions designed around different financial protection requirements.',
      fullDesc: 'Comprehensive guidance on life, health, critical illness, and general insurance products designed to mitigate unforeseen risks and preserve family and commercial wealth.',
      keyFeatures: [
        'Assessment of adequate sum insured for individuals and businesses',
        'Objective policy feature, rider, and exclusion evaluation',
        'Guidance on claim documentation and servicing standards'
      ],
      iconName: 'ShieldCheck',
      badge: 'Risk Mitigation'
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Funds',
      shortDesc: 'Investment options that can be explored according to financial objectives and risk profile.',
      fullDesc: 'Educational exploration and access to diversified mutual fund categories, matching individual time horizons, liquidity expectations, and personal risk parameters.',
      keyFeatures: [
        'Systematic Investment Plan (SIP) and lumpsum exploration',
        'Category analysis across equity, debt, and hybrid funds',
        'Portfolio alignment with financial goals and risk appetite'
      ],
      iconName: 'PieChart',
      badge: 'Wealth Solutions'
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe2': return <Globe2 className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Coins': return <Coins className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Wallet': return <Wallet className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'PieChart': return <PieChart className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold mb-3">
            <span>Our Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
            OUR SERVICES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Comprehensive financial solutions designed to address diverse personal and business requirements.
          </p>
        </div>

        {/* 10 Services Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center group-hover:bg-brand-forest group-hover:text-brand-fresh transition-colors duration-200">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-brand-forest transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-brand-forest hover:text-brand-primary group-hover:translate-x-1 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-brand-primary" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout: Have a financial requirement? */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50/70 via-slate-50 to-emerald-50/70 rounded-3xl p-8 sm:p-10 border border-emerald-100/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Have a financial requirement?
            </h3>
            <p className="text-sm text-slate-600 max-w-xl">
              Connect with our advisory desk to discuss suitable structures and financing options tailored to your eligibility.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 bg-brand-forest text-white px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold hover:bg-brand-dark transition-all duration-200 shadow-md hover:shadow-lg shrink-0 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Talk to Our Experts</span>
            <ArrowRight className="w-4 h-4 text-brand-fresh" />
          </a>
        </div>

        {/* Regulatory & Institutional Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> All financing, credit, insurance, and investment products are subject to eligibility verification, applicable terms, underwriting criteria, and relevant regulatory guidelines of respective lending institutions, insurers, or asset management companies. MoneyPlant does not guarantee approvals, sanction amounts, or returns.
          </p>
        </div>

      </div>

      {/* Modal for Service Deep Dive */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
};
