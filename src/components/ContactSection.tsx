import React, { useState } from 'react';
import { Phone, Mail, Globe, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { CustomSelect } from './CustomSelect';
import { moneyPlantLogoSymbol, moneyPlantLogoFull } from '../assets/logo';

export const TARGET_EMAIL = "info.mpfinserve@gmail.com";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Home Loan',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const services = [
    'Home Loan',
    'Loan Against Property',
    'Working Capital',
    'CGTMSE (Govt. Scheme)',
    'Business Loan',
    'Personal Loan',
    'General Inquiry'
  ];

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    const cleanPhone = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required.';
    } else if (cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid phone number (at least 10 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.service) {
      errors.service = 'Please select a required service.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide details in the message field.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Step 1: Validate all required fields
    if (!validateForm()) {
      setErrorMessage('Please fill in all required fields correctly before submitting.');
      return;
    }

    setStatus('loading');

    const submittedOnFormatted = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    // Step 2 & 3 & 4: Secure transmission payload to info.mpfinserve@gmail.com
    const payload = {
      _subject: `New MoneyPlant Website Enquiry – ${formData.service}`,
      _template: 'table',
      _captcha: 'false',
      "Introduction": "New enquiry received through the MoneyPlant website.",
      "Name": formData.fullName.trim(),
      "Phone": formData.phone.trim(),
      "Email": formData.email.trim(),
      "Service Required": formData.service,
      "Message": formData.message.trim(),
      "Submitted On": submittedOnFormatted
    };

    try {
      // Secure HTTPS Form Relay without exposing any Gmail credentials or secrets in code
      const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => null);

      // Handle successful submission or initial activation confirmation
      if (
        response.ok && 
        (data?.success === 'true' || data?.success === true || (data?.message && data.message.toLowerCase().includes('activate')))
      ) {
        setStatus('success');
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: 'Home Loan',
          message: ''
        });
        setValidationErrors({});
      } else {
        throw new Error(data?.message || 'Submission failed');
      }
    } catch (err) {
      // Step 6: Failure state
      console.error('Enquiry submission error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 py-24 bg-slate-50/70 border-t border-slate-200/80">
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
              /* Step 5: Success state message */
              <div className="text-center py-12 space-y-5 animate-in fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-brand-forest rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">Enquiry Received</h3>
                  <p className="text-slate-700 max-w-md mx-auto text-base leading-relaxed font-medium">
                    “Thank you for contacting MoneyPlant. Your enquiry has been received. Our team will get back to you shortly.”
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setErrorMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-brand-forest text-white text-sm font-semibold hover:bg-brand-dark transition-colors shadow-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Step 6: General Error Banner */}
                {(status === 'error' || errorMessage) && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 animate-in fade-in">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">
                        {status === 'error'
                          ? 'Something went wrong. Please try again or contact us directly.'
                          : errorMessage}
                      </p>
                      {status === 'error' && (
                        <p className="text-xs text-red-600 mt-1">
                          You can also reach us directly at <a href={`mailto:${TARGET_EMAIL}`} className="underline font-bold">{TARGET_EMAIL}</a>.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Full Name Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (validationErrors.fullName) setValidationErrors({ ...validationErrors, fullName: '' });
                    }}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      validationErrors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-primary'
                    }`}
                  />
                  {validationErrors.fullName && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.fullName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: '' });
                      }}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        validationErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-primary'
                      }`}
                    />
                    {validationErrors.phone && (
                      <p className="text-xs text-red-600 mt-1">{validationErrors.phone}</p>
                    )}
                  </div>

                  {/* Email Address Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (validationErrors.email) setValidationErrors({ ...validationErrors, email: '' });
                      }}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                        validationErrors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-primary'
                      }`}
                    />
                    {validationErrors.email && (
                      <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Service Required Field (Custom MoneyPlant Styled Dropdown) */}
                <CustomSelect
                  id="service-required"
                  label="Service Required"
                  required
                  value={formData.service}
                  options={services}
                  onChange={(selectedService) => {
                    setFormData({ ...formData, service: selectedService });
                    if (validationErrors.service) {
                      setValidationErrors({ ...validationErrors, service: '' });
                    }
                  }}
                  error={validationErrors.service}
                />

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message / Requirement Notes <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (validationErrors.message) setValidationErrors({ ...validationErrors, message: '' });
                    }}
                    placeholder="Briefly describe your requirements, financing expectations, or timeline..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none ${
                      validationErrors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-primary'
                    }`}
                  ></textarea>
                  {validationErrors.message && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-forest text-white py-3.5 rounded-xl font-semibold text-base hover:bg-brand-dark transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-75 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <Send className="w-4 h-4 text-brand-fresh" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-6">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-slate-50 p-1.5 border border-slate-100 flex items-center justify-center shrink-0">
                  <img 
                    src={moneyPlantLogoSymbol} 
                    alt="MoneyPlant" 
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = moneyPlantLogoFull;
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    MoneyPlant Advisory Desk
                  </h3>
                  <p className="text-xs text-brand-forest font-semibold mt-0.5">
                    “We speak financial fluently”
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                    <a 
                      href="tel:+918178419058"
                      className="text-sm font-semibold text-slate-900 hover:text-brand-forest mt-0.5 block hover:underline"
                    >
                      +91 8178419058
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                    <a 
                      href={`mailto:${TARGET_EMAIL}`} 
                      className="text-sm font-semibold text-brand-forest hover:text-brand-primary mt-0.5 block hover:underline"
                    >
                      {TARGET_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-forest flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Website</p>
                    <a 
                      href="https://moneyplant.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-forest hover:text-brand-primary mt-0.5 block hover:underline"
                    >
                      moneyplant.in
                    </a>
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
