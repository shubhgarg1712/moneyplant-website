import React, { useState, useMemo } from 'react';
import { RotateCcw, Info, TrendingUp, PieChart, CheckCircle2 } from 'lucide-react';
import { FinancialInput } from './FinancialInput';
import { BreakdownBarChart, BreakdownItem } from './CalculatorGraphs';
import { formatINR, formatPercent } from '../../utils/formatters';

const DEFAULTS = {
  monthlyIncome: 80000,
  housing: 20000,
  food: 12000,
  transport: 6000,
  utilities: 4000,
  insurance: 3000,
  emis: 10000,
  education: 5000,
  entertainment: 4000,
  other: 2000,
};

export const BudgetPlannerCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(DEFAULTS.monthlyIncome);
  const [housing, setHousing] = useState<number>(DEFAULTS.housing);
  const [food, setFood] = useState<number>(DEFAULTS.food);
  const [transport, setTransport] = useState<number>(DEFAULTS.transport);
  const [utilities, setUtilities] = useState<number>(DEFAULTS.utilities);
  const [insurance, setInsurance] = useState<number>(DEFAULTS.insurance);
  const [emis, setEmis] = useState<number>(DEFAULTS.emis);
  const [education, setEducation] = useState<number>(DEFAULTS.education);
  const [entertainment, setEntertainment] = useState<number>(DEFAULTS.entertainment);
  const [other, setOther] = useState<number>(DEFAULTS.other);

  const handleReset = () => {
    setIncome(DEFAULTS.monthlyIncome);
    setHousing(DEFAULTS.housing);
    setFood(DEFAULTS.food);
    setTransport(DEFAULTS.transport);
    setUtilities(DEFAULTS.utilities);
    setInsurance(DEFAULTS.insurance);
    setEmis(DEFAULTS.emis);
    setEducation(DEFAULTS.education);
    setEntertainment(DEFAULTS.entertainment);
    setOther(DEFAULTS.other);
  };

  const { totalExpenses, savings, savingsRate, breakdownItems, rule503020 } = useMemo(() => {
    const expenses =
      housing +
      food +
      transport +
      utilities +
      insurance +
      emis +
      education +
      entertainment +
      other;

    const netSavings = Math.max(0, income - expenses);
    const rate = income > 0 ? (netSavings / income) * 100 : 0;

    // 50/30/20 Rule:
    // Needs: Housing, Utilities, Food, Transport, Insurance
    // Wants: Entertainment, Other, partial discretionary
    // Debt & Savings: EMIs, Education, Net Savings
    const needs = housing + food + transport + utilities + insurance;
    const wants = entertainment + other;
    const debtsAndSavings = emis + education + netSavings;

    const items: BreakdownItem[] = [
      { label: 'Housing', amount: housing, color: '#1E3F0A' },
      { label: 'Food & Groceries', amount: food, color: '#10B981' },
      { label: 'Transport', amount: transport, color: '#0284C7' },
      { label: 'EMIs & Loans', amount: emis, color: '#DC2626' },
      { label: 'Utilities', amount: utilities, color: '#F59E0B' },
      { label: 'Insurance', amount: insurance, color: '#8B5CF6' },
      { label: 'Education', amount: education, color: '#06B6D4' },
      { label: 'Entertainment', amount: entertainment, color: '#EC4899' },
      { label: 'Other', amount: other, color: '#64748B' },
      { label: 'Monthly Surplus / Savings', amount: netSavings, color: '#059669' },
    ];

    return {
      totalExpenses: expenses,
      savings: netSavings,
      savingsRate: rate,
      breakdownItems: items.filter((i) => i.amount > 0),
      rule503020: {
        needsPct: income > 0 ? (needs / income) * 100 : 0,
        wantsPct: income > 0 ? (wants / income) * 100 : 0,
        savingsPct: income > 0 ? (debtsAndSavings / income) * 100 : 0,
      },
    };
  }, [income, housing, food, transport, utilities, insurance, emis, education, entertainment, other]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/80">
      {/* LEFT COLUMN: YOUR FIGURES */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Your Figures
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Input monthly earnings & itemized outlays</p>
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

        {/* Monthly Income */}
        <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
          <FinancialInput
            label="Monthly Take-Home Income"
            sublabel="Combined net household income"
            value={income}
            min={10000}
            max={1000000}
            step={1000}
            prefix="₹"
            isCurrency
            onChange={setIncome}
          />
        </div>

        {/* Expenses List */}
        <div className="space-y-4 pt-1">
          <FinancialInput
            label="Housing (Rent / Maintenance)"
            value={housing}
            min={0}
            max={300000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setHousing}
          />
          <FinancialInput
            label="Food & Groceries"
            value={food}
            min={0}
            max={150000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setFood}
          />
          <FinancialInput
            label="Transport & Fuel"
            value={transport}
            min={0}
            max={80000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setTransport}
          />
          <FinancialInput
            label="Utilities & Bills"
            value={utilities}
            min={0}
            max={50000}
            step={250}
            prefix="₹"
            isCurrency
            onChange={setUtilities}
          />
          <FinancialInput
            label="Insurance Premiums"
            value={insurance}
            min={0}
            max={80000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setInsurance}
          />
          <FinancialInput
            label="Loan EMIs & Debt"
            value={emis}
            min={0}
            max={300000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setEmis}
          />
          <FinancialInput
            label="Education & Children"
            value={education}
            min={0}
            max={150000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setEducation}
          />
          <FinancialInput
            label="Entertainment & Dining"
            value={entertainment}
            min={0}
            max={100000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setEntertainment}
          />
          <FinancialInput
            label="Miscellaneous Other"
            value={other}
            min={0}
            max={100000}
            step={500}
            prefix="₹"
            isCurrency
            onChange={setOther}
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
              <PieChart className="w-3 h-3" />
              Cash Flow Health
            </span>
          </div>

          {/* Primary Metric Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-5 rounded-2xl border border-emerald-100 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Estimated Monthly Savings Surplus
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-brand-forest tracking-tight">
                {formatINR(savings)}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                {formatPercent(savingsRate, 1)} savings rate
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Monthly outgoings are {formatINR(totalExpenses)} against {formatINR(income)} net income.
            </p>
          </div>

          {/* Summary Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Income</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(income)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Expenses</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                {formatINR(totalExpenses)}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[11px] font-semibold text-slate-500 block">Annual Potential Savings</span>
              <span className="text-base font-extrabold text-brand-forest mt-0.5 block">
                {formatINR(savings * 12)}
              </span>
            </div>
          </div>

          {/* 50/30/20 Guideline Benchmarking */}
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 mb-6">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-700 block mb-2">
              50 / 30 / 20 Budget Guideline Benchmark
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-white rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-400 block font-semibold">Needs (Target 50%)</span>
                <span className="text-sm font-extrabold text-slate-800">{rule503020.needsPct.toFixed(1)}%</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-400 block font-semibold">Wants (Target 30%)</span>
                <span className="text-sm font-extrabold text-slate-800">{rule503020.wantsPct.toFixed(1)}%</span>
              </div>
              <div className="p-2 bg-white rounded-xl border border-slate-200/60">
                <span className="text-[10px] text-slate-400 block font-semibold">Savings/Debt (Target 20%)</span>
                <span className="text-sm font-extrabold text-brand-forest">{rule503020.savingsPct.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Visual Category Breakdown Graph */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Expense & Savings Distribution
            </h4>
            <BreakdownBarChart items={breakdownItems} />
          </div>
        </div>

        <div className="text-[11px] text-slate-400 leading-normal flex items-start gap-1.5 pt-3 border-t border-slate-100">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
          <span>
            Allocations represent self-reported budgeting estimates. Maintaining a disciplined 20%+ savings buffer provides strong financial resilience.
          </span>
        </div>
      </div>
    </div>
  );
};
