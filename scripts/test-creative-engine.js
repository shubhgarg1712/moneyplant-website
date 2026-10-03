import {
  generateCreativeConcept,
  detectCreativeCategory,
  classifyVisualIntent,
  calculateVisualRelevance,
  generateSemanticImagePrompt,
  sanitizeFinancialClaims,
  MONEYPLANT_BRAND,
  BRAND_COLORS
} from '../src/services/creativeEngine.ts';

const MANDATORY_TEST_TOPICS = [
  'Business Loan',
  'Home Loan',
  'Car Loan',
  'Used Car Loan',
  'Working Capital',
  'Personal Loan',
  'Loan Against Property',
  'CGTMSE',
  'Why Credit Score Matters',
  'Financial Planning Tips',
  'Diwali',
  'Independence Day',
  'Company Announcement',
  'Startup Machinery Lease'
];

const TARGET_RESOLUTIONS = [
  '2160x2160',
  '2160x2700',
  '3840x2160'
];

console.log('================================================================');
console.log('MONEYPLANT FINSERVE AI CREATIVE STUDIO - PRODUCTION TEST SUITE');
console.log('THEME-AWARE VISUAL INTELLIGENCE & FINANCIAL INFOGRAPHIC VERIFICATION');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// 1. BRAND PROFILE INTEGRITY
console.log('--- TEST GROUP 1: EXACT BRAND PROFILE & REGULATORY DISCLOSURES ---');
assert(MONEYPLANT_BRAND.companyName === 'MONEYPLANT FINSERVE', 'Exact company name: MONEYPLANT FINSERVE');
assert(MONEYPLANT_BRAND.tagline === '“We speak financial fluently”', 'Exact tagline: “We speak financial fluently”');
assert(MONEYPLANT_BRAND.phone === '+91 8178419058', 'Exact phone: +91 8178419058');
assert(MONEYPLANT_BRAND.email === 'info.mpfinserve@gmail.com', 'Exact email: info.mpfinserve@gmail.com');
assert(MONEYPLANT_BRAND.website === 'moneyplant.in', 'Exact website: moneyplant.in');
assert(BRAND_COLORS.deepForest === '#0D3B2E', 'Brand Primary Forest Green: #0D3B2E');
assert(BRAND_COLORS.primaryGreen === '#10B981', 'Brand Fresh Green: #10B981');
assert(BRAND_COLORS.secondaryGreen === '#34D399', 'Brand Secondary Green: #34D399');

// 2. FINANCIAL CLAIM SAFETY & NEUTRALITY
console.log('\n--- TEST GROUP 2: FINANCIAL CLAIM SAFETY & NEUTRALITY ---');
const unsafe1 = '100% approval guaranteed with lowest interest rate!';
const safe1 = sanitizeFinancialClaims(unsafe1);
assert(!safe1.includes('100% approval'), 'Prohibits "100% approval"');
assert(!safe1.includes('lowest interest rate'), 'Prohibits "lowest interest rate"');

const unsafe2 = 'Instant approval and zero documentation guaranteed returns!';
const safe2 = sanitizeFinancialClaims(unsafe2);
assert(!safe2.includes('Instant approval'), 'Prohibits "Instant approval"');
assert(!safe2.includes('zero documentation'), 'Prohibits "zero documentation"');
assert(!safe2.includes('guaranteed returns'), 'Prohibits "guaranteed returns"');

// 3. MANDATORY 14 TEST TOPICS & CREATIVE SPEC GENERATION
console.log('\n--- TEST GROUP 3: MANDATORY 14 TOPICS & CREATIVE SPEC GENERATION ---');
for (const topic of MANDATORY_TEST_TOPICS) {
  const creative = generateCreativeConcept({ topic, seed: 101 });
  
  assert(!!creative.category, `[${topic}] Categorized into: ${creative.categoryLabel} (${creative.category})`);
  assert(!!creative.headline, `[${topic}] Headline: "${creative.headline}"`);
  
  // Headline length check (generally 3 to 10 words)
  const wordCount = creative.headline.split(/\s+/).length;
  assert(wordCount >= 3 && wordCount <= 10, `[${topic}] Headline word count is professional (${wordCount} words)`);
  
  // Anti-laziness check: Should NOT be just "Get [Topic]" or "[Topic] Now"
  assert(!creative.headline.toLowerCase().startsWith('get '), `[${topic}] Headline is creative and does not begin with "Get "`);
  
  // Subheadline check
  assert(!!creative.subheadline && creative.subheadline.length > 20, `[${topic}] Subheadline is formal and complete`);
  
  // Benefits check (2-4 concise points)
  assert(Array.isArray(creative.featurePoints) && creative.featurePoints.length >= 3, `[${topic}] Has ${creative.featurePoints.length} structured benefits`);
  
  // CTA check
  assert(!!creative.ctaText && !creative.ctaText.includes('!!!'), `[${topic}] Professional CTA: "${creative.ctaText}"`);
  
  // Disclaimer check
  assert(!!creative.disclaimer && creative.disclaimer.length > 10, `[${topic}] Disclaimer: "${creative.disclaimer}"`);
  
  // High-res visual URL check
  assert(!!creative.imageUrl && creative.imageUrl.startsWith('https://'), `[${topic}] High-res visual: ${creative.imageUrl.slice(0, 45)}...`);
  
  // CreativeSpec integrity check
  assert(!!creative.spec && creative.spec.headline === creative.headline, `[${topic}] Structured CreativeSpec verified`);
}

