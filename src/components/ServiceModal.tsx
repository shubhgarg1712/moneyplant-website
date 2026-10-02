import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface Props {
  service: ServiceItem;
  onClose: () => void;
}

export const ServiceModal: React.FC<Props> = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-brand-forest">
            {service.badge}
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed">
          {service.fullDesc}
        </p>

        {/* Key Features */}
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

        {/* CTAs */}
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
    </div>
  );
};
