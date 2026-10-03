import type {
  CreativeCategory,
  PosterLayout,
  PosterDimensions,
  CreativeStyle,
  CreativePurpose,
  GeneratedCreative,
  GenerateCreativeRequest,
  CreativeTheme,
  BrandProfile,
  CreativeSpec,
  VisualIntent,
  VisualType,
  FlowchartStep,
  CashCycleNode,
  CreditGaugeData,
  ComparisonData,
  BenefitTreeData,
  HybridGrowthData
} from '../types/creative.ts';

// Exact MoneyPlant Brand Profile - Never modified
export const MONEYPLANT_BRAND: BrandProfile = {
  companyName: 'MONEYPLANT FINSERVE',
  tagline: '“We speak financial fluently”',
  phone: '+91 8178419058',
  email: 'info.mpfinserve@gmail.com',
  website: 'moneyplant.in',
  legalEntity: 'MoneyPlant Finserve Private Limited'
};

// Brand color palette tokens
export const BRAND_COLORS = {
  deepForest: '#0D3B2E',
  primaryGreen: '#10B981',
  secondaryGreen: '#34D399',
  darkCharcoal: '#0F172A',
  slateGray: '#1E293B',
  mutedSlate: '#64748B',
  lightGray: '#F8FAFC',
  subtleBorder: '#E2E8F0',
  white: '#FFFFFF',
  gold: '#F59E0B',
  amberGlow: '#D97706'
};

// Ultra-High Resolution Curated Commercial Imagery Database (2400px–3840px uncompressed sources)
// Sourced strictly for formal financial services, realistic SME entrepreneurs, and corporate aesthetics.
const ULTRA_HD_VISUALS: Record<string, string[]> = {
  'business-loan': [
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=3840&q=90'
  ],
  'home-loan': [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=3840&q=90'
  ],
  'car-loan': [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=3840&q=90'
  ],
  'working-capital': [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=3840&q=90'
  ],
  'personal-loan': [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=3840&q=90'
  ],
  'loan-against-property': [
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3840&q=90'
  ],
  'cgtmse': [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=3840&q=90'
  ],
  'financial-planning': [
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=3840&q=90'
  ],
  'credit-score': [
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=3840&q=90'
  ],
  'tax-saving': [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=3840&q=90'
  ],
  'diwali': [
    'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=3840&q=90'
  ],
  'holi': [
    'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?auto=format&fit=crop&w=3840&q=90'
  ],
  'eid': [
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=3840&q=90'
  ],
  'republic-day': [
    'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=3840&q=90'
  ],
  'independence-day': [
    'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=3840&q=90'
  ],
  'womens-day': [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=3840&q=90'
  ],
  'customer-appreciation': [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=3840&q=90'
  ],
  'announcement': [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=3840&q=90',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=3840&q=90'
  ]
};

const DEFAULT_CORPORATE_VISUALS = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3840&q=90',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=3840&q=90',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=3840&q=90'
];

// Financial Safety Filter: strictly checks and strips prohibited claims
export function sanitizeFinancialClaims(text: string): string {
  let cleaned = text;
  const prohibitedReplacements: [RegExp, string][] = [
    [/100%\s*(?:approval|guaranteed|sanction)/gi, 'Tailored Financing'],
    [/guaranteed\s*(?:approval|loan|returns|funding|profit)/gi, 'Transparent Advisory'],
    [/lowest\s*(?:interest\s*rate|rates?)/gi, 'Competitive Interest Rates*'],
    [/zero\s*(?:documentation|paperwork|risk)/gi, 'Streamlined Paperwork*'],
    [/instant\s*(?:approval|disbursal|loan)/gi, 'Swift Processing*'],
    [/no\s*(?:documentation|cibil|credit\s*check)/gi, 'Simplified Documentation*'],
    [/cheapest\s*(?:loan|rate)/gi, 'Competitive Rate Structures*'],
    [/everyone\s*qualifies/gi, 'Subject to Eligibility'],
    [/zero\s*risk/gi, 'Carefully Evaluated Structures']
  ];

  for (const [regex, replacement] of prohibitedReplacements) {
    cleaned = cleaned.replace(regex, replacement);
  }
  return cleaned;
}

// -------------------------------------------------------------------------------------
// 1. VISUAL INTENT & THEME CLASSIFICATION ENGINE (THEME FIRST -> VISUAL SECOND -> DESIGN THIRD)
// -------------------------------------------------------------------------------------

export interface VisualClassification {
  intent: VisualIntent;
  visualType: VisualType;
  preferredLayout: PosterLayout;
  category: CreativeCategory;
  categoryLabel: string;
  normalizedKey: string;
}

