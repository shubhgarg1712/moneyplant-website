# MoneyPlant Finserve AI Marketing Poster Generator (Ultra-HD Agency Edition)

An agency-grade, high-resolution AI marketing creative generator built specifically for **MONEYPLANT FINSERVE**.

---

## 🌟 Overview

The generator transforms single-keyword topics into formal, corporate, high-resolution advertising creatives for:
- **Commercial & MSME Loans**: Business Loan, Working Capital, CGTMSE, Machinery Loans, Project Finance.
- **Retail & Housing Credit**: Home Loan, Personal Loan, Car Loan, Used Car Loan, Loan Against Property (LAP).
- **Financial Advisory**: Financial Planning Tips, Wealth Advisory, Tax Saving (Section 80C), Portfolio Review.
- **Credit Education**: Why Credit Score Matters, CIBIL Health, Debt Restructuring.
- **Festivals & Campaigns**: Diwali, Holi, Eid, Christmas, New Year, Customer Appreciation.
- **National & Corporate Occasions**: Republic Day, Independence Day, Women's Day, New Service Launch, Announcements.

---

## 📐 Genuine High-Resolution Production Outputs

The production canvas renders natively at the target resolution — **no upscaling of low-res images**:

| Format | Dimensions | Aspect Ratio | Primary Use |
| :--- | :--- | :--- | :--- |
| **Square** | **2160 × 2160 px** | 1:1 | Instagram, LinkedIn, WhatsApp Feed, Website |
| **Portrait** | **2160 × 2700 px** | 4:5 | Instagram Portrait, WhatsApp Status, LinkedIn Feed |
| **Landscape** | **3840 × 2160 px** | 16:9 | 4K UHD Presentation, Website Banner, Large Display |

Safe Margins:
- **Square & Portrait**: 80–100px (e.g. 96px)
- **Landscape**: 100–140px (e.g. 120px)

---

## 🚀 Two-Stage Generation Pipeline

```
[ User Input: e.g. "Business Loan" ]
               ↓
    [ Generate Creative ✨ ]
               ↓
Stage 1: Intent & CreativeSpec Engine
  • Classifies topic into formal finance category
  • Formulates CreativeSpec (Objective, Audience, Headline, Subheadline, Benefits, CTA, Layout)
  • Agency-grade copywriting (3–8 word headlines, concise 1–2 sentence narrative, 2–4 bullet benefits)
  • Automated compliance filter: strictly strips "100% approval" or "guaranteed loan" promises
  • Resolves ultra-high-definition (2400px–3840px) commercial photography
               ↓
Stage 2: Production Canvas Compositor
  • Renders directly onto the 2160px / 3840px production canvas
  • Vector SVG MoneyPlant logo rendered mathematically razor-sharp
  • Applies high-resolution typography with Plus Jakarta Sans & Inter
  • Dynamic layout selection from 10 adaptive corporate compositions
  • Compact official footer with verified contact info and compliance footnote
               ↓
[ Responsive Preview Display  →  Download High-Resolution PNG  →  Copy Image ]
```

---

## 🎨 10 Adaptive Corporate Layouts

1. **Layout A (Premium Editorial)**: Large visual + 3-6 word bold headline + minimal copy.
2. **Layout B (Corporate Split)**: ~45% text column, 55% framed commercial visual with advantage badge.
3. **Layout C (Cinematic Scrim)**: Full-bleed visual background with elegant multi-stop dark forest gradient scrim.
4. **Layout D (Product Showcase)**: Large product headline + visual card + green checkmark eligibility cards + loan CTA.
5. **Layout E (Executive Finance)**: Dark sophisticated composition (#071A14) + premium financial imagery + restrained typography.
6. **Layout F (Clean Financial)**: Crisp pure white background + forest green typography + structured cards.
7. **Layout G (Educational)**: Numbered pillar cards (01, 02, 03, 04) + MoneyPlant Advisory Note box.
8. **Layout H (Festive Corporate)**: Warm brass diyas/bokeh + golden ornamental frame + dignified blessings, preserving corporate stature.
9. **Layout I (Corporate Announcement)**: Clean official announcement badge + key highlights card + modern CTA.
10. **Layout J (Service Showcase)**: High-impact service overview with structured checklist and direct consultation CTA.

---

## 🛡️ Brand & Regulatory Compliance Guardrails

1. **Exact Official Brand Assets**:
   - Company: `MONEYPLANT FINSERVE`
   - Tagline: `“We speak financial fluently”`
   - Phone: `+91 8178419058`
   - Email: `info.mpfinserve@gmail.com`
   - Website: `moneyplant.in`
   - Vector Emblem: Exact MoneyPlant rounded green badge with sprouting leaf motifs and golden prosperity accent.

2. **Strict Financial Claim Sanitation**:
   - Automatically detects and replaces non-compliant phrases:
     - ❌ "100% approval" → `Tailored Financing`
     - ❌ "Guaranteed approval" → `Transparent Advisory`
     - ❌ "Lowest interest rate" → `Competitive Interest Rates*`
     - ❌ "Zero documentation" → `Streamlined Paperwork*`
     - ❌ "Instant approval" → `Swift Processing*`
   - Mandatory compliance footnote: `"Subject to applicable eligibility criteria and lender terms."`

---

## 💻 Running the Application

### 1. Standalone Mode (in `New folder`)
```bash
npm install
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### 2. Integrated Mode (in `website`)
```bash
npm install
npm run dev
```
Open [http://localhost:3000/#creative-studio](http://localhost:3000/#creative-studio) or click **"AI Poster Studio"** in the top navigation bar.

### 3. Automated Validation Suite
```bash
npx vite-node scripts/test-creative-engine.js
```
Runs 160 unit/integration tests across all 14 mandatory topics, 3 target resolutions, and safety sanitizers.
