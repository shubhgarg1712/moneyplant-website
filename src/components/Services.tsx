import React, { useState } from 'react';
import { 
  Home, 
  Building, 
  Coins, 
  Landmark, 
  Briefcase, 
  Wallet, 
  Car,
  ArrowRight,
  Info
} from 'lucide-react';
import { ServiceModal } from './ServiceModal';
import { ServiceItem } from '../types';

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Exactly 6 services in the exact requested order:
  // Row 1: Home Loan | Loan Against Property | Working Capital
  // Row 2: CGTMSE (Govt. Scheme) | Business Loan | Personal Loan
  const servicesList: ServiceItem[] = [
    {
      id: 'home-loan',
      title: 'HOME LOAN',
      shortDesc: 'Financing solutions for eligible home purchases, subject to applicable eligibility criteria and lender terms.',
      fullDesc: 'Structured advisory for purchasing new residential properties, resale homes, plot purchases, and home construction, helping evaluate suitable tenures and interest rate options across institutional lenders.',
      keyFeatures: [
        'Assessment of borrowing capacity and tenure structuring',
        'Objective comparison across verified lending partners',
        'Guidance on required property documentation and processing steps'
      ],
      iconName: 'Home',
      badge: 'Housing Finance'
    },
    {
      id: 'lap',
      title: 'LOAN AGAINST PROPERTY',
      shortDesc: 'Financing solutions secured against eligible property, subject to applicable eligibility criteria and terms.',
      fullDesc: 'Facilitating secured funding by leveraging the collateral value of clear-title residential or commercial properties to fund business expansion or long-term financial commitments.',
      keyFeatures: [
        'Financing evaluated against residential and commercial property values',
        'Longer repayment tenure options with structured EMI schedules',
        'Guidance on clear property title verification and legal prerequisites'
      ],
      iconName: 'Building',
      badge: 'Secured Finance'
    },
    {
      id: 'working-capital',
      title: 'WORKING CAPITAL',
      shortDesc: 'Financial solutions designed to support eligible day-to-day business working-capital requirements.',
      fullDesc: 'Assisting operational enterprises in evaluating and arranging working capital facilities—including cash credit (CC), overdrafts (OD), and trade instruments—to support liquidity cycles.',
      keyFeatures: [
        'Cash credit (CC) and overdraft (OD) limit evaluation',
        'Trade finance facilitation (Letter of Credit & Bank Guarantees)',
        'Inventory and receivables funding cycle assessment'
      ],
      iconName: 'Coins',
      badge: 'Operational Liquidity'
    },
    {
      id: 'cgtmse',
      title: 'CGTMSE (GOVT. SCHEME)',
      shortDesc: 'Financing support under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) framework, subject to applicable eligibility and scheme guidelines.',
      fullDesc: 'Facilitating eligible Micro and Small Enterprises (MSEs) in exploring credit facilities covered under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) scheme, in accordance with applicable Ministry of MSME guidelines and partner bank criteria.',
      keyFeatures: [
        'Guidance on MSE registration and eligible activity checks',
        'Preparation of project reports and financial dossiers for scheme submission',
        'Subject strictly to government scheme guidelines and lender sanction parameters'
      ],
      iconName: 'Landmark',
      badge: 'Govt. Framework'
    },
    {
      id: 'business-loan',
      title: 'BUSINESS LOAN',
      shortDesc: 'Financing solutions designed to support eligible business requirements and expansion needs.',
      fullDesc: 'Financing facilities designed to assist commercial enterprises, manufacturers, and service providers in funding equipment purchases, operational scale-up, and business development.',
      keyFeatures: [
        'Assessment of business turnover, banking track record, and cash flows',
        'Unsecured and secured commercial funding options based on profile',
        'Transparent evaluation of lender processing terms and interest structures'
      ],
      iconName: 'Briefcase',
      badge: 'Commercial Credit'
    },
    {
      id: 'personal-loan',
      title: 'PERSONAL LOAN',
      shortDesc: 'Financing options for eligible personal financial requirements, subject to applicable eligibility and lender terms.',
      fullDesc: 'Facilitating access to personal financing solutions to address planned family milestones, medical contingencies, higher education, or financial restructuring based on individual creditworthiness.',
      keyFeatures: [
        'Evaluation based on applicant monthly income and credit profile',
        'Structured repayment tenures with fixed monthly obligations',
        'Transparent disclosure of processing charges, prepayment, and lender terms'
      ],
      iconName: 'Wallet',
      badge: 'Personal Credit'
    },
    {
      id: 'car-loan',
      title: 'CAR LOAN',
      shortDesc: 'Financing solutions for eligible new, pre-owned, and commercial vehicles, subject to applicable criteria.',
      fullDesc: 'Customized vehicle financing advisory assisting individuals and enterprises in evaluating options across three distinct categories: new car loans, commercial vehicle loans, and used car loans with leading institutional lenders.',
      keyFeatures: [
        'Financing solutions for new, commercial, and used vehicles',
        'Structured loan tenures and repayment schedule guidance',
        'Guidance on required vehicle documentation, hypothecation, and lender criteria'
      ],
      iconName: 'Car',
      badge: 'Vehicle Finance',
      carLoanOptions: [
        {
          id: 'car-loan-new',
          title: 'Car Loan',
          description: 'Financing solutions for eligible new vehicle purchases, subject to applicable eligibility criteria and lender terms.',
          iconName: 'Car',
          category: 'New Vehicles'
        },
        {
          id: 'car-loan-commercial',
          title: 'Commercial Car Loan',
          description: 'Financing solutions for eligible commercial vehicles used for business or professional purposes, subject to applicable lender terms.',
          iconName: 'Truck',
          category: 'Commercial Use'
        },
        {
          id: 'car-loan-used',
          title: 'Used Car Loan',
          description: 'Financing solutions for eligible pre-owned vehicles, subject to vehicle, borrower and lender eligibility criteria.',
          iconName: 'RotateCcw',
          category: 'Pre-Owned'
        }
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      case 'Coins': return <Coins className="w-6 h-6" />;
      case 'Landmark': return <Landmark className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Wallet': return <Wallet className="w-6 h-6" />;
      case 'Car': return <Car className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="scroll-mt-20 py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold mb-3">
            <span>Our Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 uppercase">
            OUR SERVICES
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Financial solutions tailored to meet your personal and business requirements.
          </p>
        </div>

        {/* Services Grid: 
            Desktop: 3 cards per row
            Tablet: 2 cards per row
            Mobile: 1 card per row
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
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

        {/* Compliance & Regulatory Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong>Compliance Notice:</strong> All financing facilities are subject to individual applicant eligibility criteria, verification, documentation, and the underwriting policies of respective banks and financial institutions. For CGTMSE, coverage is strictly subject to applicable Credit Guarantee Trust guidelines and lending bank appraisal; eligibility is not automatic. MoneyPlant does not guarantee loan approval or sanction amounts.
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