export function classifyVisualIntent(topic: string, purpose?: CreativePurpose): VisualClassification {
  const t = topic.toLowerCase().trim();

  // A. COMPARISON TOPICS (VS, VERSUS, COMPARE, DIFFERENCE)
  if (
    t.includes(' vs ') ||
    t.includes(' versus ') ||
    t.includes('compare') ||
    t.includes('difference between') ||
    t.includes('which loan') ||
    t.includes('comparison')
  ) {
    return {
      intent: 'comparison',
      visualType: 'comparison',
      preferredLayout: 'layout_f_clean_financial',
      category: 'financial_education',
      categoryLabel: 'Loan Comparison',
      normalizedKey: 'loan-against-property'
    };
  }

  // B. PROCESS TOPICS (Flowchart: Enquiry -> Eligibility -> Docs -> Assessment -> Disbursement)
  if (
    t.includes('how a loan works') ||
    t.includes('how loan works') ||
    t.includes('loan process') ||
    t.includes('approval process') ||
    t.includes('steps to loan') ||
    t.includes('application steps') ||
    t.includes('flowchart') ||
    t.includes('process diagram') ||
    t.includes('steps to apply') ||
    t.startsWith('how to get')
  ) {
    return {
      intent: 'process',
      visualType: 'flowchart',
      preferredLayout: 'layout_g_educational',
      category: 'financial_education',
      categoryLabel: 'Lending Process',
      normalizedKey: 'financial-planning'
    };
  }

  // C. BENEFIT ANALYSIS TOPICS (Benefit Tree)
  if (
    t.includes('benefit of') ||
    t.includes('benefits of') ||
    t.includes('advantages of') ||
    t.includes('why businesses need') ||
    t.includes('why choose')
  ) {
    return {
      intent: 'benefits',
      visualType: 'benefit_tree',
      preferredLayout: 'layout_g_educational',
      category: 'financial_education',
      categoryLabel: 'Strategic Value',
      normalizedKey: 'business-loan'
    };
  }

  // D. CREDIT SCORE & CIBIL DASHBOARD (Gauge arc + profile breakdown)
  if (
    t.includes('credit score') ||
    t.includes('cibil') ||
    t.includes('why credit') ||
    t.includes('bureau score') ||
    t.includes('credit health') ||
    t.includes('credit profile')
  ) {
    return {
      intent: 'dashboard',
      visualType: 'credit_gauge',
      preferredLayout: 'layout_g_educational',
      category: 'financial_education',
      categoryLabel: 'Credit Intelligence',
      normalizedKey: 'credit-score'
    };
  }

  // E. WORKING CAPITAL & CASH CYCLE TOPICS (Cash -> Inventory -> Sales -> Receivables -> Cash)
  if (
    t.includes('working capital') ||
    t.includes('cash credit') ||
    t.includes('overdraft') ||
    t.includes('od facility') ||
    t.includes('cash cycle') ||
    t.includes('operating cycle') ||
    t.includes('liquidity')
  ) {
    return {
      intent: 'cash_cycle',
      visualType: 'cash_cycle',
      preferredLayout: 'layout_g_educational',
      category: 'loan_product',
      categoryLabel: 'Working Capital',
      normalizedKey: 'working-capital'
    };
  }

  // F. HOME LOAN & PROPERTY EQUITY (Architectural Property Visuals)
  if (
    t.includes('home loan') ||
    t.includes('housing') ||
    t.includes('mortgage') ||
    t.includes('plot loan') ||
    t.includes('home construction') ||
    t.includes('home ownership')
  ) {
    return {
      intent: 'property',
      visualType: 'property',
      preferredLayout: 'layout_b_corporate_split',
      category: 'loan_product',
      categoryLabel: 'Home Financing',
      normalizedKey: 'home-loan'
    };
  }

  if (
    t.includes('property') ||
    t.includes('lap') ||
    t.includes('loan against property') ||
    t.includes('property equity')
  ) {
    return {
      intent: 'property',
      visualType: 'property',
      preferredLayout: 'layout_b_corporate_split',
      category: 'loan_product',
      categoryLabel: 'Property Equity',
      normalizedKey: 'loan-against-property'
    };
  }

  // G. AUTOMOTIVE & VEHICLE (Cars, Commercial Fleets)
  if (
    t.includes('car loan') ||
    t.includes('auto loan') ||
    t.includes('used car') ||
    t.includes('pre-owned car') ||
    t.includes('commercial car') ||
    t.includes('commercial vehicle') ||
    t.includes('vehicle financing') ||
    t.includes('fleet')
  ) {
    return {
      intent: 'automotive',
      visualType: 'vehicle',
      preferredLayout: 'layout_d_product_showcase',
      category: 'loan_product',
      categoryLabel: 'Auto Financing',
      normalizedKey: 'car-loan'
    };
  }

  // H. CGTMSE & MSME SCHEMES (Information Design / MSME Ecosystem)
  if (
    t.includes('cgtmse') ||
    t.includes('collateral free') ||
    t.includes('mudra') ||
    t.includes('government scheme')
  ) {
    return {
      intent: 'explanation',
      visualType: 'infographic',
      preferredLayout: 'layout_g_educational',
      category: 'loan_product',
      categoryLabel: 'MSME Scheme',
      normalizedKey: 'cgtmse'
    };
  }

  // I. BUSINESS LOAN & COMMERCIAL GROWTH (Hybrid Photography + Upward Trajectory)
  if (
    t.includes('business loan') ||
    t.includes('sme loan') ||
    t.includes('commercial loan') ||
    t.includes('business growth') ||
    t.includes('machinery') ||
    t.includes('enterprise funding') ||
    t.includes('msme')
  ) {
    return {
      intent: 'business',
      visualType: 'hybrid_growth',
      preferredLayout: 'layout_b_corporate_split',
      category: 'loan_product',
      categoryLabel: 'Business Financing',
      normalizedKey: 'business-loan'
    };
  }

  // J. FESTIVALS (Dignified Warmth Preserving Corporate Stature)
  if (
    t.includes('diwali') ||
    t.includes('deepavali') ||
    t.includes('dhanteras') ||
    t.includes('holi') ||
    t.includes('eid') ||
    t.includes('ramadan') ||
    t.includes('christmas') ||
    t.includes('new year') ||
    t.includes('navratri') ||
    t.includes('dussehra') ||
    t.includes('ganesh')
  ) {
    const norm = t.includes('holi') ? 'holi' : t.includes('eid') || t.includes('ramadan') ? 'eid' : 'diwali';
    return {
      intent: 'festival',
      visualType: 'festive',
      preferredLayout: 'layout_h_festive_corporate',
      category: 'festival',
      categoryLabel: 'Festive Campaign',
      normalizedKey: norm
    };
  }

  // K. NATIONAL OCCASIONS
  if (t.includes('republic day') || t.includes('independence day')) {
    const norm = t.includes('republic') ? 'republic-day' : 'independence-day';
    return {
      intent: 'announcement',
      visualType: 'photography',
      preferredLayout: 'layout_c_cinematic_scrim',
      category: 'national_occasion',
      categoryLabel: 'National Occasion',
      normalizedKey: norm
    };
  }

  if (t.includes('women') || t.includes('woman') || t.includes('female founder')) {
    return {
      intent: 'announcement',
      visualType: 'photography',
      preferredLayout: 'layout_a_editorial',
      category: 'national_occasion',
      categoryLabel: 'Special Occasion',
      normalizedKey: 'womens-day'
    };
  }

  // L. TAX STRATEGY & FINANCIAL PLANNING
  if (t.includes('tax') || t.includes('80c') || t.includes('itr') || t.includes('tax saving')) {
    return {
      intent: 'education',
      visualType: 'infographic',
      preferredLayout: 'layout_f_clean_financial',
      category: 'financial_education',
      categoryLabel: 'Tax Strategy',
      normalizedKey: 'tax-saving'
    };
  }

  if (t.includes('financial planning') || t.includes('wealth') || t.includes('investment') || t.includes('retirement')) {
    return {
      intent: 'education',
      visualType: 'infographic',
      preferredLayout: 'layout_f_clean_financial',
      category: 'financial_product',
      categoryLabel: 'Financial Planning',
      normalizedKey: 'financial-planning'
    };
  }

  // M. ANNOUNCEMENT & CLIENT PARTNERSHIP
  if (t.includes('appreciation') || t.includes('thank you') || t.includes('customer')) {
    return {
      intent: 'announcement',
      visualType: 'photography',
      preferredLayout: 'layout_a_editorial',
      category: 'campaign',
      categoryLabel: 'Client Partnership',
      normalizedKey: 'customer-appreciation'
    };
  }

  if (t.includes('announcement') || t.includes('launch') || t.includes('branch') || t.includes('milestone') || t.includes('interest rate update')) {
    return {
      intent: 'announcement',
      visualType: 'photography',
      preferredLayout: 'layout_i_announcement',
      category: 'announcement',
      categoryLabel: 'Company Announcement',
      normalizedKey: 'announcement'
    };
  }

  // N. DYNAMIC CUSTOM TOPIC
  const isEdu = purpose === 'educational' || t.includes('why ') || t.includes('what is') || t.includes('importance');
  return {
    intent: isEdu ? 'education' : 'custom',
    visualType: isEdu ? 'infographic' : 'hybrid_growth',
    preferredLayout: isEdu ? 'layout_g_educational' : 'layout_b_corporate_split',
    category: isEdu ? 'financial_education' : 'business_marketing',
    categoryLabel: isEdu ? 'Financial Education' : 'Financial Services',
    normalizedKey: 'business-loan'
  };
}

