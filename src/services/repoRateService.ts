import { useState, useEffect } from 'react';

export interface RepoRateData {
  rate: string | null;
  name: string;
  source: string;
  sourceUrl: string;
  asOn?: string | null;
  updatedAt: string;
  stale?: boolean;
  error?: string;
}

const CACHE_STORAGE_KEY = 'moneyplant_rbi_repo_rate_v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
export const OFFICIAL_RBI_SOURCE_URL = 'https://m.rbi.org.in/scripts/bs_speechesview.aspx?id=1352';

interface CachedEntry {
  data: RepoRateData;
  timestamp: number;
}

export async function fetchRepoRate(): Promise<RepoRateData> {
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
  const primaryEndpoint = apiBase ? `${apiBase}/api/repo-rate` : '/api/repo-rate';
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fallbackEndpoint = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}api/repo-rate.json`;

  let lastError: Error | null = null;

  // Try primary serverless/proxy endpoint
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(primaryEndpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json: RepoRateData = await res.json();
      if (json && json.rate) {
        saveToCache(json, now);
        return json;
      }
    }
  } catch (err: any) {
    lastError = err;
  }

  // Fallback to static deployment snapshot
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(fallbackEndpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json: RepoRateData = await res.json();
      if (json && json.rate) {
        saveToCache(json, now);
        return json;
      }
    }
  } catch (err: any) {
    lastError = err;
  }

  // If we have an expired cached value, use it temporarily with stale flag
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed: CachedEntry = JSON.parse(raw);
      if (parsed?.data?.rate) {
        return { ...parsed.data, stale: true };
      }
    }
  } catch {
    // Ignore
  }

  console.warn('RBI Repo Rate unavailable:', lastError?.message);
  return {
    rate: null,
    name: 'Policy Repo Rate',
    source: 'Reserve Bank of India',
    sourceUrl: OFFICIAL_RBI_SOURCE_URL,
    error: 'Currently unavailable',
    updatedAt: new Date().toISOString()
  };
}

function saveToCache(data: RepoRateData, timestamp: number) {
  try {
    localStorage.setItem(
      CACHE_STORAGE_KEY,
      JSON.stringify({ data, timestamp })
    );
  } catch {
    // Ignore localStorage quota errors
  }
}

export function useRepoRate() {
  const [data, setData] = useState<RepoRateData | null>(() => {
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
    return data?.rate ? 'success' : 'loading';
  });

  useEffect(() => {
    let isMounted = true;

    const loadRate = async () => {
      try {
        const result = await fetchRepoRate();
        if (!isMounted) return;
        setData(result);
        setStatus(result.rate ? 'success' : 'error');
      } catch {
        if (!isMounted) return;
        setStatus('error');
      }
    };

    loadRate();

    // Auto-refresh periodically every 1 hour (3600000 ms)
    const interval = setInterval(() => {
      loadRate();
    }, CACHE_TTL_MS);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, status };
}
