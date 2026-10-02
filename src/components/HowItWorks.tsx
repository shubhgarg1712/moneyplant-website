import React from 'react';
import { ArrowRight, Lightbulb, Search, FileText, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Understand",
      desc: "Tell us about your financial requirement.",
      details: "We start with an open consultation to understand your context, requirements, cash flow constraints, and expectations.",
      icon: Lightbulb
    },
    {
      num: "02",
      title: "Explore",
      desc: "Review relevant financial options.",
      details: "We shortlist and organize the most suitable options available across verified institutional partners and categories.",
      icon: Search
    },
    {
      num: "03",
      title: "Evaluate",
      desc: "Understand the features, costs, risks and suitability.",
      details: "We walk you through the fine print, associated charges, tenure options, risk metrics, and suitability criteria.",
      icon: FileText
    },
    {
      num: "04",
      title: "Proceed",
      desc: "Move forward with the option that fits your requirements.",
      details: "You take the informed decision at your own pace, supported by our team through documentation and execution.",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-brand-forest text-xs font-semibold mb-3">
            <span>Structured Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Your Financial Journey, Simplified
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            A step-by-step roadmap designed to give you clarity and complete control over your decisions.
          </p>
        </div>

        {/* 4-Step Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft hover:shadow-premium transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-brand-forest">
                      Step {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-brand-forest flex items-center justify-center group-hover:bg-brand-forest group-hover:text-brand-fresh transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-forest font-semibold text-xs mb-2">
                    {step.desc}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {step.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-50">
                  <span className="text-[11px] font-medium text-slate-400">Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-forest text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-brand-dark transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4 text-brand-fresh" />
          </a>
        </div>

      </div>
    </section>
  );
};
