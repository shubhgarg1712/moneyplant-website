import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { LoanEmiCalculator } from './calculators/LoanEmiCalculator';
import { RentVsBuyCalculator } from './calculators/RentVsBuyCalculator';
import { BudgetPlannerCalculator } from './calculators/BudgetPlannerCalculator';
import { LoanCostCalculator } from './calculators/LoanCostCalculator';
import { CompoundInterestCalculator } from './calculators/CompoundInterestCalculator';
import { ExtraRepaymentCalculator } from './calculators/ExtraRepaymentCalculator';
import { CreditCardCalculator } from './calculators/CreditCardCalculator';

type CalculatorTab =
  | 'loan-emi'
  | 'rent-vs-buy'
  | 'budget-planner'
  | 'loan-cost'
  | 'compound-interest'
  | 'extra-repayment'
  | 'credit-card';

interface TabItem {
  id: CalculatorTab;
  label: string;
}

const CALCULATOR_TABS: TabItem[] = [
  { id: 'loan-emi', label: 'Loan EMI' },
  { id: 'rent-vs-buy', label: 'Rent vs Buy' },
  { id: 'budget-planner', label: 'Budget Planner' },
  { id: 'loan-cost', label: 'Loan Cost' },
  { id: 'compound-interest', label: 'Compound Interest' },
  { id: 'extra-repayment', label: 'Extra Repayment' },
  { id: 'credit-card', label: 'Credit Card Repayment' },
];

export const FinancialCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('loan-emi');

  return (
    <section id="calculators" className="py-20 bg-white border-t border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-forest text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Financial Planning Utilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Estimate Your Financial Commitments
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Evaluate borrowing, savings, debt amortization, and property purchase scenarios. 
            Adjust values via synchronized manual inputs or slider controls.
          </p>
        </div>

        {/* 7-Calculator Pill Selector Bar */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 mb-8 overflow-x-auto scrollbar-none max-w-full">
          {CALCULATOR_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all select-none shrink-0 ${
                  isActive
                    ? 'bg-brand-forest text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Calculator Component View */}
        <div className="transition-all duration-200">
          {activeTab === 'loan-emi' && <LoanEmiCalculator />}
          {activeTab === 'rent-vs-buy' && <RentVsBuyCalculator />}
          {activeTab === 'budget-planner' && <BudgetPlannerCalculator />}
          {activeTab === 'loan-cost' && <LoanCostCalculator />}
          {activeTab === 'compound-interest' && <CompoundInterestCalculator />}
          {activeTab === 'extra-repayment' && <ExtraRepaymentCalculator />}
          {activeTab === 'credit-card' && <CreditCardCalculator />}
        </div>
      </div>
    </section>
  );
};
