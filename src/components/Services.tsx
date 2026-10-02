import React, { useState } from 'react';
import { 
  CreditCard, 
  Briefcase, 
  Umbrella, 
  TrendingUp, 
  Compass, 
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
      id: 'loans',
      title: 'Loans & Credit Solutions',
      shortDesc: 'Explore suitable financing options based on your requirements.',
      fullDesc: 'We assist individuals and enterprises in evaluating competitive financing options across personal, home, vehicle, and working capital credit facilities from reputable lending institutions.',
      keyFeatures: [
        'Objective assessment of borrowing limits',
        'Transparent comparison of interest rates and tenure',
        'Guidance on required paperwork and eligibility'
      ],
      iconName: 'CreditCard',
      badge: 'Credit Facilities'
    },
    {
      id: 'business',
      title: 'Business Finance',
      shortDesc: 'Financial solutions designed to support business requirements and growth.',
      fullDesc: 'Customized credit lines, equipment financing, and working capital structures tailored to support SME and corporate operational continuity and strategic expansion.',
      keyFeatures: [
        'Working capital requirement modeling',
        'Commercial loan structuring advisory',
        'Assistance in building clean financial dossiers'
      ],
      iconName: 'Briefcase',
      badge: 'Enterprise & SME'
    },
    {
      id: 'insurance',
      title: 'Insurance Solutions',
      shortDesc: 'Explore insurance options designed to provide financial protection.',
      fullDesc: 'Comprehensive reviews of life, health, critical illness, and commercial liability policies designed to insulate your family and business against unforeseen risks.',
      keyFeatures: [
        'Adequate sum insured calculation',
        'Policy feature and exclusion breakdown',
        'Claim assistance guidance'
      ],
      iconName: 'Umbrella',
      badge: 'Risk Mitigation'
    },
    {
      id: 'wealth',
      title: 'Investment & Wealth Solutions',
      shortDesc: 'Understand investment options and make informed financial decisions.',
      fullDesc: 'Gain clear, objective perspectives on wealth management tools matching your individual risk tolerance, horizon, and liquidity parameters.',
      keyFeatures: [
        'Asset allocation reviews',
        'Diversification strategy frameworks',
        'Periodic rebalancing guidelines'
      ],
      iconName: 'TrendingUp',
      badge: 'Wealth Building'
    },
    {
      id: 'planning',
      title: 'Financial Planning',
      shortDesc: 'Structured guidance to help organize and plan your financial goals.',
      fullDesc: 'A cohesive, lifecycle-based financial roadmapping process covering cash flow optimization, retirement targets, education funds, and emergency reserves.',
      keyFeatures: [
        'Holistic cash flow & debt planning',
        'Goal prioritization timeline',
        'Contingency fund architecture'
      ],
      iconName: 'Compass',
      badge: 'Holistic Advisory'
    },
    {
      id: 'mutual-funds',
      title: 'Mutual Fund Solutions',
      shortDesc: 'Explore mutual fund investment options according to your financial objectives and risk profile.',
      fullDesc: 'Informed exploration of debt, equity, and hybrid mutual fund categories aligned with risk parameters, investment tenure, and tax considerations.',
      keyFeatures: [
        'Systematic Investment Plan (SIP) modeling',
        'Scheme classification & benchmark analysis',
        'Risk-reward profile alignment'
      ],
      iconName: 'PieChart',
      badge: 'Market Options'
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'CreditCard': return <CreditCard className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      case 'Umbrella': return <Umbrella className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'PieChart': return <PieChart className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 text-brand-forest text-xs font-semibold mb-3">
            <span>Our Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Our Financial Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We provide structured consultation and facilitate access to verified financial products. We help you compare, evaluate, and choose what best fits your goals.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
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

        {/* Mandatory Regulatory / Operational Notice */}
        <div className="mt-12 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-600 flex items-start gap-3">
          <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
          <p>
            <strong>Regulatory Clarity:</strong> MoneyPlant operates as an independent financial consultancy and distribution facilitator. Product underwriting, approvals, interest rates, and policy issuances are governed by individual partner institutions, banks, AMCs, or insurance providers and are subject to verification and regulatory guidelines.
          </p>
        </div>

      </div>

      {/* Modal for Service Details */}
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
};
