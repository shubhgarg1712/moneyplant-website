export type CreativeCategory =
  | 'loan_product'
  | 'financial_product'
  | 'financial_education'
  | 'business_marketing'
  | 'festival'
  | 'national_occasion'
  | 'announcement'
  | 'campaign'
  | 'awareness'
  | 'general_social';

export type PosterLayout =
  | 'layout_a_editorial'           // A. Premium Editorial: Large visual + bold headline + minimal copy
  | 'layout_b_corporate_split'     // B. Corporate Split: ~45% text, 55% visual
  | 'layout_c_cinematic_scrim'     // C. Full-Bleed Cinematic: Full background image with elegant gradient scrim
  | 'layout_d_product_showcase'    // D. Premium Product: Large product headline + visual + concise benefits + CTA
  | 'layout_e_executive_finance'   // E. Executive Finance: Dark sophisticated composition + premium financial imagery
  | 'layout_f_clean_financial'     // F. Clean Financial: White background + forest-green typography + structured cards
  | 'layout_g_educational'         // G. Educational: Headline + short explanation + 3 concise educational points
  | 'layout_h_festive_corporate'   // H. Festive Corporate: Elegant festival imagery preserving professional identity
  | 'layout_i_announcement'        // I. Corporate Announcement: Strong headline + clean visual hierarchy + details
  | 'layout_j_service_showcase'    // J. Service Showcase: Professional service-focused layout with strong CTA
  // Backwards compatibility aliases
  | 'layout_a_editorial_split'
  | 'layout_b_card_hero'
  | 'layout_d_bold_headline'
  | 'layout_e_infographic'
  | 'layout_f_festival'
  | 'layout_g_announcement';

export type PosterDimensions =
  | '2160x2160'   // Square (1:1) - 2160 × 2160 px High-Res
  | '2160x2700'   // Portrait (4:5) - 2160 × 2700 px High-Res
  | '3840x2160'   // Landscape (16:9) - 3840 × 2160 px 4K UHD
  | '1080x1080'   // Standard Square
  | '1080x1350';  // Standard Portrait

export type CreativeStyle = 'corporate' | 'premium' | 'minimal' | 'bold' | 'elegant';

export type CreativePurpose = 'product' | 'educational' | 'festival' | 'announcement' | 'general_marketing';

// Visual Intent Classification - The Core Rule: THEME FIRST -> VISUAL SECOND -> DESIGN THIRD
export type VisualIntent =
  | 'product'
  | 'education'
  | 'process'
  | 'comparison'
  | 'explanation'
  | 'benefits'
  | 'dashboard'
  | 'cash_cycle'
  | 'property'
  | 'automotive'
  | 'business'
  | 'festival'
  | 'announcement'
  | 'custom';

// Specific Visual Language Treatment (Never assume "finance = person in office")
export type VisualType =
  | 'photography'
  | 'infographic'
  | 'flowchart'
  | 'cash_cycle'
  | 'credit_gauge'
  | 'comparison'
  | 'benefit_tree'
  | 'hybrid_growth'
  | 'property'
  | 'vehicle'
  | 'festive';

export interface BrandProfile {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  website: string;
  legalEntity: string;
}

export interface CreativeTheme {
  primaryColor: string;       // Deep forest green (#0D3B2E)
  accentColor: string;        // Primary green (#10B981)
  secondaryAccent?: string;   // Secondary green (#34D399) or subtle gold
  backgroundColor: string;    // Main canvas background
  cardBgColor: string;        // Inner container background
  textColor: string;          // Main text color
  mutedTextColor: string;     // Muted secondary text
  badgeBgColor: string;       // Pill badge background
  badgeTextColor: string;     // Pill badge text
  footerBgColor: string;      // Footer background
  footerTextColor: string;    // Footer text
  goldAccent?: string;        // Optional gold accent for festive
  isDarkTheme: boolean;       // Dark or light canvas
}

// -------------------------------------------------------------
// Procedural Financial Infographic Data Models (Rendered at 2160px+)
// -------------------------------------------------------------

export interface FlowchartStep {
  stepNumber: string;        // "01", "02", "03", "04", "05"
  title: string;             // e.g. "ENQUIRY"
  subtitle: string;          // e.g. "Profile Consultation"
  icon: string;              // e.g. "search", "checklist", "document"
}

export interface CashCycleNode {
  id: string;
  label: string;             // "CASH", "INVENTORY", "SALES", "RECEIVABLES"
  sublabel: string;          // "Liquidity", "Stock Purchase", "Turnover", "Realization"
  icon: string;              // "cash", "inventory", "trend_up", "receivables"
}

