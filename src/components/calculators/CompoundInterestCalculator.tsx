import React, { useState, useMemo } from 'react';
import { RotateCcw, Info, TrendingUp, Sparkles } from 'lucide-react';
import { FinancialInput } from './FinancialInput';
import { AreaTrendChart } from './CalculatorGraphs';
import { formatINR, formatPercent, formatYears } from '../../utils/formatters';

const DEFAULTS = {
  initialInvestment: 100000,
  monthlyContribution: 10000,
  annualRate: 12.0,
  investmentPeriod: 15,
  compoundingFrequency: 12, // Monthly
};

export const CompoundInterestCalculator: React.FC = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(DEFAULTS.initialInvestment);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(DEFAULTS.monthlyContribution);
  const [annualRate, setAnnualRate] = useState<number>(DEFAULTS.annualRate);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(DEFAULTS.investmentPeriod);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(DEFAULTS.compoundingFrequency);

  const handleReset = () => {
    setInitialInvestment(DEFAULTS.initialInvestment);
    setMonthlyContribution(DEFAULTS.monthlyContribution);
    setAnnualRate(DEFAULTS.annualRate);
    setInvestmentPeriod(DEFAULTS.investmentPeriod);
    setCompoundingFrequency(DEFAULTS.compoundingFrequency);
  };

  const {
    totalContributions,
    totalInterestEarned,
    futureValue,
    growthMultiple,
    chartData,
  } = useMemo(() => {
    const P0 = Math.max(0, initialInvestment);
    const PMT = Math.max(0, monthlyContribution);
    const r = annualRate / 100;
    const f = compoundingFrequency; // compound periods per year
    const years = Math.max(1, investmentPeriod);

    // Calculate month-by-month compound balance
    const trend: { label: string; series1: number; series2: number }[] = [];
    let currentBalance = P0;
    let cumulativeInvested = P0;

    trend.push({
      label: 'Yr 0',
      series1: Math.round(cumulativeInvested),
      series2: Math.round(currentBalance),
    });

    const stepYears = Math.max(1, Math.floor(years / 6));

    for (let yr = 1; yr <= years; yr++) {
      // 12 months in each year
      for (let m = 0; m < 12; m++) {
        // Effective monthly compounding factor aligned with nominal frequency
        const monthlyRate = Math.pow(1 + r / f, f / 12) - 1;
        currentBalance = currentBalance * (1 + monthlyRate) + PMT;
        cumulativeInvested += PMT;
      }

      if (yr % stepYears === 0 || yr === years) {
        trend.push({
          label: `Yr ${yr}`,
          series1: Math.round(cumulativeInvested), // Total Capital Invested
          series2: Math.round(currentBalance), // Estimated Future Value
        });
      }
    }

    const finalVal = Math.round(currentBalance);
    const totalContributed = Math.round(cumulativeInvested);
    const earnings = Math.max(0, finalVal - totalContributed);
    const mult = totalContributed > 0 ? (finalVal / totalContributed).toFixed(1) : '1.0';

    return {
      totalContributions: totalContributed,
      totalInterestEarned: earnings,
      futureValue: finalVal,
      growthMultiple: mult,
      chartData: trend,
    };
  }, [initialInvestment, monthlyContribution, annualRate, investmentPeriod, compoundingFrequency]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
      {/* LEFT COLUMN: YOUR FIGURES */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Figures
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Initial capital & disciplined periodic contributions</p>
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
          label="Initial Investment"
          sublabel="Starting principal corpus"
          value={initialInvestment}
          min={0}
          max={5000000}
          step={10000}
          prefix="₹"
          isCurrency
          onChange={setInitialInvestment}
        />

        <FinancialInput
          label="Monthly Contribution"
          sublabel="Regular monthly additions"
          value={monthlyContribution}
          min={0}
          max={500000}
          step={1000}
          prefix="₹"
          isCurrency
          onChange={setMonthlyContribution}
        />

        <FinancialInput
          label="Expected Annual Return"
          sublabel="Estimated compounded annualized yield"
          value={annualRate}
          min={1.0}
          max={30.0}
          step={0.1}
          suffix="%"
          isPercentage
          decimalPlaces={1}
          onChange={setAnnualRate}
        />

        <FinancialInput
          label="Investment Horizon"
          sublabel="Compounding tenure in years"
          value={investmentPeriod}
          min={1}
          max={40}
          step={1}
          suffix="years"
          onChange={setInvestmentPeriod}
        />

        {/* Compounding Frequency Dropdown */}
        <div className="space-y-1.5 pt-1">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Compounding Frequency
          </label>
          <select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest transition-colors"
          >
            <option value={12}>Compounded Monthly (Standard SIP / RD)</option>
            <option value={4}>Compounded Quarterly (Bank Fixed Deposits)</option>
            <option value={2}>Compounded Semi-Annually</option>
            <option value={1}>Compounded Annually</option>
          </select>
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
              <Sparkles className="w-3 h-3" />
              Power of Compounding
            </span>
          </div>

          {/* Primary Metric Banner */}
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-5 rounded-2xl border border-emerald-100 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Estimated Future Value
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
                {formatINR(futureValue)}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {growthMultiple}x Wealth Multiplier
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Accumulation over {formatYears(investmentPeriod)} at {formatPercent(annualRate, 1)} p.a.
            </p>
          </div>

          {/* Detailed Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Invested Capital</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(totalContributions)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Compounded Wealth Created</span>
              <span className="text-base font-extrabold text-brand-forest mt-0.5 block">
                {formatINR(totalInterestEarned)}
              </span>
            </div>
          </div>

          {/* Live Growth Curve Graph */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Principal Contributions vs Cumulative Portfolio Value
            </h4>
            <AreaTrendChart
              data={chartData}
              series1Name="Total Contributions"
              series2Name="Estimated Future Value"
              series1Color="#0284C7"
              series2Color="#10B981"
            />
          </div>
        </div>

        <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-3 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          <span>
            Projections assume a continuous annualized rate of return. Market investments fluctuate, and past performance does not guarantee future results.
          </span>
        </div>
      </div>
    </div>
  );
};
