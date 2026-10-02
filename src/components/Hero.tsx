import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Messaging */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Brand Identity Badge with Logo */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200/90 shadow-sm">
              <img 
                src="/assets/moneyplant-logo-symbol.png" 
                alt="MoneyPlant Brand" 
                className="w-5 h-5 object-contain"
              />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                <span className="text-[#1E3F0A]">MONEY</span><span className="text-[#527E24]">PLANT</span> <span className="text-slate-600 font-medium">• Objective Financial Guidance</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14]">
              Your Financial Goals. <br />
              <span className="text-brand-forest relative inline-block">
                Our Financial Expertise.
                <span className="absolute bottom-1.5 left-0 w-full h-3 bg-brand-fresh/25 -z-10 rounded"></span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
              Financial solutions designed around your personal and business requirements.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2.5 bg-brand-forest text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-brand-dark transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 text-brand-fresh" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-300 px-7 py-3.5 rounded-full text-base font-semibold hover:bg-slate-50 hover:border-slate-400 transition-colors"
              >
                <span>Talk to Our Experts</span>
              </a>
            </div>

            {/* Confidence Metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-forest">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Clarity-First Advice</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-forest">Tailored</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Personal & Corporate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-forest">Client-First</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Objective Guidance</p>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Fintech Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Subtle Ambient Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand-forest/15 to-brand-fresh/20 blur-2xl -z-10"></div>

              {/* Main Financial Analytics Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-premium border border-slate-100 space-y-6">
                
                {/* Header with official logo symbol */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-sm">
                      <img 
                        src="/assets/moneyplant-logo-symbol.png" 
                        alt="MoneyPlant" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Structured Planning</h4>
                      <p className="text-xs text-slate-500">Milestone-driven roadmap</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-brand-forest">
                    Active Advisory
                  </span>
                </div>

                {/* Abstract Visual Financial Growth Graphic */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end text-xs text-slate-500 font-medium">
                    <span>Financial Preparedness</span>
                    <span className="text-brand-forest font-bold">Disciplined Growth</span>
                  </div>

                  <div className="h-36 w-full relative flex items-end gap-3 pt-4 px-2 bg-slate-50/70 rounded-xl border border-slate-100">
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-emerald-200/80 rounded-t-lg transition-all" style={{ height: '35%' }}></div>
                      <span className="text-[10px] text-slate-400 font-medium">Phase 1</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-emerald-300/80 rounded-t-lg transition-all" style={{ height: '52%' }}></div>
                      <span className="text-[10px] text-slate-400 font-medium">Phase 2</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-emerald-400/90 rounded-t-lg transition-all" style={{ height: '70%' }}></div>
                      <span className="text-[10px] text-slate-400 font-medium">Phase 3</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-brand-forest rounded-t-lg shadow-sm" style={{ height: '90%' }}></div>
                      <span className="text-[10px] font-bold text-brand-forest">Optimal</span>
                    </div>
                  </div>
                </div>

                {/* Sub Features Inside Card */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Protected</p>
                      <p className="text-[10px] text-slate-500">Risk Mitigation</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-brand-forest shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Objective</p>
                      <p className="text-[10px] text-slate-500">Comparative Analysis</p>
                    </div>
                  </div>
                </div>

                {/* Brand Motto Highlight with exact official Logo */}
                <div className="p-3.5 bg-brand-forest rounded-xl text-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-emerald-200">MoneyPlant Philosophy</p>
                    <p className="text-[11px] text-slate-200">“We speak financial fluently”</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center p-1">
                    <img 
                      src="/assets/moneyplant-logo-symbol.png" 
                      alt="MP" 
                      className="w-full h-full object-contain brightness-150"
                    />
                  </div>
                </div>

              </div>

              {/* Floating Pill Accent */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3.5 rounded-2xl shadow-premium border border-slate-100 items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-brand-forest flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Transparent Terms</p>
                  <p className="text-[10px] text-slate-500">Zero hidden ambiguity</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
