import React from 'react';
import { Shield, Sparkles, UserCheck, Scale, Award } from 'lucide-react';
import { moneyPlantLogoSymbol, moneyPlantLogoFull } from '../assets/logo';

export const AboutSection: React.FC = () => {
  const values = [
    {
      title: "Integrity",
      desc: "Unbiased, objective guidance with strict ethical conduct in every recommendation.",
      icon: Shield
    },
    {
      title: "Clarity",
      desc: "Demystifying complex financial jargon so you can take decisions with total confidence.",
      icon: Sparkles
    },
    {
      title: "Client Focus",
      desc: "Putting your personal or corporate requirements at the heart of our roadmap.",
      icon: UserCheck
    },
    {
      title: "Responsibility",
      desc: "Strict adherence to fiduciary responsibility, privacy, and realistic financial prudence.",
      icon: Scale
    }
  ];

  return (
    <section id="about" className="scroll-mt-20 py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Company Story & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold">
              <span>Corporate Profile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              About MoneyPlant
            </h2>

            <p className="text-lg text-slate-700 leading-relaxed font-normal">
              MoneyPlant is focused on making financial services more accessible, understandable and client-centric. Our approach is built around understanding requirements, explaining available options clearly and helping clients make informed financial decisions.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              In an industry often crowded with confusing terminology, MoneyPlant serves as an objective anchor. Whether helping an individual evaluate home loan terms or assisting an enterprise with structured credit options, we believe in straightforward dialogue, patient listening, and meticulous analysis.
            </p>

            {/* Values Grid */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-brand-forest flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{val.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Corporate Accent Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-brand-forest to-brand-dark rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              {/* Background ambient pattern */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md shrink-0">
                  <img 
                    src={moneyPlantLogoSymbol} 
                    alt="MoneyPlant Brand" 
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = moneyPlantLogoFull;
                    }}
                  />
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  “We speak financial fluently”
                </h3>

                <p className="text-slate-200 text-sm leading-relaxed">
                  Our motto represents our commitment to translating complicated financial terminology into straightforward options that work for your life and business.
                </p>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-emerald-200">
                    <span>Client Centricity</span>
                    <span className="font-semibold text-white">Non-Negotiable</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-200">
                    <span>Advisory Stance</span>
                    <span className="font-semibold text-white">Objective & Clear</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-200">
                    <span>Product Facilitation</span>
                    <span className="font-semibold text-white">Multi-Institutional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
