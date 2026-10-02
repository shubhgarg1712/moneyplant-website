import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldAlert } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "What financial services does MoneyPlant provide?",
      answer: "MoneyPlant provides consulting, advisory structuring, and facilitation across personal and commercial credit solutions, business finance, risk-mitigating insurance options, structured financial planning, wealth management strategies, and mutual fund exploration. We assist clients in evaluating suitable options according to their specific requirements."
    },
    {
      question: "How can I contact MoneyPlant?",
      answer: "You can connect with us directly via our online enquiry form on this website, by calling +91 8178419058, or by emailing info.mpfinserve@gmail.com. Our advisory desk will schedule a structured consultation to review your requirements."
    },
    {
      question: "How do I know which financial solution is suitable for me?",
      answer: "Suitability depends on your specific financial situation, cash flows, risk tolerance, horizon, and upcoming milestones. During our initial discussion, we evaluate these parameters objectively to help you explore and compare options that fit your profile."
    },
    {
      question: "What documents may be required?",
      answer: "Required documentation depends on the specific financial facility. Typically, requirements include identity proof (PAN, Aadhaar), address verification, recent bank statements, and income records (ITR returns or salary slips for individuals, and audited financials/GST returns for businesses)."
    },
    {
      question: "Does MoneyPlant guarantee investment returns?",
      answer: "No. MoneyPlant does not guarantee investment returns, approvals, or risk-free results. All market-linked investments carry risk, and capital performance varies with market factors. Suitability and risk tolerance depend strictly on individual circumstances."
    },
    {
      question: "How can I get started?",
      answer: "Getting started is straightforward. Submit your enquiry through our contact form, select the category of service you wish to explore, and one of our dedicated financial consultants will reach out to schedule an introductory consultation."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Transparent, factual answers regarding our services, processes, and risk approach.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-brand-primary' : ''
                    }`} 
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed bg-white border-t border-slate-100">
                    <p>{faq.answer}</p>
                    {idx === 4 && (
                      <div className="mt-3 p-3 rounded-lg bg-emerald-50/70 text-brand-forest text-xs flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 shrink-0 text-brand-primary" />
                        <span>Investments are subject to market risks. Read all scheme-related documents carefully.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
