import React, { useEffect } from 'react';
import { X, Info, ArrowRight, ShieldCheck } from 'lucide-react';
import { BankItem, getAvailableRates } from './BankingNetwork';

export interface BankRateModalProps {
  bank: BankItem | null;
  onClose: () => void;
}

export const BankRateModal: React.FC<BankRateModalProps> = ({ bank, onClose }) => {
  // Close modal on Escape key press and lock background scroll
  useEffect(() => {
    if (!bank) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [bank, onClose]);

  if (!bank) return null;

  const availableProducts = getAvailableRates(bank);

  const handleConsultationClick = () => {
    onClose();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bank-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          aria-label="Close rate modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 sm:gap-5 pr-8 border-b border-slate-100 pb-5">
          {/* Bank Logo Container */}
          <div className="w-20 sm:w-24 h-16 sm:h-18 p-2 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
            <img
              src={bank.logo}
              alt={bank.alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Title & Classification */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-brand-forest text-[11px] font-semibold border border-emerald-200/60 mb-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{bank.category}</span>
            </div>
            <h3
              id="bank-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight truncate"
            >
              {bank.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Indicative Lending Rate of Interest (ROI) Schedule
            </p>
          </div>
        </div>

        {/* Advisory Subheading */}
        <div className="my-5 flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="font-semibold text-slate-700">Available Products</span>
          <span className="font-semibold text-slate-700">Indicative ROI (p.a.)</span>
        </div>

        {/* Available Product Rates List */}
        <div className="space-y-2.5">
          {availableProducts.map((product) => (
            <div
              key={product.key}
              className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-800">
                    {product.label}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {product.shortDesc}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <div className="inline-flex items-baseline gap-1 bg-emerald-50/80 px-3 py-1 rounded-lg border border-emerald-100">
                  <span className="text-sm sm:text-base font-extrabold text-brand-forest tracking-tight">
                    {product.value}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 uppercase">
                    p.a.
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory & Institutional Advisory Callout */}
        <div className="mt-6 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-900/90 flex items-start gap-2.5 leading-relaxed">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Note:</strong> Rates are indicative starting figures subject to lender credit appraisal, applicant profile, loan tenure, collateral evaluation, and RBI policy rate shifts. Sanction rests entirely with {bank.name}.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleConsultationClick}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-brand-forest hover:bg-brand-forest/90 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Inquire for {bank.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
