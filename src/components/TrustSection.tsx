import React from 'react';
import { ShieldCheck, UserCheck, Award } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const cards = [
    {
      title: "Transparent Approach",
      desc: "Clear explanations of features, terms, and considerations without hidden fine print or ambiguous language.",
      icon: ShieldCheck,
    },
    {
      title: "Client Focused",
      desc: "Solutions structured around your realistic milestones and profile, rather than one-size-fits-all products.",
      icon: UserCheck,
    },
    {
      title: "Financial Expertise",
      desc: "Experienced domain professionals guiding you through every step of personal and commercial finance.",
      icon: Award,
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Copy */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Financial clarity for better decisions.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            At MoneyPlant, we believe financial services should be easier to understand. We combine financial expertise with a client-focused approach to help you navigate your financial needs with greater clarity and confidence.
          </p>
        </div>

        {/* 3 Small Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center mb-6 group-hover:bg-brand-forest group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7 text-brand-forest group-hover:text-brand-fresh transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-forest transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
