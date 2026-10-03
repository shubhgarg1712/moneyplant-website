import React, { useState, useMemo } from 'react';
import { RotateCcw, Info, TrendingUp, CreditCard, ShieldCheck } from 'lucide-react';
import { FinancialInput } from './FinancialInput';
import { AreaTrendChart } from './CalculatorGraphs';
import { formatINR, formatPercent } from '../../utils/formatters';

const DEFAULTS = {
  outstandingBalance: 100000,
  annualInterestRate: 36.0,
  minimumPaymentPercent: 5.0,
  minimumPaymentFloor: 500,
  additionalMonthlyPayment: 2000,
};

export const CreditCardCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(DEFAULTS.outstandingBalance);
  const [annualRate, setAnnualRate] = useState<number>(DEFAULTS.annualInterestRate);
  const [minPayPct, setMinPayPct] = useState<number>(DEFAULTS.minimumPaymentPercent);
  const [minPayFloor, setMinPayFloor] = useState<number>(DEFAULTS.minimumPaymentFloor);
  const [extraPayment, setExtraPayment] = useState<number>(DEFAULTS.additionalMonthlyPayment);

  const handleReset = () => {
    setBalance(DEFAULTS.outstandingBalance);
    setAnnualRate(DEFAULTS.annualInterestRate);
    setMinPayPct(DEFAULTS.minimumPaymentPercent);
    setMinPayFloor(DEFAULTS.minimumPaymentFloor);
    setExtraPayment(DEFAULTS.additionalMonthlyPayment);
  };

  const {
    minOnlyMonths,
    minOnlyInterest,
    minOnlyTotal,
    accelMonths,
    accelInterest,
    accelTotal,
    interestSaved,
    monthsSaved,
    chartData,
  } = useMemo(() => {
    const B0 = Math.max(0, balance);
    const r = (annualRate / 12) / 100;
    const maxMonths = 360; // 30-year simulation cap

    // Scenario 1: Minimum payment only
    let balMin = B0;
    let totIntMin = 0;
    let mMin = 0;

    // Simulation array for trend chart
    const monthlyTraceMin: number[] = [B0];
    const monthlyTraceAccel: number[] = [B0];

    while (balMin > 1 && mMin < maxMonths) {
      mMin++;
      const interest = balMin * r;
      totIntMin += interest;
      const minDue = Math.max(minPayFloor, (balMin * minPayPct) / 100);
      const payment = Math.min(balMin + interest, Math.max(minDue, interest + 50));
      const principalPaid = payment - interest;
      balMin = Math.max(0, balMin - principalPaid);
      monthlyTraceMin.push(Math.round(balMin));
    }

    // Scenario 2: With additional payment
    let balAccel = B0;
    let totIntAccel = 0;
    let mAccel = 0;

    while (balAccel > 1 && mAccel < maxMonths) {
      mAccel++;
      const interest = balAccel * r;
      totIntAccel += interest;
      const minDue = Math.max(minPayFloor, (balAccel * minPayPct) / 100);
      const payment = Math.min(balAccel + interest, minDue + extraPayment);
      const principalPaid = payment - interest;
      balAccel = Math.max(0, balAccel - principalPaid);
      monthlyTraceAccel.push(Math.round(balAccel));
    }

    // Map monthly traces into sample chart data points (approx 8 intervals)
    const totalSimMonths = Math.min(mMin, 72); // Display up to 6 years or payoff
    const stepMonths = Math.max(1, Math.floor(totalSimMonths / 6));
    const trend: { label: string; series1: number; series2: number }[] = [];

    for (let m = 0; m <= totalSimMonths; m += stepMonths) {
      const bMin = m < monthlyTraceMin.length ? monthlyTraceMin[m] : 0;
      const bAcc = m < monthlyTraceAccel.length ? monthlyTraceAccel[m] : 0;
      const yrLabel = m === 0 ? 'M 0' : m >= 12 ? `Yr ${(m / 12).toFixed(1)}` : `M ${m}`;
      trend.push({
        label: yrLabel,
        series1: bMin,
        series2: bAcc,
      });
    }

    return {
      minOnlyMonths: mMin,
      minOnlyInterest: Math.round(totIntMin),
      minOnlyTotal: Math.round(B0 + totIntMin),
      accelMonths: mAccel,
      accelInterest: Math.round(totIntAccel),
      accelTotal: Math.round(B0 + totIntAccel),
      interestSaved: Math.max(0, Math.round(totIntMin - totIntAccel)),
      monthsSaved: Math.max(0, mMin - mAccel),
      chartData: trend,
    };
  }, [balance, annualRate, minPayPct, minPayFloor, extraPayment]);

  const formatMonthsDuration = (m: number): string => {
    if (m >= 360) return '30+ years';
    const y = Math.floor(m / 12);
    const remM = m % 12;
    if (y === 0) return `${remM} months`;
    if (remM === 0) return `${y} years`;
    return `${y} yrs ${remM} mos`;
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
            <p className="text-xs text-slate-400 mt-0.5">Credit card revolving balances & payments</p>
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
          label="Outstanding Card Balance"
          sublabel="Current total bill amount"
          value={balance}
          min={5000}
          max={1000000}
          step={1000}
          prefix="₹"
          isCurrency
          onChange={setBalance}
        />

        <FinancialInput
          label="Annual Percentage Rate (APR)"
          sublabel="Card revolving finance charge (% p.a.)"
          value={annualRate}
          min={12.0}
          max={48.0}
          step={0.5}
          suffix="%"
          isPercentage
          decimalPlaces={1}
          onChange={setAnnualRate}
        />

        <FinancialInput
          label="Minimum Due Percentage"
          sublabel="Bank prescribed minimum due (typically 5%)"
          value={minPayPct}
          min={2.0}
          max={10.0}
          step={0.5}
          suffix="%"
          isPercentage
          decimalPlaces={1}
          onChange={setMinPayPct}
        />

        <FinancialInput
          label="Minimum Due Floor"
          sublabel="Minimum threshold amount"
          value={minPayFloor}
          min={100}
          max={5000}
          step={50}
          prefix="₹"
          isCurrency
          onChange={setMinPayFloor}
        />

        <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
          <FinancialInput
            label="Additional Monthly Payment"
            sublabel="Extra amount above the minimum"
            value={extraPayment}
            min={0}
            max={50000}
            step={250}
            prefix="₹"
            isCurrency
            onChange={setExtraPayment}
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
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Debt Freedom Strategy
            </span>
          </div>

          {/* Primary Highlight Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-5 rounded-2xl border border-emerald-200/80 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Finance Charges Saved
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
                {formatINR(interestSaved)}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Paying an extra {formatINR(extraPayment)}/mo clears your balance{' '}
              <strong className="text-brand-forest">{formatMonthsDuration(monthsSaved)} faster</strong>.
            </p>
          </div>

          {/* Direct Comparative Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Paying Minimum Only
              </span>
              <div className="mt-1">
                <span className="text-xs text-slate-500">Payoff Duration:</span>
                <span className="text-sm font-bold text-slate-900 ml-1">
                  {formatMonthsDuration(minOnlyMonths)}
                </span>
              </div>
              <div className="mt-0.5">
                <span className="text-xs text-slate-500">Total Finance Interest:</span>
                <span className="text-sm font-bold text-amber-700 ml-1">
                  {formatINR(minOnlyInterest)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
              <span className="text-[11px] font-bold text-brand-forest uppercase tracking-wider block">
                With Extra {formatINR(extraPayment)}/mo
              </span>
              <div className="mt-1">
                <span className="text-xs text-slate-600">Payoff Duration:</span>
                <span className="text-sm font-bold text-brand-forest ml-1">
                  {formatMonthsDuration(accelMonths)}
                </span>
              </div>
              <div className="mt-0.5">
                <span className="text-xs text-slate-600">Total Finance Interest:</span>
                <span className="text-sm font-bold text-brand-forest ml-1">
                  {formatINR(accelInterest)}
                </span>
              </div>
            </div>
          </div>

          {/* Live Payoff Graph */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Outstanding Debt Reduction Curve Over Time
            </h4>
            <AreaTrendChart
              data={chartData}
              series1Name="Minimum Due Only"
              series2Name="With Additional Payment"
              series1Color="#EF4444"
              series2Color="#10B981"
            />
          </div>
        </div>

        <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-3 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          <span>
            Credit card revolving interest compounds monthly at steep annual rates (often 36%–42% p.a.). Fixed principal prepayments avoid perpetual debt cycles.
          </span>
        </div>
      </div>
    </div>
  );
};