// Backwards-compatible detector
export function detectCreativeCategory(topic: string): {
  category: CreativeCategory;
  categoryLabel: string;
  normalizedKey: string;
} {
  const c = classifyVisualIntent(topic);
  return {
    category: c.category,
    categoryLabel: c.categoryLabel,
    normalizedKey: c.normalizedKey
  };
}

// Select layout automatically from the 10 professional layout options
export function selectPosterLayout(category: CreativeCategory, seed: number = 0): PosterLayout {
  switch (category) {
    case 'festival':
      return 'layout_h_festive_corporate';
    case 'financial_education':
      return seed % 2 === 0 ? 'layout_g_educational' : 'layout_f_clean_financial';
    case 'announcement':
      return 'layout_i_announcement';
    case 'national_occasion':
      return seed % 2 === 0 ? 'layout_c_cinematic_scrim' : 'layout_e_executive_finance';
    case 'campaign':
      return seed % 2 === 0 ? 'layout_a_editorial' : 'layout_j_service_showcase';
    case 'loan_product':
    case 'financial_product':
    default: {
      const corporateLayouts: PosterLayout[] = [
        'layout_b_corporate_split',
        'layout_a_editorial',
        'layout_d_product_showcase',
        'layout_f_clean_financial',
        'layout_e_executive_finance',
        'layout_c_cinematic_scrim',
        'layout_j_service_showcase'
      ];
      return corporateLayouts[seed % corporateLayouts.length];
    }
  }
}

// -------------------------------------------------------------------------------------
// 2. CONCEPTUAL VISUAL RELEVANCE SCORER & VALIDATOR
// -------------------------------------------------------------------------------------

export function calculateVisualRelevance(
  topic: string,
  visualType: VisualType,
  intent: VisualIntent
): { score: number; rationale: string } {
  const t = topic.toLowerCase();

  if (intent === 'cash_cycle' || t.includes('working capital')) {
    if (visualType === 'cash_cycle') {
      return {
        score: 98,
        rationale: 'Working capital circular flow (Cash → Inventory → Sales → Receivables → Cash) delivers exact operational relevance.'
      };
    }
  }

  if (intent === 'dashboard' || t.includes('credit score') || t.includes('cibil')) {
    if (visualType === 'credit_gauge') {
      return {
        score: 98,
        rationale: 'Calibrated credit bureau gauge arc with weighted repayment and utilization drivers directly communicates score health.'
      };
    }
  }

  if (intent === 'process' || t.includes('loan works') || t.includes('process')) {
    if (visualType === 'flowchart') {
      return {
        score: 99,
        rationale: '5-stage sequential flowchart gives clear, transparent borrower journey from Enquiry to Disbursement.'
      };
    }
  }

  if (intent === 'comparison' || t.includes('vs') || t.includes('compare')) {
    if (visualType === 'comparison') {
      return {
        score: 99,
        rationale: 'Structured two-column comparative matrix directly contrasts purpose, collateral security, and tenures.'
      };
    }
  }

  if (intent === 'property' || t.includes('home loan') || t.includes('property')) {
    if (visualType === 'property') {
      return {
        score: 96,
        rationale: 'Modern architectural residential imagery directly reinforces homeownership aspiration and property value.'
      };
    }
  }

  if (intent === 'automotive' || t.includes('car loan') || t.includes('vehicle')) {
    if (visualType === 'vehicle') {
      return {
        score: 96,
        rationale: 'Pristine automotive commercial visual with ownership financing overlays aligns directly with vehicle credit.'
      };
    }
  }

  if (intent === 'business' || t.includes('business loan')) {
    if (visualType === 'hybrid_growth') {
      return {
        score: 97,
        rationale: 'Hybrid enterprise visual combining realistic commercial entrepreneurship with an upward capital trajectory.'
      };
    }
  }

  if (intent === 'benefits') {
    if (visualType === 'benefit_tree') {
      return {
        score: 97,
        rationale: 'Hierarchical benefit tree breaks down strategic value into tangible operational pillars.'
      };
    }
  }

  if (intent === 'festival') {
    if (visualType === 'festive') {
      return {
        score: 97,
        rationale: 'Luminous brass diya illumination with MoneyPlant corporate green preservation delivers institutional warmth.'
      };
    }
  }

  // Baseline standard professional score
  return {
    score: 94,
    rationale: `Art-directed ${visualType} format selected based on semantic intent (${intent}) for institutional financial clarity.`
  };
}

// -------------------------------------------------------------------------------------
// 3. SEMANTIC VISUAL PROMPT GENERATOR FOR AI IMAGE/GRAPHIC MODELS
// -------------------------------------------------------------------------------------