// 4. RESOLUTION FORMATS (2160x2160, 2160x2700, 3840x2160)
console.log('\n--- TEST GROUP 4: PRODUCTION RESOLUTION SPECIFICATIONS ---');
for (const res of TARGET_RESOLUTIONS) {
  const creative = generateCreativeConcept({ topic: 'Business Loan', dimensions: res });
  assert(creative.dimensions === res, `Output format configured for ${res}`);
}

// 5. REGENERATION INVARIANCE & MUTATION
console.log('\n--- TEST GROUP 5: REGENERATION INVARIANCE & MUTATION ---');
const r1 = generateCreativeConcept({ topic: 'Business Loan', seed: 10 });
const r2 = generateCreativeConcept({ topic: 'Business Loan', seed: 25 });

assert(r1.headline !== r2.headline || r1.layout !== r2.layout, 'Regeneration produces distinct headline and/or layout');
assert(r1.brand.phone === r2.brand.phone, 'Brand phone is invariant on regeneration');
assert(r1.brand.website === r2.brand.website, 'Brand website is invariant on regeneration');
assert(r1.brand.companyName === r2.brand.companyName, 'Brand name is invariant on regeneration');

// 6. THEME-AWARE VISUAL INTENT & INFOGRAPHIC PAYLOAD VERIFICATION
console.log('\n--- TEST GROUP 6: THEME-AWARE VISUAL INTENT & INFOGRAPHIC SYSTEM ---');

// A. Working Capital -> Circular Cash Cycle
const wc = generateCreativeConcept({ topic: 'Working Capital' });
assert(wc.visualIntent === 'cash_cycle', 'Working Capital classified into intent "cash_cycle"');
assert(wc.visualType === 'cash_cycle', 'Working Capital selected visualType "cash_cycle" (NOT generic businessman)');
assert(Array.isArray(wc.cashCycleNodes) && wc.cashCycleNodes.length === 4, 'Working Capital contains 4 circular nodes (Cash, Inventory, Sales, Receivables)');
assert(wc.cashCycleNodes[0].label === 'CASH', 'Working Capital cycle starts with CASH');
assert(wc.cashCycleNodes[1].label === 'INVENTORY', 'Working Capital cycle flows to INVENTORY');
assert(wc.cashCycleNodes[2].label === 'SALES', 'Working Capital cycle flows to SALES');
assert(wc.cashCycleNodes[3].label === 'RECEIVABLES', 'Working Capital cycle flows to RECEIVABLES');

// B. Process Topic -> 5-Stage Flowchart
const proc = generateCreativeConcept({ topic: 'How a Loan Works' });
assert(proc.visualIntent === 'process', '"How a Loan Works" classified into intent "process"');
assert(proc.visualType === 'flowchart', '"How a Loan Works" selected visualType "flowchart"');
assert(Array.isArray(proc.flowchartSteps) && proc.flowchartSteps.length === 5, 'Flowchart contains 5 sequential stages (01 to 05)');
assert(proc.flowchartSteps[0].title === 'ENQUIRY', 'Stage 01 is ENQUIRY');
assert(proc.flowchartSteps[1].title === 'ELIGIBILITY', 'Stage 02 is ELIGIBILITY');
assert(proc.flowchartSteps[2].title === 'DOCUMENTATION', 'Stage 03 is DOCUMENTATION');
assert(proc.flowchartSteps[3].title === 'ASSESSMENT', 'Stage 04 is ASSESSMENT');
assert(proc.flowchartSteps[4].title === 'DISBURSEMENT*', 'Stage 05 is DISBURSEMENT*');

// C. Credit Score Topic -> Calibrated Gauge Dashboard
const cs = generateCreativeConcept({ topic: 'Why Credit Score Matters' });
assert(cs.visualIntent === 'dashboard', '"Why Credit Score Matters" classified into intent "dashboard"');
assert(cs.visualType === 'credit_gauge', '"Why Credit Score Matters" selected visualType "credit_gauge"');
assert(!!cs.creditGaugeData && cs.creditGaugeData.score > 700, 'Credit Gauge data calibrated with prime score');
assert(cs.creditGaugeData.min === 300 && cs.creditGaugeData.max === 900, 'Credit scale covers 300 to 900');
assert(cs.creditGaugeData.factors.length >= 3, 'Credit gauge details 3 key driver factors (History, Repayment, Utilization)');