export interface CreditGaugeFactor {
  name: string;              // "Credit History", "Repayment Pattern", "Credit Utilization"
  impact: string;            // "35% Impact", "30% Impact", "30% Impact"
  desc: string;              // "Consistent on-time repayments"
  weight: string;            // "High", "Critical", "Moderate"
}

export interface CreditGaugeData {
  score: number;             // e.g. 785
  scoreLabel: string;        // e.g. "785 • Excellent Score"
  min: number;               // 300
  max: number;               // 900
  rating: 'Needs Work' | 'Fair' | 'Good' | 'Excellent' | 'Prime';
  factors: CreditGaugeFactor[];
  footnote: string;
}

export interface ComparisonColumn {
  title: string;             // e.g. "HOME LOAN"
  badge: string;             // e.g. "Property Acquisition"
  highlight: boolean;
  points: { label: string; value: string }[];
}

export interface ComparisonData {
  columnA: ComparisonColumn;
  columnB: ComparisonColumn;
  verdictNote?: string;
}

export interface BenefitBranch {
  title: string;             // "INVENTORY", "CASH FLOW", "OPERATIONS"
  desc: string;              // "Buffer stock for peak demands"
  icon: string;              // "inventory", "cash", "trend_up"
  tag?: string;              // "Stock Continuity"
}

export interface BenefitTreeData {
  rootTitle: string;         // "WORKING CAPITAL ENGINE"
  rootDesc: string;          // "Tri-pillar operational momentum"
  branches: BenefitBranch[];
}

export interface HybridGrowthMetric {
  label: string;
  value: string;
  icon: string;
}

export interface HybridGrowthData {
  badge: string;
  chartTitle: string;
  metrics: HybridGrowthMetric[];
  trendValues: number[];     // e.g. [25, 45, 60, 80, 95]
}

// Complete Structured Creative Specification
export interface CreativeSpec {
  category: CreativeCategory;
  categoryLabel: string;
  objective: string;
  audience: string;
  topicBadge: string;
  headline: string;
  subheadline: string;
  supportingCopy: string;
  benefits: string[];
  cta: string;
  disclaimer: string;
  visualDirection: string;
  imageComposition: 'split_right' | 'card_hero' | 'full_bleed' | 'executive_center' | 'floating_island';
  layoutType: PosterLayout;
  colorTreatment: CreativeTheme;
  typographyStyle: 'bold_display' | 'executive_serif' | 'clean_grotesk';
  textAlignment: 'left' | 'center';
  imagePosition: 'right' | 'top' | 'background' | 'center';

  // Theme-Aware Visual Intelligence Metadata
  visualIntent: VisualIntent;
  visualType: VisualType;
  visualRelevanceScore: number;       // 0-100 Conceptual relevance score
  visualRelevanceRationale: string;   // Explanation of why this visual was chosen
  semanticImagePrompt: string;        // Dynamic topic-specific prompt for AI image generator

  // Programmatic Infographic Payloads (Used when visualType is an infographic)
  flowchartSteps?: FlowchartStep[];
  cashCycleNodes?: CashCycleNode[];
  creditGaugeData?: CreditGaugeData;
  comparisonData?: ComparisonData;
  benefitTreeData?: BenefitTreeData;
  hybridGrowthData?: HybridGrowthData;
}

export interface GeneratedCreative {
  id: string;
  topic: string;
  category: CreativeCategory;
  categoryLabel: string;
  targetAudience: string;
  purpose: string;
  layout: PosterLayout;
  dimensions: PosterDimensions;
  style: CreativeStyle;
  
  // Marketing Copy
  topicBadge: string;
  headline: string;
  subheadline: string;
  supportingCopy: string;
  featurePoints: string[];
  ctaText: string;
  disclaimer: string;

  // Exact Brand Profile (unaltered)
  brand: BrandProfile;

  // Visual & Theming
  visualConcept: string;
  imageUrl: string;
  theme: CreativeTheme;

  // Visual Intelligence
  visualIntent: VisualIntent;
  visualType: VisualType;
  visualRelevanceScore: number;
  visualRelevanceRationale: string;
  semanticImagePrompt: string;

  // Infographic Structured Data
  flowchartSteps?: FlowchartStep[];
  cashCycleNodes?: CashCycleNode[];
  creditGaugeData?: CreditGaugeData;
  comparisonData?: ComparisonData;
  benefitTreeData?: BenefitTreeData;
  hybridGrowthData?: HybridGrowthData;

  // Structured Creative Specification
  spec: CreativeSpec;

  // Metadata
  seed: number;
  generatedAt: string;
}

export interface GenerateCreativeRequest {
  topic: string;
  categoryOverride?: CreativeCategory;
  dimensions?: PosterDimensions;
  style?: CreativeStyle;
  purpose?: CreativePurpose;
  layoutOverride?: PosterLayout;
  visualTypeOverride?: VisualType;
  seed?: number;
}
