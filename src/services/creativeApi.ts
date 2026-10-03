import {
  GenerateCreativeRequest,
  GeneratedCreative
} from '../types/creative';
import {
  generateCreativeConcept,
  detectCreativeCategory,
  selectPosterLayout,
  buildCreativeTheme,
  sanitizeFinancialClaims,
  MONEYPLANT_BRAND
} from './creativeEngine';

export async function fetchOrGenerateCreative(request: GenerateCreativeRequest): Promise<GeneratedCreative> {
  const seed = request.seed ?? Math.floor(Math.random() * 10000);
  const cleanTopic = request.topic.trim();

  // 1. Generate local deterministic base creative first (guaranteed 100% reliability)
  const localBase = generateCreativeConcept({
    ...request,
    seed
  });

  // 2. Try calling secure serverless API if available
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const apiBase = import.meta.env.BASE_URL.replace(/\/$/, '');
    const endpoints = ['/api/generate-creative', `${apiBase}/api/generate-creative`];

    let response: Response | null = null;
    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: cleanTopic,
            categoryOverride: request.categoryOverride,
            dimensions: request.dimensions,
            style: request.style,
            seed
          })
        });
        if (res.ok) {
          response = res;
          break;
        }
      } catch {
        // try next
      }
    }
    clearTimeout(timeout);

    if (response && response.ok) {
      const json = await response.json();
      if (json.aiGenerated && json.data) {
        const ai = json.data;

        // Apply strict safety sanitation even to AI outputs
        const cleanHeadline = sanitizeFinancialClaims(ai.headline || localBase.headline);
        const cleanSubheadline = sanitizeFinancialClaims(ai.subheadline || localBase.subheadline);
        const cleanSupportingCopy = sanitizeFinancialClaims(ai.supportingCopy || localBase.supportingCopy);
        const cleanFeatures = Array.isArray(ai.featurePoints) && ai.featurePoints.length > 0
          ? ai.featurePoints.map((f: string) => sanitizeFinancialClaims(f))
          : localBase.featurePoints;

        return {
          ...localBase,
          headline: cleanHeadline,
          subheadline: cleanSubheadline,
          supportingCopy: cleanSupportingCopy,
          featurePoints: cleanFeatures,
          topicBadge: ai.topicBadge || localBase.topicBadge,
          ctaText: ai.ctaText || localBase.ctaText,
          disclaimer: ai.disclaimer || localBase.disclaimer,
          visualConcept: ai.visualConcept || localBase.visualConcept,
          brand: MONEYPLANT_BRAND, // Never mutated
          spec: {
            ...localBase.spec,
            headline: cleanHeadline,
            subheadline: cleanSubheadline,
            supportingCopy: cleanSupportingCopy,
            benefits: cleanFeatures,
            topicBadge: ai.topicBadge || localBase.topicBadge,
            cta: ai.ctaText || localBase.ctaText,
            disclaimer: ai.disclaimer || localBase.disclaimer
          }
        };
      }
    }
  } catch (apiErr) {
    console.info('Using local MoneyPlant Creative Intelligence Engine:', apiErr);
  }

  // Return local base creative
  return localBase;
}