export function generateSemanticImagePrompt(topic: string, intent: VisualIntent, visualType: VisualType): string {
  const t = topic.toLowerCase();

  if (intent === 'cash_cycle' || t.includes('working capital')) {
    return 'Premium financial infographic visualization representing the working capital cycle: cash flowing into inventory, inventory becoming sales, sales creating receivables, and receivables returning to cash. Sophisticated corporate finance aesthetic, forest green and white, clean vector-style diagrams, subtle depth, professional financial-services presentation, no text, no logo.';
  }

  if (intent === 'dashboard' || t.includes('credit score') || t.includes('cibil')) {
    return 'Premium financial dashboard concept featuring a sophisticated credit score gauge, credit history indicators, repayment behavior and financial profile visualization. Corporate fintech aesthetic, deep forest green, white and dark charcoal, elegant data visualization, clean professional design, no text, no logo.';
  }

  if (intent === 'process' || t.includes('how a loan works')) {
    return 'Professional 5-step banking process visualization with numbered stages from enquiry and eligibility to documentation and lender assessment, modern corporate fintech aesthetic, deep forest green and mint accents, pristine negative space. No text, no logo.';
  }

  if (intent === 'comparison' || t.includes('vs') || t.includes('compare')) {
    return 'Clean side-by-side corporate financial comparison layout with dual distinct institutional pillars, subtle geometry, deep forest green accents, modern fintech report aesthetic, balanced negative space. No text, no logo.';
  }

  if (intent === 'property' || t.includes('home loan')) {
    return 'Premium architectural photography of a contemporary Indian residential home, modern geometric facade, subtle dusk illumination, sophisticated financial planning overlay aesthetic. Clean negative space on the left for headline placement. No text, no logo, no watermark.';
  }

  if (intent === 'automotive' || t.includes('car loan')) {
    return 'Premium automotive commercial photography showing a modern sleek vehicle in pristine showroom light, subtle auto financing and ownership documents concept, elegant forest green accents. Clean composition with negative space for corporate headline. No text, no logo, no watermark.';
  }

  if (intent === 'business' || t.includes('business loan')) {
    return 'Premium commercial advertising photography showing an Indian small-business entrepreneur reviewing business expansion plans in a modern SME environment, with subtle visual cues of inventory, business operations and financial growth. Sophisticated forest-green financial graphics integrated naturally into the scene. Corporate Indian financial-services advertising aesthetic. Clean negative space on the left for headline placement. No text, no logo, no watermark.';
  }

  if (intent === 'benefits') {
    return 'Structured corporate financial hierarchy diagram illustrating core enterprise liquidity benefits, clean vector cards, deep forest green and mint tones, professional infographics, pristine negative space. No text, no logo.';
  }

  if (intent === 'explanation' || t.includes('cgtmse')) {
    return 'Professional MSME enterprise illustration and information visualization representing government-backed credit guarantee scheme, small manufacturing and service operations, institutional banking framework. Clean forest green and white palette. No text, no logo.';
  }

  if (intent === 'festival') {
    return 'Warm brass diyas with soft golden illumination and elegant deep green background, refined Indian festival celebration preserving high-end corporate stature, subtle prosperity aesthetics, no text, no logo.';
  }

  return `Premium corporate financial advertising concept for ${topic}, modern banking institutional aesthetic, deep forest green and soft slate, pristine composition with ample negative space. No text, no logo.`;
}

// -------------------------------------------------------------------------------------
// 4. STRUCTURED INFOGRAPHIC PAYLOAD BUILDERS
// -------------------------------------------------------------------------------------

export function buildFlowchartSteps(topic: string): FlowchartStep[] {
  return [
    { stepNumber: '01', title: 'ENQUIRY', subtitle: 'Profile Consultation', icon: 'search' },
    { stepNumber: '02', title: 'ELIGIBILITY', subtitle: 'Institutional Fitment', icon: 'checklist' },
    { stepNumber: '03', title: 'DOCUMENTATION', subtitle: 'KYC & Financials', icon: 'document' },
    { stepNumber: '04', title: 'ASSESSMENT', subtitle: 'Lender Appraisal', icon: 'analysis' },
    { stepNumber: '05', title: 'DISBURSEMENT*', subtitle: 'Facility Sanction', icon: 'cash' }
  ];
}

export function buildCashCycleNodes(topic: string): CashCycleNode[] {
  return [
    { id: 'cash', label: 'CASH', sublabel: 'Operating Liquidity', icon: 'cash' },
    { id: 'inventory', label: 'INVENTORY', sublabel: 'Raw Materials & Stock', icon: 'inventory' },
    { id: 'sales', label: 'SALES', sublabel: 'Commercial Turnover', icon: 'trend_up' },
    { id: 'receivables', label: 'RECEIVABLES', sublabel: 'Invoice Realization', icon: 'receivables' }
  ];
}

export function buildCreditGaugeData(topic: string): CreditGaugeData {
  return {
    score: 785,
    scoreLabel: '785 • PRIME PROFILE',
    min: 300,
    max: 900,
    rating: 'Prime',
    factors: [
      { name: 'Credit History', impact: '35% Impact', desc: 'Consistent on-time repayments', weight: 'Critical' },
      { name: 'Repayment Pattern', impact: '30% Impact', desc: 'Zero defaults or delayed payments', weight: 'High' },
      { name: 'Credit Utilization', impact: '30% Impact', desc: 'Revolving balances kept below 30%', weight: 'High' }
    ],
    footnote: 'Bureau scores are maintained by authorized credit bureaus. Illustrative reference.'
  };
}

export function buildComparisonData(topic: string): ComparisonData {
  const t = topic.toLowerCase();
  if (t.includes('property') || t.includes('lap') || t.includes('home')) {
    return {
      columnA: {
        title: 'HOME LOAN',
        badge: 'PROPERTY ACQUISITION',
        highlight: true,
        points: [
          { label: 'Primary Purpose', value: 'Purchase or construction of residential property' },
          { label: 'Underlying Security', value: 'Property being acquired serves as primary mortgage' },
          { label: 'Typical Tenure', value: 'Longer tenures up to 30 years available' },
          { label: 'Key Characteristic', value: 'Earmarked end-use with tax deduction benefits*' }
        ]
      },
      columnB: {
        title: 'LOAN AGAINST PROPERTY',
        badge: 'EQUITY MONETIZATION',
        highlight: false,
        points: [
          { label: 'Primary Purpose', value: 'Multipurpose capital for business growth or personal goals' },
          { label: 'Underlying Security', value: 'Existing owned residential or commercial real estate' },
          { label: 'Typical Tenure', value: 'Structured horizons up to 15 years' },
          { label: 'Key Characteristic', value: 'Substantial loan quantum with unrestricted deployment' }
        ]
      },
      verdictNote: 'Both facilities subject to independent property valuation and lender underwriting criteria.'
    };
  }

  return {
    columnA: {
      title: 'SECURED FINANCING',
      badge: 'ASSET-BACKED',
      highlight: true,
      points: [
        { label: 'Collateral Requirement', value: 'Secured against tangible assets or property' },
        { label: 'Cost Structure', value: 'Lower interest rate structures*' },
        { label: 'Repayment Horizon', value: 'Extended tenure options for predictable cash flows' }
      ]
    },
    columnB: {
      title: 'UNSECURED FINANCING',
      badge: 'CASH-FLOW BASED',
      highlight: false,
      points: [
        { label: 'Collateral Requirement', value: 'No physical collateral pledge needed*' },
        { label: 'Processing Speed', value: 'Streamlined appraisal based on turnover & financials' },
        { label: 'Repayment Horizon', value: 'Compact tenures suited for immediate operational goals' }
      ]
    },
    verdictNote: 'Facility structures vary according to business profile and lender criteria.'
  };
}

