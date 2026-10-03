import React, { useState, useMemo } from 'react';
import { RotateCcw, Info, TrendingUp, DollarSign } from 'lucide-react';
import { FinancialInput } from './FinancialInput';
import { BreakdownBarChart, BreakdownItem } from './CalculatorGraphs';
import { formatINR, formatPercent, formatYears } from '../../utils/formatters';

const DEFAULTS = {
  loanAmount: 3000000,
  interestRate: 8.5,
  loanTenure: 20,
  processingFee: 15000,
  otherCharges: 5000,
  additionalCosts: 10000,
};

export const LoanCostCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(DEFAULTS.loanAmount);
  const [interestRate, setInterestRate] = useState<number>(DEFAULTS.interestRate);
  const [loanTenure, setLoanTenure] = useState<number>(DEFAULTS.loanTenure);
  const [processingFee, setProcessingFee] = useState<number>(DEFAULTS.processingFee);
  const [otherCharges, setOtherCharges] = useState<number>(DEFAULTS.otherCharges);
  const [additionalCosts, setAdditionalCosts] = useState<number>(DEFAULTS.additionalCosts);

  const handleReset = () => {
    setLoanAmount(DEFAULTS.loanAmount);
    setInterestRate(DEFAULTS.interestRate);
    setLoanTenure(DEFAULTS.loanTenure);
    setProcessingFee(DEFAULTS.processingFee);
    setOtherCharges(DEFAULTS.otherCharges);
    setAdditionalCosts(DEFAULTS.additionalCosts);
  };

  const {
    monthlyEmi,
    totalInterest,
    totalFees,
    totalLoanCost,
    breakdownItems,
    feeRatio,
  } = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const r = (interestRate / 12) / 100;
    const n = Math.max(1, loanTenure * 12);

    let emi = 0;
    let totInterest = 0;

    if (r === 0) {
      emi = Math.round(P / n);
      totInterest = 0;
    } else {
      const pow = Math.pow(1 + r, n);
      emi = Math.round((P * r * pow) / (pow - 1));
      totInterest = Math.max(0, Math.round(emi * n - P));
    }

    const fees = processingFee + otherCharges + additionalCosts;
    const totalCost = P + totInterest + fees;

    const items: BreakdownItem[] = [
      { label: 'Principal Borrowed', amount: P, color: '#1E3F0A' },
      { label: 'Cumulative Interest', amount: totInterest, color: '#10B981' },
      { label: 'Processing & Mandatory Fees', amount: fees, color: '#F59E0B' },
    ];

    return {
      monthlyEmi: emi,
      totalInterest: totInterest,
      totalFees: fees,
      totalLoanCost: totalCost,
      breakdownItems: items,
      feeRatio: P > 0 ? (fees / P) * 100 : 0,
    };
  }, [loanAmount, interestRate, loanTenure, processingFee, otherCharges, additionalCosts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
      {/* LEFT COLUMN: YOUR FIGURES */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Figures
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Loan parameters plus upfront & ongoing fees</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-forest px-2.5 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <FinancialInput
          label="Loan Principal"
          sublabel="Net amount financed"
          value={loanAmount}
          min={100000}
          max={20000000}
          step={10000}
          prefix="₹"
          isCurrency
          onChange={setLoanAmount}
        />

        <FinancialInput
          label="Interest Rate"
          sublabel="Annual interest rate"
          value={interestRate}
          min={6.0}
          max={20.0}
          step={0.05}
          suffix="%"
          isPercentage
          decimalPlaces={2}
          onChange={setInterestRate}
        />

        <FinancialInput
          label="Loan Tenure"
          sublabel="Financing duration in years"
          value={loanTenure}
          min={1}
          max={30}
          step={1}
          suffix="years"
          onChange={setLoanTenure}
        />

        <div className="pt-2 border-t border-slate-200/60 space-y-4">
          <FinancialInput
            label="Lender Processing Fee"
            sublabel="Upfront administrative processing"
            value={processingFee}
            min={0}
            max={150000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setProcessingFee}
          />

          <FinancialInput
            label="Documentation & Verification"
            sublabel="Legal, valuation, technical inspection"
            value={otherCharges}
            min={0}
            max={100000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setOtherCharges}
          />

          <FinancialInput
            label="Insurance & Incidental Costs"
            sublabel="Loan protection & administrative costs"
            value={additionalCosts}
            min={0}
            max={100000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setAdditionalCosts}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: FINANCIAL PROJECTION */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Financial Projection
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-forest bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              Comprehensive Cost Analysis
            </span>
          </div>

          {/* Primary Metric Banner */}
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-5 rounded-2xl border border-emerald-100 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Total True Cost of Loan
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
                {formatINR(totalLoanCost)}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Represents ₹{monthlyEmi.toLocaleString('en-IN')}/mo EMI over {formatYears(loanTenure)} plus {formatINR(totalFees)} all-in upfront fees.
            </p>
          </div>

          {/* Detailed Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Monthly Repayment</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(monthlyEmi)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Interest</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(totalInterest)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">All-in Fees & Charges</span>
              <span className="text-base font-extrabold text-amber-700 mt-0.5 block">
                {formatINR(totalFees)}
              </span>
            </div>
          </div>

          {/* Live Proportion Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Principal vs Interest vs Ancillary Fees Share
            </h4>
            <BreakdownBarChart items={breakdownItems} />
          </div>
        </div>

        <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-3 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          <span>
            Upfront fees vary across banking institutions. Comparing the full cost of capital ensures an objective financial decision.
          </span>
        </div>
      </div>
    </div>
  );
};
