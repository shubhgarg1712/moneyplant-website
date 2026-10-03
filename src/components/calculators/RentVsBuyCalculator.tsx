import React, { useState, useMemo } from 'react';
import { RotateCcw, Info, TrendingUp, Home, CheckCircle2 } from 'lucide-react';
import { FinancialInput } from './FinancialInput';
import { AreaTrendChart } from './CalculatorGraphs';
import { formatINR, formatPercent, formatYears } from '../../utils/formatters';

const DEFAULTS = {
  monthlyRent: 25000,
  annualRentIncrease: 5.0,
  homePrice: 7000000,
  downPayment: 1400000,
  interestRate: 8.5,
  loanTerm: 20,
  annualPropertyCosts: 1.2,
  annualMaintenance: 0.5,
  holdingPeriod: 15,
  propertyAppreciation: 6.0,
};

export const RentVsBuyCalculator: React.FC = () => {
  const [monthlyRent, setMonthlyRent] = useState<number>(DEFAULTS.monthlyRent);
  const [annualRentIncrease, setAnnualRentIncrease] = useState<number>(DEFAULTS.annualRentIncrease);
  const [homePrice, setHomePrice] = useState<number>(DEFAULTS.homePrice);
  const [downPayment, setDownPayment] = useState<number>(DEFAULTS.downPayment);
  const [interestRate, setInterestRate] = useState<number>(DEFAULTS.interestRate);
  const [loanTerm, setLoanTerm] = useState<number>(DEFAULTS.loanTerm);
  const [annualPropertyCosts, setAnnualPropertyCosts] = useState<number>(DEFAULTS.annualPropertyCosts);
  const [annualMaintenance, setAnnualMaintenance] = useState<number>(DEFAULTS.annualMaintenance);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(DEFAULTS.holdingPeriod);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(DEFAULTS.propertyAppreciation);

  const handleReset = () => {
    setMonthlyRent(DEFAULTS.monthlyRent);
    setAnnualRentIncrease(DEFAULTS.annualRentIncrease);
    setHomePrice(DEFAULTS.homePrice);
    setDownPayment(DEFAULTS.downPayment);
    setInterestRate(DEFAULTS.interestRate);
    setLoanTerm(DEFAULTS.loanTerm);
    setAnnualPropertyCosts(DEFAULTS.annualPropertyCosts);
    setAnnualMaintenance(DEFAULTS.annualMaintenance);
    setHoldingPeriod(DEFAULTS.holdingPeriod);
    setPropertyAppreciation(DEFAULTS.propertyAppreciation);
  };

  const {
    totalRentPaid,
    totalBuyingPaid,
    estimatedHomeValue,
    netEquity,
    netCostBuying,
    buyerAdvantage,
    chartData,
  } = useMemo(() => {
    const loanAmount = Math.max(0, homePrice - downPayment);
    const r = (interestRate / 12) / 100;
    const loanMonths = Math.max(1, loanTerm * 12);

    let monthlyMortgage = 0;
    if (r === 0) {
      monthlyMortgage = loanAmount / loanMonths;
    } else {
      const pow = Math.pow(1 + r, loanMonths);
      monthlyMortgage = (loanAmount * r * pow) / (pow - 1);
    }

    const trend: { label: string; series1: number; series2: number }[] = [];
    let cumRent = 0;
    let cumBuyingOutflow = downPayment;
    let loanBalance = loanAmount;
    let currentRentMonthly = monthlyRent;

    trend.push({
      label: 'Yr 0',
      series1: 0,
      series2: Math.round(downPayment),
    });

    for (let yr = 1; yr <= holdingPeriod; yr++) {
      // Renting for the year
      const annualRentThisYear = currentRentMonthly * 12;
      cumRent += annualRentThisYear;
      currentRentMonthly *= 1 + annualRentIncrease / 100;

      // Buying costs for the year
      let mortgagePaidThisYear = 0;
      if (yr <= loanTerm) {
        for (let m = 0; m < 12; m++) {
          if (loanBalance <= 0) break;
          const interestMonth = loanBalance * r;
          const principalMonth = Math.min(loanBalance, monthlyMortgage - interestMonth);
          loanBalance = Math.max(0, loanBalance - principalMonth);
          mortgagePaidThisYear += monthlyMortgage;
        }
      }

      const propValueYr = homePrice * Math.pow(1 + propertyAppreciation / 100, yr);
      const taxesAndMaint = propValueYr * ((annualPropertyCosts + annualMaintenance) / 100);
      cumBuyingOutflow += mortgagePaidThisYear + taxesAndMaint;

      // Net cost of buying = Total Outflow - Net Home Equity
      const currentEquity = Math.max(0, propValueYr - loanBalance);
      const netBuyCost = Math.max(0, cumBuyingOutflow - currentEquity);

      trend.push({
        label: `Yr ${yr}`,
        series1: Math.round(cumRent), // Cumulative Rent Cost
        series2: Math.round(netBuyCost), // Net Cost of Buying
      });
    }

    const finalHomeValue = homePrice * Math.pow(1 + propertyAppreciation / 100, holdingPeriod);
    const finalEquity = Math.max(0, finalHomeValue - loanBalance);
    const finalNetBuyCost = Math.max(0, cumBuyingOutflow - finalEquity);
    const diff = cumRent - finalNetBuyCost;

    return {
      totalRentPaid: Math.round(cumRent),
      totalBuyingPaid: Math.round(cumBuyingOutflow),
      estimatedHomeValue: Math.round(finalHomeValue),
      netEquity: Math.round(finalEquity),
      netCostBuying: Math.round(finalNetBuyCost),
      buyerAdvantage: Math.round(diff),
      chartData: trend,
    };
  }, [
    monthlyRent,
    annualRentIncrease,
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    annualPropertyCosts,
    annualMaintenance,
    holdingPeriod,
    propertyAppreciation,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
      {/* LEFT COLUMN: YOUR FIGURES */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Figures
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Rental vs ownership financial variables</p>
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

        {/* Monthly Rent */}
        <FinancialInput
          label="Monthly Rent"
          sublabel="Current monthly rental commitment"
          value={monthlyRent}
          min={5000}
          max={200000}
          step={1000}
          prefix="₹"
          isCurrency
          onChange={setMonthlyRent}
        />

        {/* Annual Rent Increase */}
        <FinancialInput
          label="Annual Rent Increase"
          sublabel="Estimated annual escalation"
          value={annualRentIncrease}
          min={0}
          max={15}
          step={0.1}
          suffix="%"
          isPercentage
          decimalPlaces={1}
          onChange={setAnnualRentIncrease}
        />

        {/* Home Price */}
        <FinancialInput
          label="Home Purchase Price"
          sublabel="Target property acquisition cost"
          value={homePrice}
          min={1000000}
          max={50000000}
          step={50000}
          prefix="₹"
          isCurrency
          onChange={setHomePrice}
        />

        {/* Down Payment */}
        <FinancialInput
          label="Down Payment"
          sublabel="Initial upfront equity contribution"
          value={downPayment}
          min={200000}
          max={homePrice}
          step={25000}
          prefix="₹"
          isCurrency
          onChange={setDownPayment}
        />

        {/* Interest Rate */}
        <FinancialInput
          label="Loan Interest Rate"
          sublabel="Mortgage borrowing rate"
          value={interestRate}
          min={5.0}
          max={15.0}
          step={0.05}
          suffix="%"
          isPercentage
          decimalPlaces={2}
          onChange={setInterestRate}
        />

        {/* Loan Term */}
        <FinancialInput
          label="Loan Term"
          sublabel="Mortgage repayment period"
          value={loanTerm}
          min={5}
          max={30}
          step={1}
          suffix="years"
          onChange={setLoanTerm}
        />

        {/* Holding Period */}
        <FinancialInput
          label="Holding Period"
          sublabel="Duration of planned occupancy"
          value={holdingPeriod}
          min={1}
          max={30}
          step={1}
          suffix="years"
          onChange={setHoldingPeriod}
        />

        {/* Property Appreciation */}
        <FinancialInput
          label="Property Appreciation"
          sublabel="Estimated annual real estate growth"
          value={propertyAppreciation}
          min={0}
          max={15}
          step={0.1}
          suffix="%"
          isPercentage
          decimalPlaces={1}
          onChange={setPropertyAppreciation}
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
              Over {formatYears(holdingPeriod)}
            </span>
          </div>

          {/* Decision Outcome Banner */}
          <div
            className={`p-5 rounded-2xl border mb-6 ${
              buyerAdvantage >= 0
                ? 'bg-gradient-to-br from-emerald-50 to-slate-50 border-emerald-200/80'
                : 'bg-gradient-to-br from-amber-50 to-slate-50 border-amber-200/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                className={`w-4 h-4 ${
                  buyerAdvantage >= 0 ? 'text-brand-forest' : 'text-amber-600'
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {buyerAdvantage >= 0 ? 'Buying is Financially Favorable' : 'Renting is Financially Favorable'}
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {buyerAdvantage >= 0 ? 'Net Wealth Gain: ' : 'Net Rental Savings: '}
                <span className={buyerAdvantage >= 0 ? 'text-brand-forest' : 'text-amber-700'}>
                  {formatINR(Math.abs(buyerAdvantage))}
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Over {formatYears(holdingPeriod)}, buying yields net asset equity of {formatINR(netEquity)}, accounting for all outflows.
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Rent Paid</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(totalRentPaid)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Net Buying Cost</span>
              <span className="text-base font-extrabold text-brand-forest mt-0.5 block">
                {formatINR(netCostBuying)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Projected Property Value</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(estimatedHomeValue)}
              </span>
            </div>
          </div>

          {/* Live Comparison Graph */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Cumulative Cost of Renting vs Net Cost of Buying
            </h4>
            <AreaTrendChart
              data={chartData}
              series1Name="Cumulative Rent Cost"
              series2Name="Net Cost of Buying"
              series1Color="#F59E0B"
              series2Color="#10B981"
            />
          </div>
        </div>

        <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-3 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          <span>
            Model considers rent escalation, loan amortization, estimated maintenance, and capital appreciation. Taxation deductions and investment yields may alter personal results.
          </span>
        </div>
      </div>
    </div>
  );
};
