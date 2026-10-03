import React, { useState, useMemo } from 'react';
import { RotateCcw, Info, TrendingUp } from 'lucide-react';
import { FinancialInput } from './FinancialInput';
import { AreaTrendChart, BreakdownBarChart } from './CalculatorGraphs';
import { formatINR, formatPercent, formatYears } from '../../utils/formatters';

const DEFAULTS = {
  loanAmount: 2500000,
  interestRate: 8.5,
  tenureYears: 20,
};

export const LoanEmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(DEFAULTS.loanAmount);
  const [interestRate, setInterestRate] = useState<number>(DEFAULTS.interestRate);
  const [tenureYears, setTenureYears] = useState<number>(DEFAULTS.tenureYears);

  const handleReset = () => {
    setLoanAmount(DEFAULTS.loanAmount);
    setInterestRate(DEFAULTS.interestRate);
    setTenureYears(DEFAULTS.tenureYears);
  };

  // Calculation Engine
  const { emi, totalInterest, totalPayment, chartData } = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const r = (interestRate / 12) / 100;
    const n = Math.max(1, Math.round(tenureYears * 12));

    let monthlyEmi = 0;
    let totPayment = P;
    let totInterest = 0;

    if (r === 0) {
      monthlyEmi = Math.round(P / n);
      totPayment = P;
      totInterest = 0;
    } else {
      const pow = Math.pow(1 + r, n);
      monthlyEmi = Math.round((P * r * pow) / (pow - 1));
      totPayment = Math.round(monthlyEmi * n);
      totInterest = Math.max(0, totPayment - P);
    }

    // Generate year-by-year amortization trend for graph
    const trend: { label: string; series1: number; series2: number }[] = [];
    let currentBalance = P;
    let cumulativeInterest = 0;

    trend.push({
      label: 'Yr 0',
      series1: P,
      series2: 0,
    });

    const stepYears = Math.max(1, Math.floor(tenureYears / 6));
    for (let yr = 1; yr <= tenureYears; yr++) {
      for (let m = 0; m < 12; m++) {
        if (currentBalance <= 0) break;
        const interestForMonth = currentBalance * r;
        const principalForMonth = Math.min(currentBalance, monthlyEmi - interestForMonth);
        cumulativeInterest += interestForMonth;
        currentBalance = Math.max(0, currentBalance - principalForMonth);
      }

      if (yr % stepYears === 0 || yr === tenureYears) {
        trend.push({
          label: `Yr ${yr}`,
          series1: Math.round(currentBalance), // Remaining Loan Balance
          series2: Math.round(cumulativeInterest), // Cumulative Interest
        });
      }
    }

    return {
      emi: monthlyEmi,
      totalInterest: totInterest,
      totalPayment: totPayment,
      chartData: trend,
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
      {/* LEFT COLUMN: YOUR FIGURES */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Figures
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Customize your borrowing parameters</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-forest px-2.5 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
            title="Reset to default figures"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Loan Amount */}
        <FinancialInput
          label="Loan Amount"
          sublabel="Principal borrowing amount"
          value={loanAmount}
          min={100000}
          max={20000000}
          step={10000}
          prefix="₹"
          isCurrency
          onChange={setLoanAmount}
        />

        {/* Interest Rate */}
        <FinancialInput
          label="Interest Rate"
          sublabel="Illustrative annual percentage rate"
          value={interestRate}
          min={6.0}
          max={20.0}
          step={0.05}
          suffix="%"
          isPercentage
          decimalPlaces={2}
          onChange={setInterestRate}
        />

        {/* Loan Tenure */}
        <FinancialInput
          label="Loan Tenure"
          sublabel="Repayment horizon in years"
          value={tenureYears}
          min={1}
          max={30}
          step={1}
          suffix="years"
          onChange={setTenureYears}
        />
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
              Live Simulation
            </span>
          </div>

          {/* Primary Metric Banner */}
          <div className="bg-gradient-to-br from-emerald-50/80 to-slate-50 p-5 rounded-2xl border border-emerald-100/80 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Estimated Monthly EMI
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
                {formatINR(emi)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Based on {formatYears(tenureYears)} tenure at {formatPercent(interestRate)} per annum.
            </p>
          </div>

          {/* Summary Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Principal Borrowed</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(loanAmount)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Interest</span>
              <span className="text-base font-extrabold text-emerald-700 mt-0.5 block">
                {formatINR(totalInterest)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Payment</span>
              <span className="text-base font-extrabold text-brand-forest mt-0.5 block">
                {formatINR(totalPayment)}
              </span>
            </div>
          </div>

          {/* Live Graph Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Principal Balance vs Cumulative Interest Over Time
            </h4>
            <AreaTrendChart
              data={chartData}
              series1Name="Remaining Balance"
              series2Name="Cumulative Interest"
              series1Color="#0284C7"
              series2Color="#10B981"
            />
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-3 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          <span>
            Simulations are illustrative only. Final terms, interest rates, and loan sanctions depend on underwriting and lender guidelines.
          </span>
        </div>
      </div>
    </div>
  );
};
