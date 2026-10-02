import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

export const FinancialCalculators: React.FC = () => {
  const [calcType, setCalcType] = useState<'emi' | 'sip'>('emi');

  // Sensible Limits
  const MIN_LOAN_AMOUNT = 100000;      // ₹1 Lakh
  const MAX_LOAN_AMOUNT = 20000000;    // ₹2 Crore
  const MIN_INTEREST_RATE = 6;         // 6.00%
  const MAX_INTEREST_RATE = 20;        // 20.00%

  // EMI Calculator State with synchronized manual inputs
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [loanAmountInput, setLoanAmountInput] = useState<string>('25,00,000');
  const [loanAmountError, setLoanAmountError] = useState<string>('');

  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [interestRateInput, setInterestRateInput] = useState<string>('8.50');
  const [interestRateError, setInterestRateError] = useState<string>('');

  const [tenureYears, setTenureYears] = useState<number>(20);

  // SIP Calculator State
  const [monthlyInvest, setMonthlyInvest] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [investYears, setInvestYears] = useState<number>(15);

  // Synchronized Manual Loan Amount Handlers
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const cleanDigits = rawVal.replace(/[^0-9]/g, '');

    if (cleanDigits === '') {
      setLoanAmountInput('');
      setLoanAmountError('Please enter an amount.');
      return;
    }

    const numericVal = parseInt(cleanDigits, 10);
    setLoanAmountInput(numericVal.toLocaleString('en-IN'));

    if (numericVal < MIN_LOAN_AMOUNT) {
      setLoanAmountError(`Minimum amount is ₹${MIN_LOAN_AMOUNT.toLocaleString('en-IN')}`);
      setLoanAmount(numericVal);
    } else if (numericVal > MAX_LOAN_AMOUNT) {
      setLoanAmountError(`Maximum amount is ₹${MAX_LOAN_AMOUNT.toLocaleString('en-IN')}`);
      setLoanAmount(numericVal);
    } else {
      setLoanAmountError('');
      setLoanAmount(numericVal);
    }
  };

  const handleLoanAmountBlur = () => {
    if (loanAmountInput === '' || loanAmount < MIN_LOAN_AMOUNT) {
      setLoanAmount(MIN_LOAN_AMOUNT);
      setLoanAmountInput(MIN_LOAN_AMOUNT.toLocaleString('en-IN'));
      setLoanAmountError('');
    } else if (loanAmount > MAX_LOAN_AMOUNT) {
      setLoanAmount(MAX_LOAN_AMOUNT);
      setLoanAmountInput(MAX_LOAN_AMOUNT.toLocaleString('en-IN'));
      setLoanAmountError('');
    } else {
      setLoanAmountInput(loanAmount.toLocaleString('en-IN'));
    }
  };

  const handleLoanAmountSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLoanAmount(val);
    setLoanAmountInput(val.toLocaleString('en-IN'));
    setLoanAmountError('');
  };

  // Synchronized Manual Interest Rate Handlers
  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value.replace(/[^0-9.]/g, '');
    const parts = rawVal.split('.');
    if (parts.length > 2) {
      rawVal = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts.length === 2 && parts[1].length > 2) {
      rawVal = parts[0] + '.' + parts[1].slice(0, 2);
    }

    setInterestRateInput(rawVal);

    if (rawVal === '' || rawVal === '.') {
      setInterestRateError('Please enter a valid rate.');
      return;
    }

    const numericVal = parseFloat(rawVal);
    if (!isNaN(numericVal)) {
      const roundedVal = Math.round(numericVal * 100) / 100;
      if (roundedVal < MIN_INTEREST_RATE) {
        setInterestRateError(`Minimum rate is ${MIN_INTEREST_RATE.toFixed(2)}%`);
        setInterestRate(roundedVal);
      } else if (roundedVal > MAX_INTEREST_RATE) {
        setInterestRateError(`Maximum rate is ${MAX_INTEREST_RATE.toFixed(2)}%`);
        setInterestRate(roundedVal);
      } else {
        setInterestRateError('');
        setInterestRate(roundedVal);
      }
    }
  };

  const handleInterestRateBlur = () => {
    if (interestRateInput === '' || interestRate < MIN_INTEREST_RATE) {
      setInterestRate(MIN_INTEREST_RATE);
      setInterestRateInput(MIN_INTEREST_RATE.toFixed(2));
      setInterestRateError('');
    } else if (interestRate > MAX_INTEREST_RATE) {
      setInterestRate(MAX_INTEREST_RATE);
      setInterestRateInput(MAX_INTEREST_RATE.toFixed(2));
      setInterestRateError('');
    } else {
      setInterestRateInput(interestRate.toFixed(2));
    }
  };

  const handleInterestRateSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    const val = Math.round(raw * 100) / 100;
    setInterestRate(val);
    setInterestRateInput(val.toFixed(2));
    setInterestRateError('');
  };

  // Calculate EMI with safe boundaries and float accuracy
  const calculateEMI = () => {
    const effectiveAmount = Math.max(0, loanAmount);
    const monthlyRate = (interestRate / 12) / 100;
    const months = tenureYears * 12;

    if (monthlyRate === 0 || months === 0) {
      const emi = months > 0 ? Math.round(effectiveAmount / months) : 0;
      return {
        monthlyEmi: emi,
        totalInterest: 0,
        totalPayment: effectiveAmount
      };
    }
    const emi = (effectiveAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = Math.max(0, totalAmount - effectiveAmount);
    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalAmount)
    };
  };

  // Calculate SIP
  const calculateSIP = () => {
    const i = expectedReturn / 12 / 100;
    const n = investYears * 12;
    const investedAmount = monthlyInvest * n;
    const maturityValue = monthlyInvest * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const estimatedReturns = maturityValue - investedAmount;
    return {
      investedAmount: Math.round(investedAmount),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(maturityValue)
    };
  };

  const emiResult = calculateEMI();
  const sipResult = calculateSIP();

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Planning Utilities</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Estimate Your Financial Commitments
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Use these illustrative tools to evaluate borrowing or planning scenarios before formal discussions.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 mb-8">
          <button
            onClick={() => setCalcType('emi')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              calcType === 'emi' ? 'bg-brand-forest text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Loan EMI Estimator
          </button>
          <button
            onClick={() => setCalcType('sip')}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              calcType === 'sip' ? 'bg-brand-forest text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Disciplined Savings Estimator
          </button>
        </div>

        {calcType === 'emi' ? (
          /* EMI Calculator Card */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-7 sm:p-10 rounded-3xl border border-slate-200/80">
            <div className="lg:col-span-7 space-y-6">
              
              {/* Loan Amount: Slider (Step: ₹1) + Synchronized Manual Input */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label htmlFor="loan-amount-manual-input" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                      Loan Amount
                    </label>
                    <span className="text-[11px] text-slate-400">Exact ₹1 precision</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`flex items-center rounded-xl border bg-white px-3 py-1.5 shadow-sm transition-all ${
                      loanAmountError 
                        ? 'border-red-400 ring-2 ring-red-100' 
                        : 'border-slate-300 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20'
                    }`}>
                      <span className="text-brand-forest font-bold text-sm sm:text-base mr-1">₹</span>
                      <input
                        id="loan-amount-manual-input"
                        type="text"
                        inputMode="numeric"
                        value={loanAmountInput}
                        onChange={handleLoanAmountChange}
                        onBlur={handleLoanAmountBlur}
                        className="w-32 sm:w-40 text-right font-extrabold text-brand-forest focus:outline-none text-sm sm:text-base bg-transparent tracking-tight"
                        aria-label="Loan Amount in Rupees"
                        placeholder="25,00,000"
                      />
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min={MIN_LOAN_AMOUNT}
                  max={MAX_LOAN_AMOUNT}
                  step={1}
                  value={Math.min(MAX_LOAN_AMOUNT, Math.max(MIN_LOAN_AMOUNT, loanAmount))}
                  onChange={handleLoanAmountSlider}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  aria-label="Loan amount slider in single rupee increments"
                />

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Min: ₹1,00,000</span>
                  {loanAmountError ? (
                    <span className="text-red-600 font-semibold text-[11px] bg-red-50 px-2 py-0.5 rounded">
                      {loanAmountError}
                    </span>
                  ) : (
                    <span className="text-slate-500 font-medium">₹{loanAmount.toLocaleString('en-IN')}</span>
                  )}
                  <span className="text-slate-400">Max: ₹2,00,00,000</span>
                </div>
              </div>

              {/* Interest Rate: Slider (Step: 0.01%) + Synchronized Manual Input */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label htmlFor="interest-rate-manual-input" className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                      Illustrative Interest Rate (% p.a.)
                    </label>
                    <span className="text-[11px] text-slate-400">Exact 0.01% precision</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`flex items-center rounded-xl border bg-white px-3 py-1.5 shadow-sm transition-all ${
                      interestRateError 
                        ? 'border-red-400 ring-2 ring-red-100' 
                        : 'border-slate-300 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20'
                    }`}>
                      <input
                        id="interest-rate-manual-input"
                        type="text"
                        inputMode="decimal"
                        value={interestRateInput}
                        onChange={handleInterestRateChange}
                        onBlur={handleInterestRateBlur}
                        className="w-20 text-right font-extrabold text-brand-forest focus:outline-none text-sm sm:text-base bg-transparent tracking-tight"
                        aria-label="Interest rate percentage"
                        placeholder="8.50"
                      />
                      <span className="text-brand-forest font-bold text-sm sm:text-base ml-1">%</span>
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min={MIN_INTEREST_RATE}
                  max={MAX_INTEREST_RATE}
                  step={0.01}
                  value={Math.min(MAX_INTEREST_RATE, Math.max(MIN_INTEREST_RATE, interestRate))}
                  onChange={handleInterestRateSlider}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  aria-label="Interest rate slider in 0.01% increments"
                />

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Min: 6.00%</span>
                  {interestRateError ? (
                    <span className="text-red-600 font-semibold text-[11px] bg-red-50 px-2 py-0.5 rounded">
                      {interestRateError}
                    </span>
                  ) : (
                    <span className="text-slate-500 font-medium">{interestRate.toFixed(2)}%</span>
                  )}
                  <span className="text-slate-400">Max: 20.00%</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Loan Tenure (Years)</label>
                  <span className="text-base font-bold text-brand-forest">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Monthly EMI</span>
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">
                  ₹{emiResult.monthlyEmi.toLocaleString('en-IN')}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Principal Amount</span>
                    <span className="font-semibold text-slate-900">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Interest Payable</span>
                    <span className="font-semibold text-slate-900">₹{emiResult.totalInterest.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Total Payment (Principal + Interest)</span>
                    <span className="font-semibold text-brand-forest">₹{emiResult.totalPayment.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-2 border-t border-slate-100">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Calculations are illustrative only. Exact EMI depends on lender terms, processing fees, and credit profile.</span>
              </div>
            </div>
          </div>
        ) : (
          /* SIP / Disciplined Savings Calculator */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-7 sm:p-10 rounded-3xl border border-slate-200/80">
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Monthly Planned Contribution</label>
                  <span className="text-base font-bold text-brand-forest">₹{monthlyInvest.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={200000}
                  step={1000}
                  value={monthlyInvest}
                  onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹1,000</span>
                  <span>₹2 Lakh</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Illustrative Annual Rate (% p.a.)</label>
                  <span className="text-base font-bold text-brand-forest">{expectedReturn}%</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={18}
                  step={0.5}
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>4%</span>
                  <span>18%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Investment Horizon (Years)</label>
                  <span className="text-base font-bold text-brand-forest">{investYears} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={investYears}
                  onChange={(e) => setInvestYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Projected Maturity Value</span>
                <p className="text-3xl sm:text-4xl font-extrabold text-brand-forest mt-1">
                  ₹{sipResult.totalValue.toLocaleString('en-IN')}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Invested Capital</span>
                    <span className="font-semibold text-slate-900">₹{sipResult.investedAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimated Potential Growth</span>
                    <span className="font-semibold text-emerald-600">₹{sipResult.estimatedReturns.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-2 border-t border-slate-100">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
                <span>Simulations are for educational illustration only and do not constitute a promise or guarantee of returns. Investments are subject to market risks.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
