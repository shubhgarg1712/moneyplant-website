import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Loans & Credit Solutions',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Domestic & Foreign Debt Syndication',
    'Project Finance & Restructuring',
    'Working Capital',
    'Loan Against Property (LAP)',
    'Business Loan',
    'Home Loan',
    'Personal Loan',
    'Car Loan',
    'Insurance',
    'Mutual Funds',
    'General Inquiry'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Form Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate API submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: 'Loans & Credit Solutions',
        message: ''
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-brand-forest text-xs font-semibold mb-3">
            <span>Direct Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Let's Talk About Your Financial Needs
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Connect with our advisory desk to review your goals, clarify options, and take the next step with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-premium">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-brand-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Enquiry Received</h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
                  Thank you for reaching out. A MoneyPlant consultant will review your requirement and contact you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 rounded-full bg-brand-forest text-white text-sm font-semibold hover:bg-brand-dark transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary"
                  >
                    {services.map((srv) => (
                      <option key={srv} value={srv}>{srv}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message / Requirement Notes
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements, questions, or timeline..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-forest text-white py-3.5 rounded-xl font-semibold text-base hover:bg-brand-dark transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-75"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <ArrowRight className="w-4 h-4 text-brand-fresh" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Information & Google Maps Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Contact Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">[ADD PHONE NUMBER]</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">[ADD EMAIL]</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</p>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">[ADD OFFICE ADDRESS]</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Website</p>
                    <p className="text-sm font-semibold text-brand-primary mt-0.5">moneyplant.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Placeholder */}
            <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-soft overflow-hidden">
              <div className="h-44 w-full bg-slate-100/80 rounded-2xl relative flex flex-col items-center justify-center p-4 border border-slate-200/60 text-center">
                <MapPin className="w-8 h-8 text-brand-forest mb-2 animate-bounce" />
                <p className="text-sm font-bold text-slate-800">Office Location Map</p>
                <p className="text-xs text-slate-500 max-w-xs mt-1">
                  Interactive Google Maps preview centered at [ADD OFFICE ADDRESS]
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
