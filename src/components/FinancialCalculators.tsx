import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';

export const FinancialCalculators: React.FC = () => {
  const [calcType, setCalcType] = useState<'emi' | 'sip'>('emi');

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  // SIP Calculator State
  const [monthlyInvest, setMonthlyInvest] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [investYears, setInvestYears] = useState<number>(15);

  // Calculate EMI
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureYears * 12;
    if (monthlyRate === 0) {
      const emi = Math.round(loanAmount / months);
      return {
        monthlyEmi: emi,
        totalInterest: 0,
        totalPayment: loanAmount
      };
    }
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - loanAmount;
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
              
              {/* Loan Amount Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Loan Amount</label>
                  <span className="text-base font-bold text-brand-forest">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={20000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹2 Crore</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Illustrative Interest Rate (% p.a.)</label>
                  <span className="text-base font-bold text-brand-forest">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min={6}
                  max={20}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>6%</span>
                  <span>20%</span>
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