export function buildBenefitTreeData(topic: string): BenefitTreeData {
  return {
    rootTitle: 'WORKING CAPITAL ENGINE',
    rootDesc: 'Tri-pillar operational liquidity',
    branches: [
      {
        title: 'INVENTORY CONTINUITY',
        desc: 'Procure bulk raw materials and seasonal buffer inventory without draining daily reserves.',
        icon: 'inventory',
        tag: 'Supply Stability'
      },
      {
        title: 'CASH-FLOW RESILIENCE',
        desc: 'Bridge delayed client receivables while keeping vendor settlements strictly on schedule.',
        icon: 'cash',
        tag: 'Vendor Confidence'
      },
      {
        title: 'OPERATIONAL MOMENTUM',
        desc: 'Seize unbudgeted enterprise expansion opportunities with ready working credit lines.',
        icon: 'trend_up',
        tag: 'Agile Growth'
      }
    ]
  };
}

export function buildHybridGrowthData(topic: string): HybridGrowthData {
  return {
    badge: 'ENTERPRISE MILESTONES',
    chartTitle: 'BUSINESS SCALING ROADMAP',
    metrics: [
      { label: 'Capacity Expansion', value: 'New Machinery & Facility', icon: 'business' },
      { label: 'Working Capital', value: 'Optimized Cash Cycle', icon: 'cash' },
      { label: 'Market Reach', value: 'Multi-Regional Growth', icon: 'trend_up' }
    ],
    trendValues: [25, 45, 62, 78, 95]
  };
}

// -------------------------------------------------------------------------------------
// 5. THEME BUILDER
// -------------------------------------------------------------------------------------

export function buildCreativeTheme(category: CreativeCategory, normalizedKey: string, style: CreativeStyle): CreativeTheme {
  if (category === 'festival') {
    return {
      primaryColor: BRAND_COLORS.deepForest,
      accentColor: BRAND_COLORS.gold,
      secondaryAccent: BRAND_COLORS.secondaryGreen,
      backgroundColor: '#09211A',
      cardBgColor: '#0E3025',
      textColor: BRAND_COLORS.white,
      mutedTextColor: '#D1FAE5',
      badgeBgColor: 'rgba(245, 158, 11, 0.18)',
      badgeTextColor: '#FCD34D',
      footerBgColor: '#061712',
      footerTextColor: '#A7F3D0',
      goldAccent: BRAND_COLORS.gold,
      isDarkTheme: true
    };
  }

  if (category === 'national_occasion') {
    return {
      primaryColor: BRAND_COLORS.deepForest,
      accentColor: '#FF9933', // Subtle Saffron accent
      secondaryAccent: BRAND_COLORS.secondaryGreen,
      backgroundColor: '#0A241C',
      cardBgColor: '#103529',
      textColor: BRAND_COLORS.white,
      mutedTextColor: '#E2E8F0',
      badgeBgColor: 'rgba(255, 153, 51, 0.18)',
      badgeTextColor: '#FDBA74',
      footerBgColor: '#071A14',
      footerTextColor: '#D1FAE5',
      isDarkTheme: true
    };
  }

  if (style === 'bold' || (style === 'corporate' && (category === 'announcement' || category === 'campaign'))) {
    return {
      primaryColor: BRAND_COLORS.deepForest,
      accentColor: BRAND_COLORS.primaryGreen,
      secondaryAccent: BRAND_COLORS.secondaryGreen,
      backgroundColor: '#0A2019',
      cardBgColor: '#123327',
      textColor: BRAND_COLORS.white,
      mutedTextColor: '#CBD5E1',
      badgeBgColor: 'rgba(16, 185, 129, 0.2)',
      badgeTextColor: '#6EE7B7',
      footerBgColor: '#061611',
      footerTextColor: '#A7F3D0',
      isDarkTheme: true
    };
  }

  // Premium Financial Services Clean Palette: Crisp White + Forest Green + Soft Gray Cards
  return {
    primaryColor: BRAND_COLORS.deepForest,
    accentColor: BRAND_COLORS.primaryGreen,
    secondaryAccent: BRAND_COLORS.secondaryGreen,
    backgroundColor: '#FFFFFF',
    cardBgColor: '#F8FAFC',
    textColor: BRAND_COLORS.darkCharcoal,
    mutedTextColor: BRAND_COLORS.mutedSlate,
    badgeBgColor: '#E6F4EA',
    badgeTextColor: BRAND_COLORS.deepForest,
    footerBgColor: BRAND_COLORS.deepForest,
    footerTextColor: '#E6F4EA',
    goldAccent: BRAND_COLORS.amberGlow,
    isDarkTheme: false
  };
}

// -------------------------------------------------------------------------------------
// 6. MAIN CREATIVE CONCEPT GENERATOR (THEME FIRST -> VISUAL SECOND -> DESIGN THIRD)
// -------------------------------------------------------------------------------------

