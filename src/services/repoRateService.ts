import { useState, useEffect } from 'react';

export interface RatesData {
  repoRate: string | null;
  mclrOvernight: string | null;
  rate?: string | null; // for backward compatibility
  name: string;
  source: string;
  sourceUrl: string;
  asOn?: string | null;
  updatedAt: string;
  stale?: boolean;
  error?: string;
}

const CACHE_STORAGE_KEY = 'moneyplant_rbi_rates_v2';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
export const OFFICIAL_RBI_SOURCE_URL = 'https://m.rbi.org.in/scripts/bs_viewcontent.aspx?Id=426';

interface CachedEntry {
  data: RatesData;
  timestamp: number;
}

export async function fetchRates(): Promise<RatesData> {
  const now = Date.now();

  // 1. Check local storage cache
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed: CachedEntry = JSON.parse(raw);
      if (parsed && parsed.data && now - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.data;
      }
    }
  } catch {
    // Ignore localStorage errors
  }

  // 2. Determine endpoints
  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
  const primaryEndpoint = apiBase ? `${apiBase}/api/rates` : '/api/rates';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fallbackEndpoint = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}api/rates.json`;
  const legacyFallbackEndpoint = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}api/repo-rate.json`;

  let lastError: Error | null = null;

  // Try primary endpoint
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(primaryEndpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json: RatesData = await res.json();
      if (json && (json.repoRate || json.mclrOvernight || json.rate)) {
        const normalized: RatesData = {
          ...json,
          repoRate: json.repoRate || json.rate || null,
          mclrOvernight: json.mclrOvernight || null,
          rate: json.repoRate || json.rate || null,
          sourceUrl: json.sourceUrl || OFFICIAL_RBI_SOURCE_URL
        };
        saveToCache(normalized, now);
        return normalized;
      }
    }
  } catch (err: any) {
    lastError = err;
  }

  // Try static deployment fallback
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(fallbackEndpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json: RatesData = await res.json();
      if (json && (json.repoRate || json.mclrOvernight || json.rate)) {
        const normalized: RatesData = {
          ...json,
          repoRate: json.repoRate || json.rate || null,
          mclrOvernight: json.mclrOvernight || null,
          rate: json.repoRate || json.rate || null,
          sourceUrl: json.sourceUrl || OFFICIAL_RBI_SOURCE_URL
        };
        saveToCache(normalized, now);
        return normalized;
      }
    }
  } catch (err: any) {
    lastError = err;
  }

  // Try legacy fallback endpoint if rates.json wasn't found
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(legacyFallbackEndpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json: RatesData = await res.json();
      if (json && (json.repoRate || json.rate)) {
        const normalized: RatesData = {
          ...json,
          repoRate: json.repoRate || json.rate || null,
          mclrOvernight: json.mclrOvernight || null,
          rate: json.repoRate || json.rate || null,
          sourceUrl: OFFICIAL_RBI_SOURCE_URL
        };
        saveToCache(normalized, now);
        return normalized;
      }
    }
  } catch {
    // Ignore
  }

  // If expired cache exists, return it with stale flag
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed: CachedEntry = JSON.parse(raw);
      if (parsed?.data?.repoRate || parsed?.data?.mclrOvernight) {
        return { ...parsed.data, stale: true };
      }
    }
  } catch {
    // Ignore
  }

  console.warn('RBI Rates unavailable:', lastError?.message);
  return {
    repoRate: null,
    mclrOvernight: null,
    rate: null,
    name: 'RBI Current Rates',
    source: 'Reserve Bank of India',
    sourceUrl: OFFICIAL_RBI_SOURCE_URL,
    error: 'Currently unavailable',
    updatedAt: new Date().toISOString()
  };
}

function saveToCache(data: RatesData, timestamp: number) {
  try {
    localStorage.setItem(
      CACHE_STORAGE_KEY,
      JSON.stringify({ data, timestamp })
    );
  } catch {
    // Ignore quota errors
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
    return data?.repoRate || data?.mclrOvernight ? 'success' : 'loading';
  });

  useEffect(() => {
    let isMounted = true;

    const loadRates = async () => {
      try {
        const result = await fetchRates();
        if (!isMounted) return;
        setData(result);
        setStatus(result.repoRate || result.mclrOvernight ? 'success' : 'error');
      } catch {
        if (!isMounted) return;
        setStatus('error');
      }
    };

    loadRates();

    // Auto-refresh periodically every 1 hour (3600000 ms)
    const interval = setInterval(() => {
      loadRates();
    }, CACHE_TTL_MS);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, status };
}

// Backward compatibility export aliases
export const useRepoRate = useRates;
export const fetchRepoRate = fetchRates;
export type RepoRateData = RatesData;
