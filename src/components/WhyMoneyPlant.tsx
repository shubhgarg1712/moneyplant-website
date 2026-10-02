import React from 'react';
import { Compass, Sparkles, Eye, HeartHandshake } from 'lucide-react';

export const WhyMoneyPlant: React.FC = () => {
  const points = [
    {
      num: "01",
      title: "Personalized Approach",
      tagline: "Solutions designed around your individual requirements.",
      details: "We start by analyzing your distinct cash flow, commitments, and horizons rather than prescribing rigid pre-packaged templates.",
      icon: Compass
    },
    {
      num: "02",
      title: "Simplified Finance",
      tagline: "Making financial concepts easier to understand.",
      details: "Complex regulatory clauses, APRs, and financial ratios are distilled into straightforward, actionable insights.",
      icon: Sparkles
    },
    {
      num: "03",
      title: "Transparent Process",
      tagline: "Clear communication throughout your journey.",
      details: "No hidden charges, zero high-pressure sales pitches, and complete clarity across every product comparison.",
      icon: Eye
    },
    {
      num: "04",
      title: "Long-Term Relationships",
      tagline: "Focused on building lasting client relationships.",
      details: "Our commitment extends beyond single transactions to serving as your trusted financial soundboard over time.",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="why-us" className="scroll-mt-20 py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold mb-3">
            <span>The MoneyPlant Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Why Choose MoneyPlant?
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            We bridge the gap between complex financial instruments and everyday decision-making.
          </p>
        </div>

        {/* 4 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-soft hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold tracking-tight text-emerald-600/30 group-hover:text-brand-forest transition-colors">
                      {pt.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-brand-forest transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Subtle Green Animated Line Accent */}
                  <div className="w-12 h-1 bg-slate-100 rounded-full mb-5 group-hover:w-20 group-hover:bg-gradient-to-r group-hover:from-brand-forest group-hover:to-brand-fresh transition-all duration-300"></div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-forest transition-colors">
                    {pt.title}
                  </h3>
                  <p className="text-sm font-semibold text-brand-forest mb-2">
                    “{pt.tagline}”
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pt.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
