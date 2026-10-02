import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Car, 
  Truck, 
  RotateCcw, 
  Info,
  Check
} from 'lucide-react';
import { ServiceItem, CarLoanOption } from '../types';

interface Props {
  service: ServiceItem;
  onClose: () => void;
}

export const ServiceModal: React.FC<Props> = ({ service, onClose }) => {
  const isCarLoan = service.id === 'car-loan';
  const [selectedCarOption, setSelectedCarOption] = useState<string>('car-loan-new');

  const getCarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'RotateCcw': return <RotateCcw className="w-6 h-6" />;
      default: return <Car className="w-6 h-6" />;
    }
  };

  const defaultCarOptions: CarLoanOption[] = (service.carLoanOptions || [
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
  ]).filter((opt) => opt.id !== 'car-loan-private');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl ${isCarLoan ? 'max-w-4xl' : 'max-w-lg'} w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 my-8 max-h-[92vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isCarLoan ? (
          /* ==============================================
             CAR LOAN SELECTION INTERFACE (3 OPTIONS)
             ============================================== */
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-brand-forest">
                Vehicle Finance Advisory
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Car Loan Financing Options
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
                Select your vehicle financing category below. Our advisory team helps evaluate eligibility and structures across leading lending institutions.
              </p>
            </div>

            {/* 3 Cards: Desktop 3 in 1 row, Tablet 2-column, Mobile clean stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {defaultCarOptions.map((opt) => {
                const isSelected = selectedCarOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedCarOption(opt.id)}
                    className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                      isSelected 
                        ? 'border-brand-primary bg-emerald-50/40 shadow-md ring-2 ring-brand-primary/20' 
                        : 'border-slate-200 bg-white hover:border-brand-primary/50 hover:shadow-soft hover:-translate-y-0.5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-brand-forest text-brand-fresh' 
                            : 'bg-emerald-50 text-brand-forest group-hover:bg-brand-forest group-hover:text-brand-fresh'
                        }`}>
                          {getCarIcon(opt.iconName)}
                        </div>
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {opt.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-forest transition-colors">
                          {opt.title}
                        </h4>
                        {isSelected && (
                          <Check className="w-4 h-4 text-brand-primary shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {opt.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-2">
                      <a
                        href="#contact"
                        onClick={onClose}
                        className={`w-full inline-flex items-center justify-between text-xs font-semibold py-2 px-3 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-brand-forest text-white'
                            : 'bg-slate-100 text-brand-forest group-hover:bg-brand-forest group-hover:text-white'
                        }`}
                      >
                        <span>Select & Inquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Regulatory & Neutral Disclaimer */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                <strong>Notice:</strong> Vehicle financing facilities, interest rates, and loan amounts are subject to individual borrower eligibility, vehicle inspection/documentation, and the underwriting policies of respective lending banks and institutions. MoneyPlant does not guarantee loan approval or terms.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-forest text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors shadow-sm"
              >
                <span>Proceed to Consultation Form</span>
                <ArrowRight className="w-4 h-4 text-brand-fresh" />
              </a>
            </div>
          </div>
        ) : (
          /* ==============================================
             STANDARD MODAL VIEW (FOR OTHER 6 SERVICES)
             ============================================== */
          <div className="space-y-6">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-brand-forest">
                {service.badge}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {service.title}
              </h3>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {service.fullDesc}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Advisory Scope
              </h4>
              <ul className="space-y-2.5">
                {service.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-forest text-white py-3 rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors"
              >
                <span>Inquire About This Service</span>
                <ArrowRight className="w-4 h-4 text-brand-fresh" />
              </a>
              <button
                onClick={onClose}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

