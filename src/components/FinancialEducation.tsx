import React, { useState } from 'react';
import { ArrowRight, BookOpen, Search, Clock, X } from 'lucide-react';
import { ResourceItem } from '../types';

export const FinancialEducation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<ResourceItem | null>(null);

  const resources: ResourceItem[] = [
    {
      id: 'loans-guide',
      title: 'Understanding Different Types of Loans',
      category: 'Credit & Loans',
      readTime: '5 min read',
      summary: 'A structured breakdown of secured vs. unsecured credit, interest calculation models, and how to assess debt service ratios.',
      content: 'Loans play an integral role in financing life milestones and business cycles. Secured loans (such as home or auto loans) involve collateral, which typically results in lower interest rates. Unsecured loans (such as personal loans) rely on credit history and repayment capacity. Before committing, always evaluate the Equated Monthly Installment (EMI) against your monthly surplus to ensure borrowing remains manageable and sustainable.'
    },
    {
      id: 'financial-goals',
      title: 'How to Plan Your Financial Goals',
      category: 'Planning',
      readTime: '6 min read',
      summary: 'Practical frameworks for categorizing short-term, medium-term, and retirement milestones with realistic inflation factoring.',
      content: 'Effective goal planning requires categorizing milestones into chronological buckets: Short-term (<2 years), Medium-term (2–5 years), and Long-term (>5 years). Aligning assets with time horizons ensures that near-term funds are sheltered from market volatility while long-term capital benefits from disciplined compounding and inflation beating asset classes.'
    },
    {
      id: 'mutual-funds-guide',
      title: 'Understanding Mutual Funds',
      category: 'Investments',
      readTime: '7 min read',
      summary: 'Demystifying Equity, Debt, and Hybrid schemes, expense ratios, and the disciplined role of Systematic Investment Plans (SIPs).',
      content: 'Mutual funds pool capital from multiple investors to invest in securities like stocks and bonds. Understanding Scheme Information Documents (SID) and matching your risk profile with scheme volatility is critical. Systematic Investment Plans (SIP) allow regular periodic investing, helping mitigate market timing risk through rupee-cost averaging.'
    },
    {
      id: 'insurance-basics',
      title: 'Insurance: What Should You Know?',
      category: 'Protection',
      readTime: '4 min read',
      summary: 'Why protection must precede wealth creation: Term life, comprehensive health insurance, and reading the policy exclusions.',
      content: 'Insurance is fundamentally a risk-mitigation tool, not an investment vehicle. Adequate term life insurance provides essential income replacement for dependents, while comprehensive health coverage protects your accumulated wealth from unexpected hospitalization expenses. Scrutinize waiting periods, copays, and exclusions carefully.'
    },
    {
      id: 'personal-finance-basics',
      title: 'Basics of Personal Financial Planning',
      category: 'Planning',
      readTime: '5 min read',
      summary: 'A foundational look at budgeting, building a 6-month contingency reserve, and managing credit scores responsibly.',
      content: 'Sound financial health begins with an emergency fund covering 3 to 6 months of mandatory household expenses placed in liquid, easily accessible instruments. Maintaining a clean credit utilization ratio and avoiding impulsive high-interest liabilities forms the bedrock of long-term wealth stability.'
    }
  ];

  const categories = ['All', 'Credit & Loans', 'Investments', 'Protection', 'Planning'];

  const filteredResources = resources.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="resources" className="py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-forest text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Financial Education & Knowledge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Understand Your Finances
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Explore objective, easy-to-digest guides written to help you make informed financial choices.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-brand-primary"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-forest text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="font-semibold text-brand-primary bg-emerald-50 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-forest transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-forest hover:text-brand-primary group-hover:translate-x-1 transition-all"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 text-brand-primary" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-brand-forest">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {selectedArticle.title}
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {selectedArticle.content}
            </p>
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-brand-forest text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-dark transition-colors"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
