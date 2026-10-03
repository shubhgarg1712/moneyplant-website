import React, { useState, useMemo } from 'react';
import { RotateCcw, Info, TrendingUp, Zap, Clock } from 'lucide-react';
import { FinancialInput } from './FinancialInput';
import { AreaTrendChart } from './CalculatorGraphs';
import { formatINR, formatPercent, formatYears } from '../../utils/formatters';

const DEFAULTS = {
  loanBalance: 4000000,
  interestRate: 8.5,
  remainingTenure: 20,
  extraMonthlyRepayment: 5000,
};

export const ExtraRepaymentCalculator: React.FC = () => {
  const [loanBalance, setLoanBalance] = useState<number>(DEFAULTS.loanBalance);
  const [interestRate, setInterestRate] = useState<number>(DEFAULTS.interestRate);
  const [remainingTenure, setRemainingTenure] = useState<number>(DEFAULTS.remainingTenure);
  const [extraMonthlyRepayment, setExtraMonthlyRepayment] = useState<number>(DEFAULTS.extraMonthlyRepayment);

  const handleReset = () => {
    setLoanBalance(DEFAULTS.loanBalance);
    setInterestRate(DEFAULTS.interestRate);
    setRemainingTenure(DEFAULTS.remainingTenure);
    setExtraMonthlyRepayment(DEFAULTS.extraMonthlyRepayment);
  };

  const {
    baseEmi,
    originalInterest,
    newInterest,
    interestSaved,
    newPayoffMonths,
    monthsSaved,
    chartData,
  } = useMemo(() => {
    const P = Math.max(0, loanBalance);
    const r = (interestRate / 12) / 100;
    const origMonths = Math.max(1, remainingTenure * 12);

    let emi = 0;
    if (r === 0) {
      emi = Math.round(P / origMonths);
    } else {
      const pow = Math.pow(1 + r, origMonths);
      emi = Math.round((P * r * pow) / (pow - 1));
    }

    const origTotInterest = Math.max(0, Math.round(emi * origMonths - P));

    // Accelerated Schedule with extra payment
    let acceleratedBalance = P;
    let acceleratedInterest = 0;
    let monthsElapsed = 0;
    const acceleratedPayment = emi + extraMonthlyRepayment;

    const maxSimMonths = origMonths + 12;
    while (acceleratedBalance > 0 && monthsElapsed < maxSimMonths) {
      monthsElapsed++;
      const interestMonth = acceleratedBalance * r;
      acceleratedInterest += interestMonth;
      const principalMonth = Math.min(acceleratedBalance, acceleratedPayment - interestMonth);
      acceleratedBalance = Math.max(0, acceleratedBalance - principalMonth);
    }

    const savedInterest = Math.max(0, origTotInterest - Math.round(acceleratedInterest));
    const savedTimeMonths = Math.max(0, origMonths - monthsElapsed);

    // Build timeline for chart
    const trend: { label: string; series1: number; series2: number }[] = [];
    let simBalStandard = P;
    let simBalExtra = P;

    trend.push({
      label: 'Yr 0',
      series1: P,
      series2: P,
    });

    const stepYears = Math.max(1, Math.floor(remainingTenure / 6));
    for (let yr = 1; yr <= remainingTenure; yr++) {
      for (let m = 0; m < 12; m++) {
        // Standard
        if (simBalStandard > 0) {
          const intStd = simBalStandard * r;
          const prinStd = Math.min(simBalStandard, emi - intStd);
          simBalStandard = Math.max(0, simBalStandard - prinStd);
        }
        // Extra
        if (simBalExtra > 0) {
          const intExt = simBalExtra * r;
          const prinExt = Math.min(simBalExtra, acceleratedPayment - intExt);
          simBalExtra = Math.max(0, simBalExtra - prinExt);
        }
      }

      if (yr % stepYears === 0 || yr === remainingTenure) {
        trend.push({
          label: `Yr ${yr}`,
          series1: Math.round(simBalStandard), // Without Extra
          series2: Math.round(simBalExtra), // With Extra
        });
      }
    }

    return {
      baseEmi: emi,
      originalInterest: origTotInterest,
      newInterest: Math.round(acceleratedInterest),
      interestSaved: savedInterest,
      newPayoffMonths: monthsElapsed,
      monthsSaved: savedTimeMonths,
      chartData: trend,
    };
  }, [loanBalance, interestRate, remainingTenure, extraMonthlyRepayment]);

  const formatMonthsToYearsStr = (totalMonths: number): string => {
    const y = Math.floor(totalMonths / 12);
    const m = totalMonths % 12;
    if (y === 0) return `${m} months`;
    if (m === 0) return `${y} years`;
    return `${y} yrs ${m} mos`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
      {/* LEFT COLUMN: YOUR FIGURES */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Figures
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Existing mortgage details & prepayments</p>
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
          label="Current Loan Balance"
          sublabel="Outstanding principal remaining"
          value={loanBalance}
          min={100000}
          max={20000000}
          step={10000}
          prefix="₹"
          isCurrency
          onChange={setLoanBalance}
        />

        <FinancialInput
          label="Interest Rate"
          sublabel="Current annual mortgage rate"
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
          label="Remaining Loan Tenure"
          sublabel="Scheduled repayment horizon"
          value={remainingTenure}
          min={1}
          max={30}
          step={1}
          suffix="years"
          onChange={setRemainingTenure}
        />

        {/* Informational baseline EMI */}
        <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Current Monthly Base EMI</span>
          <span className="font-bold text-slate-900">{formatINR(baseEmi)}</span>
        </div>

        {/* Extra Prepayment Input */}
        <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
          <FinancialInput
            label="Extra Monthly Repayment"
            sublabel="Additional principal prepayments"
            value={extraMonthlyRepayment}
            min={0}
            max={100000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setExtraMonthlyRepayment}
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
              <Zap className="w-3 h-3 text-amber-500" />
              Mortgage Prepayment Impact
            </span>
          </div>

          {/* Primary Highlight Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-5 rounded-2xl border border-emerald-200/80 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Total Interest Saved
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
                {formatINR(interestSaved)}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Adding {formatINR(extraMonthlyRepayment)}/month pays off your home{' '}
              <strong className="text-brand-forest">{formatMonthsToYearsStr(monthsSaved)} earlier</strong>.
            </p>
          </div>

          {/* Payoff Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">New Payoff Horizon</span>
                <Clock className="w-3.5 h-3.5 text-brand-forest" />
              </div>
              <span className="text-base font-extrabold text-brand-forest mt-1 block">
                {formatMonthsToYearsStr(newPayoffMonths)}
              </span>
              <span className="text-[10px] text-slate-400">
                Reduced from {formatYears(remainingTenure)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">Revised Total Interest</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-1.5 py-0.2 rounded">
                  Reduced
                </span>
              </div>
              <span className="text-base font-extrabold text-slate-900 mt-1 block">
                {formatINR(newInterest)}
              </span>
              <span className="text-[10px] text-slate-400">
                Was {formatINR(originalInterest)}
              </span>
            </div>
          </div>

          {/* Live Payoff Trajectory Graph */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Loan Balance Amortization Trajectory Over Time
            </h4>
            <AreaTrendChart
              data={chartData}
              series1Name="Standard Schedule"
              series2Name="With Extra Repayments"
              series1Color="#94A3B8"
              series2Color="#10B981"
            />
          </div>
        </div>

        <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-3 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          <span>
            Floating rate home loans in India have zero prepayment penalties under RBI rules. Accelerating payments directly decreases compounding principal.
          </span>
        </div>
      </div>
    </div>
  );
};