// D. Comparison Topic -> Dual Column Comparative Grid
const comp = generateCreativeConcept({ topic: 'Home Loan vs Loan Against Property' });
assert(comp.visualIntent === 'comparison', 'Comparative query classified into intent "comparison"');
assert(comp.visualType === 'comparison', 'Comparative query selected visualType "comparison"');
assert(!!comp.comparisonData && !!comp.comparisonData.columnA && !!comp.comparisonData.columnB, 'Comparison data has dual columns (Column A and Column B)');
assert(comp.comparisonData.columnA.title === 'HOME LOAN', 'Column A compares HOME LOAN');
assert(comp.comparisonData.columnB.title === 'LOAN AGAINST PROPERTY', 'Column B compares LOAN AGAINST PROPERTY');

// E. Home Loan -> Architecture Visual
const hl = generateCreativeConcept({ topic: 'Home Loan' });
assert(hl.visualIntent === 'property', 'Home Loan classified into intent "property"');
assert(hl.visualType === 'property', 'Home Loan selected visualType "property" (NOT random office person)');

// F. Car Loan -> Automotive Visual
const cl = generateCreativeConcept({ topic: 'Car Loan' });
assert(cl.visualIntent === 'automotive', 'Car Loan classified into intent "automotive"');
assert(cl.visualType === 'vehicle', 'Car Loan selected visualType "vehicle" (NOT generic office worker)');

// G. Business Loan -> Hybrid Growth Visual
const bl = generateCreativeConcept({ topic: 'Business Loan' });
assert(bl.visualIntent === 'business', 'Business Loan classified into intent "business"');
assert(bl.visualType === 'hybrid_growth', 'Business Loan selected visualType "hybrid_growth"');
assert(!!bl.hybridGrowthData && bl.hybridGrowthData.metrics.length >= 3, 'Business Loan includes enterprise milestones');

// H. Benefits Topic -> Benefit Tree
const ben = generateCreativeConcept({ topic: 'Benefits of Working Capital' });
assert(ben.visualIntent === 'benefits', '"Benefits of Working Capital" classified into intent "benefits"');
assert(ben.visualType === 'benefit_tree', '"Benefits of Working Capital" selected visualType "benefit_tree"');
assert(!!ben.benefitTreeData && ben.benefitTreeData.branches.length === 3, 'Benefit tree includes 3 structured branches');

// 7. CONCEPTUAL VISUAL RELEVANCE SCORING
console.log('\n--- TEST GROUP 7: CONCEPTUAL VISUAL RELEVANCE SCORING ---');
const testCases = [
  { topic: 'Working Capital', minScore: 95 },
  { topic: 'How a Loan Works', minScore: 95 },
  { topic: 'Why Credit Score Matters', minScore: 95 },
  { topic: 'Home Loan vs Loan Against Property', minScore: 95 },
  { topic: 'Home Loan', minScore: 95 },
  { topic: 'Car Loan', minScore: 95 },
  { topic: 'Business Loan', minScore: 95 },
  { topic: 'Diwali', minScore: 95 }
];

for (const tc of testCases) {
  const c = generateCreativeConcept({ topic: tc.topic });
  assert(c.visualRelevanceScore >= tc.minScore, `[${tc.topic}] Visual relevance score is ${c.visualRelevanceScore}% (>= ${tc.minScore}%)`);
  assert(c.visualRelevanceRationale.length > 20, `[${tc.topic}] Rationale provided: "${c.visualRelevanceRationale.slice(0, 50)}..."`);
}

// 8. DYNAMIC SEMANTIC AI PROMPT GENERATION
console.log('\n--- TEST GROUP 8: SEMANTIC VISUAL PROMPT GENERATION ---');
for (const tc of testCases) {
  const c = generateCreativeConcept({ topic: tc.topic });
  assert(c.semanticImagePrompt.length > 50, `[${tc.topic}] Dynamic semantic prompt generated (${c.semanticImagePrompt.length} chars)`);
  assert(c.semanticImagePrompt.includes('green') || c.semanticImagePrompt.includes('corporate') || c.semanticImagePrompt.includes('financial'), `[${tc.topic}] Prompt aligns with MoneyPlant brand aesthetic`);
  assert(c.semanticImagePrompt.toLowerCase().includes('no text') || c.semanticImagePrompt.toLowerCase().includes('no logo'), `[${tc.topic}] Prompt protects logo and text clean canvas separation`);
}

console.log('\n================================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log('================================================================\n');

if (passedTests === totalTests) {
  console.log('🎉 ALL THEME-AWARE VISUAL INTELLIGENCE & PRODUCTION ACCEPTANCE CRITERIA VERIFIED!');
}
