import type { VercelRequest, VercelResponse } from '@vercel/node';

interface RatesData {
  repoRate: string | null;
  mclrOvernight: string | null;
  rate?: string | null;
  name: string;
  source: string;
  sourceUrl: string;
  asOn?: string | null;
  updatedAt: string;
  stale?: boolean;
  error?: string;
}

let inMemoryCache: { data: RatesData; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache
const RBI_URL = 'https://m.rbi.org.in/scripts/bs_viewcontent.aspx?Id=426';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const now = Date.now();

  // Return fresh cached data if within 1 hour
  if (inMemoryCache && now - inMemoryCache.timestamp < CACHE_TTL_MS) {
    return res.status(200).json(inMemoryCache.data);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const rbiResponse = await fetch(RBI_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    clearTimeout(timeout);

    if (!rbiResponse.ok) {
      throw new Error(`RBI responded with HTTP ${rbiResponse.status}`);
    }

    const html = await rbiResponse.text();

    const repoMatch = html.match(/Policy\s*Repo\s*Rate[\s\S]*?([0-9.]+\s*%)/i);
    const mclrMatch = html.match(/MCLR\s*\(\s*Overnight\s*\)[\s\S]*?([0-9.]+\s*%\s*(?:[-–—]\s*[0-9.]+\s*%)?)/i);
    const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '');
    const dateMatch = cleanHtml.match(/as\s*on\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i);

    const repoRate = repoMatch ? repoMatch[1].trim() : (inMemoryCache?.data?.repoRate || null);
    const mclrOvernight = mclrMatch ? mclrMatch[1].trim().replace(/\s*[-–—]\s*/, ' – ') : (inMemoryCache?.data?.mclrOvernight || null);

    if (!repoRate && !mclrOvernight) {
      throw new Error('Could not parse Repo Rate or MCLR from RBI page');
    }

    const freshData: RatesData = {
      repoRate,
      mclrOvernight,
      rate: repoRate,
      name: 'RBI Current Rates',
      source: 'Reserve Bank of India',
      sourceUrl: RBI_URL,
      asOn: dateMatch ? dateMatch[1].trim() : null,
      updatedAt: new Date().toISOString()
    };

    inMemoryCache = { data: freshData, timestamp: now };
    return res.status(200).json(freshData);
  } catch (error: any) {
    console.error('Error fetching RBI Rates:', error?.message || error);

    if (inMemoryCache) {
      return res.status(200).json({
        ...inMemoryCache.data,
        stale: true
      });
    }

    return res.status(503).json({
      repoRate: null,
      mclrOvernight: null,
      rate: null,
      name: 'RBI Current Rates',
      source: 'Reserve Bank of India',
      sourceUrl: RBI_URL,
      error: 'Currently unavailable',
      updatedAt: new Date().toISOString()
    });
  }
}
