import type { VercelRequest, VercelResponse } from '@vercel/node';

const ALLOWED_ORIGINS = [
  'https://shubhgarg1712.github.io',
  'https://moneyplant.in',
  'https://www.moneyplant.in'
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS configuration
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.github.io') || origin.endsWith('.vercel.app') || origin.includes('localhost')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { topic, categoryOverride, dimensions = '1080x1080', style = 'premium', seed } = req.body || {};

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return res.status(400).json({ error: 'Missing or invalid "topic" in request body.' });
    }

    const cleanTopic = topic.trim();
    const effectiveSeed = typeof seed === 'number' ? seed : Math.floor(Math.random() * 10000);

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    let geminiResult: any = null;

    if (apiKey) {
      try {
        const prompt = `You are the Lead Marketing Officer and Creative Director for MONEYPLANT FINSERVE, a premier Indian financial services & advisory firm.
Tagline: "We speak financial fluently"
Phone: +91 8178419058 | Website: moneyplant.in

Task: Create a marketing poster copy package for the topic: "${cleanTopic}".

COMPLIANCE & BRAND SAFETY RULES (MANDATORY):
1. NEVER use prohibited claims: "100% approval", "guaranteed approval", "lowest interest rate", "zero documentation", "instant approval", "zero risk", "guaranteed returns".
2. Use qualified terms: "subject to eligibility", "subject to lender terms", "competitive rates*", "streamlined documentation*".
3. Return ONLY valid JSON with this exact schema:
{
  "category": "loan_product" | "financial_product" | "financial_education" | "festival" | "national_occasion" | "announcement" | "campaign" | "general_social",
  "categoryLabel": string (e.g. "Business Financing" or "Festive Celebration"),
  "topicBadge": string (e.g. "✦ BUSINESS FINANCING SOLUTIONS"),
  "headline": string (punchy uppercase, max 8-10 words, high impact),
  "subheadline": string (one clear sentence),
  "supportingCopy": string (1-2 sentences),
  "featurePoints": [3 concise bullet items, max 6 words each],
  "ctaText": string (e.g. "Explore Loan Options"),
  "disclaimer": string (compliant footnote),
  "visualConcept": string (description of photographic visual without any text)
}`;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.7
              }
            })
          }
        );
        clearTimeout(timeout);

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            geminiResult = JSON.parse(rawText);
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to local intelligence engine:', geminiErr);
      }
    }

    return res.status(200).json({
      success: true,
      topic: cleanTopic,
      dimensions,
      style,
      seed: effectiveSeed,
      aiGenerated: !!geminiResult,
      data: geminiResult
    });
  } catch (error: any) {
    console.error('Error generating creative:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error while generating creative.'
    });
  }
}