export function generateCreativeConcept(request: GenerateCreativeRequest): GeneratedCreative {
  const seed = request.seed ?? Math.floor(Math.random() * 1000);
  const topicTrimmed = request.topic.trim();

  // 1. Analyze topic & classify intent
  const classified = classifyVisualIntent(topicTrimmed, request.purpose);
  const category = request.categoryOverride ?? classified.category;
  const normalizedKey = classified.normalizedKey;
  const intent = classified.intent;
  const visualType = request.visualTypeOverride ?? classified.visualType;
  const dimensions: PosterDimensions = request.dimensions ?? '2160x2160';
  const style: CreativeStyle = request.style ?? 'corporate';
  const layout = request.layoutOverride ?? classified.preferredLayout;
  const theme = buildCreativeTheme(category, normalizedKey, style);

  // 2. Curate high-res visual URL
  const visualList = ULTRA_HD_VISUALS[normalizedKey] || DEFAULT_CORPORATE_VISUALS;
  const imageUrl = visualList[seed % visualList.length];

  // 3. Calculate Visual Relevance Score
  const relevance = calculateVisualRelevance(topicTrimmed, visualType, intent);

  // 4. Generate Semantic Visual Prompt for AI image models
  const semanticImagePrompt = generateSemanticImagePrompt(topicTrimmed, intent, visualType);

  // 5. Generate structured infographic payloads
  let flowchartSteps: FlowchartStep[] | undefined;
  let cashCycleNodes: CashCycleNode[] | undefined;
  let creditGaugeData: CreditGaugeData | undefined;
  let comparisonData: ComparisonData | undefined;
  let benefitTreeData: BenefitTreeData | undefined;
  let hybridGrowthData: HybridGrowthData | undefined;

  if (visualType === 'flowchart' || intent === 'process') {
    flowchartSteps = buildFlowchartSteps(topicTrimmed);
  } else if (visualType === 'cash_cycle' || intent === 'cash_cycle') {
    cashCycleNodes = buildCashCycleNodes(topicTrimmed);
  } else if (visualType === 'credit_gauge' || intent === 'dashboard') {
    creditGaugeData = buildCreditGaugeData(topicTrimmed);
  } else if (visualType === 'comparison' || intent === 'comparison') {
    comparisonData = buildComparisonData(topicTrimmed);
  } else if (visualType === 'benefit_tree' || intent === 'benefits') {
    benefitTreeData = buildBenefitTreeData(topicTrimmed);
  } else if (visualType === 'hybrid_growth' || intent === 'business') {
    hybridGrowthData = buildHybridGrowthData(topicTrimmed);
  }

  // 6. Professional Financial Copywriting Matrix
  let topicBadge = 'BUSINESS FINANCING';
  let headline = 'FUND YOUR NEXT BUSINESS MOVE';
  let subheadline = 'Financing solutions designed to support eligible business requirements.';
  let supportingCopy = 'Access structured commercial loans aligned with operational needs and growth milestones, subject to eligible criteria.';
  let benefits = [
    'Customized business loan structures',
    'Flexible repayment tenures',
    'Structured financial advisory'
  ];
  let cta = 'Explore Business Financing';
  let disclaimer = 'Subject to applicable eligibility criteria and lender terms.';
  let visualDirection = 'Professional Indian entrepreneur in modern corporate office review.';
  let objective = 'Drive qualified corporate loan inquiries with institutional trust.';
  let audience = 'MSME founders, business owners, commercial enterprises.';

  if (intent === 'comparison') {
    topicBadge = 'FINANCIAL COMPARISON';
    headline = 'COMPARING STRATEGIC CREDIT OPTIONS';
    subheadline = 'Evaluate structural differences, collateral requirements, and tenures to identify optimal financing.';
    supportingCopy = 'Choosing between property acquisition and equity monetization requires evaluating repayment timelines, purpose restrictions, and borrowing costs.';
    benefits = [
      'Side-by-side facility comparison',
      'Transparent collateral evaluation',
      'Institutional advisory across 100+ lenders'
    ];
    cta = 'Compare Lending Options';
    disclaimer = '*Facility terms and eligible loan-to-value ratios subject to lender underwriting criteria.';
    audience = 'Property owners, business founders, financial decision-makers.';
    objective = 'Provide transparent comparative guidance without marketing jargon.';
    visualDirection = 'Clean side-by-side comparative layout contrasting property acquisition vs equity monetization.';
  } else if (intent === 'cash_cycle' || normalizedKey === 'working-capital') {
    topicBadge = 'WORKING CAPITAL';
    const headlines = [
      'KEEP BUSINESS MOVING FORWARD',
      'MANAGE CASH FLOW WITH LIQUIDITY SOLUTIONS',
      'MAINTAIN CONTINUOUS OPERATIONAL MOMENTUM',
      'STRENGTHEN YOUR DAILY BUSINESS CASH FLOW'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Financing solutions designed to support eligible working-capital requirements.';
    supportingCopy = 'Balance vendor settlement cycles and customer invoice timelines with structured credit facilities designed for dynamic operational cycles.';
    benefits = [
      'Cash credit and overdraft facilities',
      'Repayments aligned with invoice cycles',
      'Dedicated relationship manager support'
    ];
    cta = 'Explore Working Capital';
    disclaimer = '*Working capital limits subject to financial appraisal and lender sanction.';
    audience = 'Manufacturers, wholesalers, service contractors, traders.';
    objective = 'Provide liquidity and cash-credit clarity for operating companies.';
    visualDirection = 'Circular working capital cycle diagram: Cash -> Inventory -> Sales -> Receivables -> Cash.';
  } else if (intent === 'process') {
    topicBadge = 'BORROWER JOURNEY';
    headline = 'HOW COMMERCIAL FINANCING WORKS';
    subheadline = 'A structured 5-stage advisory journey from initial enquiry through to institutional disbursement.';
    supportingCopy = 'Navigating institutional credit becomes straightforward when each milestone—from profile fitment to lender appraisal—is managed with experienced guidance.';
    benefits = [
      'Pre-eligibility evaluation across 100+ partners',
      'Complete documentation structuring support',
      'End-to-end liaison with lender underwriting teams'
    ];
    cta = 'Start Your Loan Journey';
    disclaimer = '*Assessment timelines and sanctions subject to individual profile and lender terms.';
    audience = 'Borrowers, corporate finance teams, prospective applicants.';
    objective = 'Demystify loan processing with an orderly step-by-step flowchart.';
    visualDirection = 'Sequential 5-step process flowchart: Enquiry -> Eligibility -> Documentation -> Assessment -> Disbursement.';
  } else if (intent === 'dashboard' || normalizedKey === 'credit-score') {
    topicBadge = 'CREDIT EDUCATION';
    const headlines = [
      'YOUR CREDIT SCORE MATTERS',
      'THE FOUNDATION OF FAVORABLE BORROWING',
      'BUILDING A STRONGER CREDIT PROFILE',
      'HOW CREDIT HEALTH INFLUENCES FINANCING'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Understand how credit history can influence access to financing and interest rates.';
    supportingCopy = 'Lending institutions rely on credit bureau records to evaluate repayment reliability. A disciplined profile simplifies future loan sanctions.';
    benefits = [
      'Improves eligibility across lending institutions',
      'Accelerates loan assessment timelines',
      'Helps secure competitive interest structures*'
    ];
    cta = 'Understand Your Credit Health';
    disclaimer = 'For educational and informational purposes only. Bureau scores are maintained by authorized credit bureaus.';
    audience = 'Working professionals, business owners, upcoming loan applicants.';
    objective = 'Educate consumers on credit hygiene with an infographic gauge layout.';
    visualDirection = 'Calibrated credit bureau gauge arc (300 to 900) with key drivers: history, repayment, and utilization.';
  } else if (intent === 'benefits') {
    topicBadge = 'STRATEGIC BENEFITS';
    headline = `WHY WORKING CAPITAL EMPOWERS GROWTH`;
    subheadline = 'Discover how dedicated operational liquidity protects supply chains and drives revenue expansion.';
    supportingCopy = 'Businesses with predictable cash buffers negotiate better supplier discounts, fulfill larger orders, and withstand fluctuating payment cycles.';
    benefits = [
      'Zero interruption to inventory procurement',
      'Stronger negotiating power with vendors',
      'Immediate liquidity buffer for unexpected overheads'
    ];
    cta = 'Unlock Operational Benefits';
    disclaimer = '*Facility structures and limits subject to lender credit evaluation.';
    audience = 'Enterprise directors, operations managers, MSME owners.';
    objective = 'Highlight operational advantages through structured visual pillars.';
    visualDirection = 'Tri-pillar benefit tree breaking down inventory continuity, cash-flow stability, and operational momentum.';
  } else if (normalizedKey === 'business-loan') {
    topicBadge = 'BUSINESS FINANCING';
    const headlines = [
      'FUND YOUR NEXT BUSINESS MOVE',
      'STRATEGIC CAPITAL FOR BUSINESS EXPANSION',
      'SCALE YOUR ENTERPRISE WITH CONFIDENCE',
      'ACCELERATE YOUR COMMERCIAL GROWTH'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Financing solutions designed to support eligible business requirements.';
    supportingCopy = 'Whether funding inventory, machinery, or capacity expansion, explore customized loan options structured around your business cash flows.';
    benefits = [
      'Customized business loan structures',
      'Flexible repayment tenures',
      'Structured financial advisory'
    ];
    cta = 'Explore Business Financing';
    audience = 'Indian MSME owners, manufacturers, trading enterprises.';
    objective = 'Promote business growth loans with formal banking clarity.';
    visualDirection = 'Hybrid enterprise visual: Indian entrepreneur with overlaid upward capital growth trajectory.';
  } else if (normalizedKey === 'home-loan') {
    topicBadge = 'HOME FINANCING';
    const headlines = [
      'TURN YOUR HOME PLANS INTO REALITY',
      'STRUCTURED FINANCING FOR YOUR DREAM HOME',
      'A CLEAR PATH TO HOMEOWNERSHIP',
      'YOUR HOME JOURNEY STARTS WITH CLARITY'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Financing solutions for eligible home purchases, subject to applicable lender terms.';
    supportingCopy = 'From acquisition to construction, benefit from end-to-end guidance and access to leading financial institutions.';
    benefits = [
      'Competitive rate structures*',
      'Tenures up to 30 years',
      'Transparent documentation advisory'
    ];
    cta = 'Explore Home Loan';
    audience = 'Salaried professionals, families, first-time homebuyers.';
    objective = 'Deliver reassuring, transparent guidance for high-value housing credit.';
    visualDirection = 'Contemporary Indian home with clean architecture and welcoming family lifestyle.';
  } else if (normalizedKey === 'car-loan') {
    topicBadge = 'AUTO FINANCING';
    const headlines = [
      'YOUR NEXT DRIVE STARTS HERE',
      'CONVENIENT VEHICLE FINANCING SOLUTIONS',
      'UPGRADE YOUR DRIVE WITH CONFIDENCE',
      'STREAMLINED FINANCING FOR YOUR CAR'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Financing solutions for eligible vehicle purchases, subject to applicable lender terms.';
    supportingCopy = 'Plan your next vehicle purchase with structured EMI schedules and prompt application processing.';
    benefits = [
      'Financing for new and used vehicles*',
      'Customized repayment schedules',
      'Prompt documentation review*'
    ];
    cta = 'Explore Car Financing';
    audience = 'Automobile buyers, working executives, families.';
    objective = 'Promote vehicle credit with transparent repayment options.';
    visualDirection = 'Modern luxury vehicle on picturesque road in sleek commercial light.';
  } else if (normalizedKey === 'loan-against-property') {
    topicBadge = 'PROPERTY EQUITY FINANCING';
    const headlines = [
      'UNLOCK THE VALUE IN YOUR ASSET',
      'LONG-TERM CAPITAL BACKED BY PROPERTY',
      'SUBSTANTIAL FINANCING SECURED BY REAL ESTATE',
      'MAXIMIZE EQUITY IN RESIDENTIAL OR COMMERCIAL PROPERTY'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Financing solutions against eligible commercial or residential properties.';
    supportingCopy = 'Fund high-value enterprise goals with longer repayment horizons and cost-effective secured credit terms.';
    benefits = [
      'High sanction value against eligible property*',
      'Extended tenures up to 15 years',
      'Retain complete property ownership'
    ];
    cta = 'Explore Property Loan';
    audience = 'Real estate owners, senior entrepreneurs, corporate founders.';
    objective = 'Highlight property equity monetization with maximum institutional trust.';
    visualDirection = 'Prestigious commercial property facade in metropolitan business district.';
  } else if (normalizedKey === 'cgtmse') {
    topicBadge = 'MSME CREDIT SCHEMES';
    const headlines = [
      'COLLATERAL-FREE FINANCING FOR MSMES',
      'SCALE ENTERPRISE THROUGH CGTMSE SUPPORT',
      'CREDIT GUARANTEE SOLUTIONS FOR SMALL BUSINESS',
      'INSTITUTIONAL FUNDING WITHOUT THIRD-PARTY COLLATERAL'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Financing solutions under the Credit Guarantee Fund Scheme for eligible micro and small enterprises.';
    supportingCopy = 'Empowering emerging manufacturers and service providers to access formal banking credit without pledged physical assets.';
    benefits = [
      'Collateral-free credit framework*',
      'Government-backed scheme coverage',
      'Specialized MSME advisory team'
    ];
    cta = 'Explore CGTMSE Solutions';
    disclaimer = '*Under CGTMSE guidelines for eligible enterprises subject to lending partner sanction.';
    audience = 'Indian MSME founders, industrial units, innovators.';
    objective = 'Demystify collateral-free government credit frameworks for growing enterprises.';
    visualDirection = 'Modern precision manufacturing workshop with focused Indian entrepreneur.';
  } else if (normalizedKey === 'tax-saving') {
    topicBadge = 'TAX STRATEGY';
    const headlines = [
      'STRUCTURE YOUR TAX EFFICIENCY EARLY',
      'TAX-EFFICIENT PLANNING FOR WORKING PROFESSIONALS',
      'MAXIMIZE ELIGIBLE DEDUCTIONS WITH FORESIGHT',
      'SMART STRATEGIES FOR ANNUAL TAX PLANNING'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Optimize your eligible tax deductions systematically throughout the financial year.';
    supportingCopy = 'Leverage provisions under Section 80C, 80D, and home loan interest allowances with advance financial structuring.';
    benefits = [
      'Housing loan tax benefits guidance',
      'Section 80C and 80D strategic allocation',
      'Long-term capital gains advisory'
    ];
    cta = 'Plan Your Tax Deductions';
    disclaimer = '*Tax benefits are subject to prevailing provisions of the Income Tax Act, 1961.';
    audience = 'Taxpayers, salaried employees, self-employed professionals.';
    objective = 'Encourage proactive annual tax planning through formal advisory.';
    visualDirection = 'Clean minimalist financial desk with documents, fountain pen, and financial calculator.';
  } else if (normalizedKey === 'diwali') {
    topicBadge = 'FESTIVE GREETINGS';
    const headlines = [
      'PROSPERITY THAT SHINES THROUGH GENERATIONS',
      'MAY PROSPERITY ILLUMINATE YOUR PATH',
      'WISHING YOU AN AUSPICIOUS & JOYFUL DIWALI',
      'LIGHTING THE WAY TO FINANCIAL WELLNESS'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'MoneyPlant Finserve wishes you and your family enduring health, happiness, and prosperity.';
    supportingCopy = 'As you celebrate auspicious beginnings with family, may your endeavors be blessed with abundance, stability, and enduring growth.';
    benefits = [
      'Enduring prosperity & peace of mind',
      'Auspicious new financial beginnings',
      'Trusted partnership in every season'
    ];
    cta = 'Celebrate with MoneyPlant';
    disclaimer = 'Wishing our valued clients and partners a blessed and luminous Diwali.';
    audience = 'All clients, institutional partners, families.';
    objective = 'Deliver formal, dignified festive greetings preserving corporate stature.';
    visualDirection = 'Warm brass diyas with soft golden illumination and elegant deep green background.';
  } else if (normalizedKey === 'republic-day' || normalizedKey === 'independence-day') {
    const isRep = normalizedKey === 'republic-day';
    topicBadge = isRep ? 'REPUBLIC DAY' : 'INDEPENDENCE DAY';
    headline = isRep ? 'HONORING THE SPIRIT OF OUR NATION' : 'EMPOWERING INDIA’S ECONOMIC GROWTH';
    subheadline = 'Saluting the resilience, diversity, and rapid economic progress of modern India.';
    supportingCopy = 'As Indian industry moves forward with self-reliance and ambition, MoneyPlant Finserve remains committed to supporting Indian enterprises and families.';
    benefits = [
      'Fueling national enterprise momentum',
      'Empowering MSME development',
      'Building lasting financial resilience'
    ];
    cta = 'Proud to Serve India';
    disclaimer = 'Proudly supporting the financial aspirations of Indian businesses and households.';
    audience = 'Nationwide clients, partners, citizens.';
    objective = 'Celebrate national milestones with patriotic and economic pride.';
    visualDirection = 'Dignified architectural monument with elegant tricolor lighting and refined bokeh.';
  } else if (normalizedKey === 'womens-day') {
    topicBadge = 'SPECIAL OCCASION';
    const headlines = [
      'EMPOWERING WOMEN IN ENTERPRISE',
      'HONORING LEADERSHIP & RESILIENCE',
      'DRIVING FINANCIAL AUTONOMY AND GROWTH',
      'CELEBRATING VISIONARY WOMEN FOUNDERS'
    ];
    headline = headlines[seed % headlines.length];
    subheadline = 'Saluting the visionary women shaping industries, leading enterprises, and inspiring communities.';
    supportingCopy = 'Financial autonomy is the foundation of enduring empowerment. We partner with women entrepreneurs to provide accessible, fluent credit guidance.';
    benefits = [
      'Dedicated entrepreneur advisory',
      'Structured business financing',
      'Transparent lender evaluations'
    ];
    cta = 'Empower Your Ambition';
    disclaimer = '*Credit facilities subject to applicable lender criteria and terms.';
    audience = 'Women entrepreneurs, corporate leaders, professionals.';
    objective = 'Champion women in business with dignified, actionable advisory.';
    visualDirection = 'Inspiring Indian woman founder in a contemporary executive strategy room.';
  } else if (normalizedKey === 'customer-appreciation') {
    topicBadge = 'CLIENT PARTNERSHIP';
    headline = 'PARTNERING IN YOUR FINANCIAL SUCCESS';
    subheadline = 'Every milestone we achieve is built upon your valued trust and collaboration.';
    supportingCopy = 'Thank you for choosing MoneyPlant Finserve as your advisory partner. We remain dedicated to speaking financial fluently on your behalf.';
    benefits = [
      'Objective, client-centric guidance',
      'Comprehensive network of 100+ lenders',
      'Decades of combined financial expertise'
    ];
    cta = 'Talk to Our Team';
    disclaimer = 'Committed to transparent and fluent financial guidance.';
    audience = 'Existing clients, business partners, prospective customers.';
    objective = 'Reinforce client loyalty and corporate integrity.';
    visualDirection = 'Warm handshake of business trust in a light-filled contemporary glass boardroom.';
  } else {
    // Dynamic Semantic Fallback
    const words = topicTrimmed.split(/\s+/);
    topicBadge = words.slice(0, 3).join(' ').toUpperCase();
    headline = sanitizeFinancialClaims(`ADVANCING YOUR ${topicTrimmed.toUpperCase()} GOALS`);
    if (headline.length > 36) {
      headline = `STRATEGIC ADVISORY FOR ${topicTrimmed.toUpperCase()}`;
    }
    subheadline = `Structured financial solutions and advisory tailored to ${topicTrimmed}.`;
    supportingCopy = `At MoneyPlant Finserve, we believe every business and personal milestone deserves fluent financial guidance and transparent credit options.`;
    benefits = [
      'Tailored institutional credit solutions',
      'Clear and objective financial guidance',
      'Structured repayment schedules'
    ];
    cta = 'Explore Options';
    audience = 'Entrepreneurs, professionals, and households.';
    objective = `Deliver formal, premium advertising creative for ${topicTrimmed}.`;
    visualDirection = 'Modern corporate business setting with financial advisors and collaborative team.';
  }

  // Strict claim sanitation
  headline = sanitizeFinancialClaims(headline);
  subheadline = sanitizeFinancialClaims(subheadline);
  supportingCopy = sanitizeFinancialClaims(supportingCopy);
  benefits = benefits.map(sanitizeFinancialClaims);

  // Structured Creative Specification
  const spec: CreativeSpec = {
    category,
    categoryLabel: classified.categoryLabel,
    objective,
    audience,
    topicBadge,
    headline,
    subheadline,
    supportingCopy,
    benefits,
    cta,
    disclaimer,
    visualDirection,
    imageComposition: layout === 'layout_b_corporate_split' ? 'split_right' : 'card_hero',
    layoutType: layout,
    colorTreatment: theme,
    typographyStyle: 'bold_display',
    textAlignment: 'left',
    imagePosition: 'right',
    visualIntent: intent,
    visualType,
    visualRelevanceScore: relevance.score,
    visualRelevanceRationale: relevance.rationale,
    semanticImagePrompt,
    flowchartSteps,
    cashCycleNodes,
    creditGaugeData,
    comparisonData,
    benefitTreeData,
    hybridGrowthData
  };

  return {
    id: `creative_${Date.now()}_${seed}`,
    topic: topicTrimmed,
    category,
    categoryLabel: classified.categoryLabel,
    targetAudience: audience,
    purpose: objective,
    layout,
    dimensions,
    style,
    topicBadge,
    headline,
    subheadline,
    supportingCopy,
    featurePoints: benefits,
    ctaText: cta,
    disclaimer,
    brand: MONEYPLANT_BRAND,
    visualConcept: visualDirection,
    imageUrl,
    theme,
    visualIntent: intent,
    visualType,
    visualRelevanceScore: relevance.score,
    visualRelevanceRationale: relevance.rationale,
    semanticImagePrompt,
    flowchartSteps,
    cashCycleNodes,
    creditGaugeData,
    comparisonData,
    benefitTreeData,
    hybridGrowthData,
    spec,
    seed,
    generatedAt: new Date().toISOString()
  };
}
