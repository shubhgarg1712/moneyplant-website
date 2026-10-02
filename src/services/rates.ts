import { useState, useEffect, useCallback } from 'react';

export interface RatesData {
  success: boolean;
  repoRate: string | null;
  mclrOvernight: string | null;
  rate?: string | null; // backward compatibility
  lastUpdated: string;
  source: string;
  sourceUrl: string;
  asOn?: string | null;
  stale?: boolean;
  error?: string;
}

const CACHE_STORAGE_KEY = 'moneyplant_rates_cache_v3';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache duration
export const OFFICIAL_RBI_SOURCE_URL = 'https://m.rbi.org.in/scripts/bs_viewcontent.aspx?Id=426';

interface CachedEntry {
  data: RatesData;
  timestamp: number;
}

// Validate rate format (must contain percentage, e.g. 5.25% or 7.80% – 8.00%)
function isValidRateString(val: unknown): val is string {
  if (typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (!trimmed || trimmed === 'NaN' || trimmed === 'undefined' || trimmed === 'null') return false;
  return /^\d+(\.\d+)?%(\s*[-–—]\s*\d+(\.\d+)?%)?$/.test(trimmed);
}

export async function fetchRates(): Promise<RatesData> {
  const now = Date.now();

  // 1. Check client-side localStorage cache
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed: CachedEntry = JSON.parse(raw);
      if (parsed && parsed.data && now - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.data;
      }
    }
  } catch {
    // Ignore storage errors
  }

  // 2. Resolve production API URL vs. GitHub Pages hosted snapshot
  // VITE_RATES_API_URL can be set in production to an external serverless endpoint
  const configuredApiUrl = (import.meta.env.VITE_RATES_API_URL || '').trim();
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const staticFallbackEndpoint = `${cleanBase}api/rates.json`;

  const endpointsToTry: string[] = [];

  if (configuredApiUrl) {
    endpointsToTry.push(configuredApiUrl);
  }
  // Try relative /api/rates (for Vercel serverless / dev server proxy)
  endpointsToTry.push('/api/rates');
  // Try GitHub Pages hosted static live JSON
  endpointsToTry.push(staticFallbackEndpoint);

  let lastError: Error | null = null;

  for (const endpoint of endpointsToTry) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(endpoint, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });
      clearTimeout(timeout);

      if (response.ok) {
        const json = await response.json();
        const repo = json.repoRate || json.rate;
        const mclr = json.mclrOvernight;

        // Validate values
        const isRepoValid = isValidRateString(repo);
        const isMclrValid = isValidRateString(mclr);

        if (isRepoValid || isMclrValid) {
          const validatedData: RatesData = {
            success: true,
            repoRate: isRepoValid ? repo.trim() : null,
            mclrOvernight: isMclrValid ? mclr.trim().replace(/\s*[-–—]\s*/, ' – ') : null,
            rate: isRepoValid ? repo.trim() : null,
            lastUpdated: json.lastUpdated || json.updatedAt || new Date().toISOString(),
            source: json.source || 'Reserve Bank of India',
            sourceUrl: json.sourceUrl || OFFICIAL_RBI_SOURCE_URL,
            asOn: json.asOn || null,
            stale: Boolean(json.stale)
          };

          saveToCache(validatedData, now);
          return validatedData;
        }
      }
    } catch (err: any) {
      lastError = err;
    }
  }

  // 3. If all requests failed, return stale cache if available
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed: CachedEntry = JSON.parse(raw);
      if (parsed?.data && (parsed.data.repoRate || parsed.data.mclrOvernight)) {
        return {
          ...parsed.data,
          stale: true
        };
      }
    }
  } catch {
    // Ignore
  }

  console.warn('Rates service: Could not retrieve fresh RBI rates:', lastError?.message);

  return {
    success: false,
    repoRate: null,
    mclrOvernight: null,
    rate: null,
    lastUpdated: new Date().toISOString(),
    source: 'Reserve Bank of India',
    sourceUrl: OFFICIAL_RBI_SOURCE_URL,
    error: 'Rates temporarily unavailable'
  };
}

function saveToCache(data: RatesData, timestamp: number) {
  try {
    localStorage.setItem(
      CACHE_STORAGE_KEY,
      JSON.stringify({ data, timestamp })
    );
  } catch {
    // Ignore quota issues
  }
}

export function useRates() {
  const [data, setData] = useState<RatesData | null>(() => {
    try {
      const raw = localStorage.getItem(CACHE_STORAGE_KEY);
      if (raw) {
        const parsed: CachedEntry = JSON.parse(raw);
        if (parsed?.data) return parsed.data;
      }
    } catch {
      // Ignore
    }
    return null;
  });

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(() => {
    return data && (data.repoRate || data.mclrOvernight) ? 'success' : 'loading';
  });

  const loadData = useCallback(async () => {
    try {
      const result = await fetchRates();
      setData(result);
      if (result.success && (result.repoRate || result.mclrOvernight)) {
        setStatus('success');
      } else if (result.repoRate || result.mclrOvernight) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadData();

    // Refresh every 1 hour (3600000 ms)
    const interval = setInterval(() => {
      loadData();
    }, CACHE_TTL_MS);

    // Refresh on tab visibility if last fetch is older than 1 hour
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        try {
          const raw = localStorage.getItem(CACHE_STORAGE_KEY);
          if (raw) {
            const parsed: CachedEntry = JSON.parse(raw);
            if (Date.now() - parsed.timestamp >= CACHE_TTL_MS) {
              loadData();
            }
          } else {
            loadData();
          }
        } catch {
          loadData();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadData]);

  return { data, status, refresh: loadData };
}

// Compatibility exports
export const useRepoRate = useRates;
export const fetchRepoRate = fetchRates;
export type RepoRateData = RatesData;
