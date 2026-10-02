import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function repoRateDevPlugin(): Plugin {
  let cache: { data: any; timestamp: number } | null = null;
  const CACHE_TTL_MS = 60 * 60 * 1000;
  const RBI_URL = 'https://m.rbi.org.in/scripts/bs_speechesview.aspx?id=1352';

  return {
    name: 'vite-plugin-repo-rate-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/repo-rate' || req.url?.startsWith('/api/repo-rate?')) {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          const now = Date.now();
          if (cache && now - cache.timestamp < CACHE_TTL_MS) {
            res.end(JSON.stringify(cache.data));
            return;
          }
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000);
            const response = await fetch(RBI_URL, {
              signal: controller.signal,
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
              }
            });
            clearTimeout(timeout);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const html = await response.text();
            const rateMatch = html.match(/Policy\s*Repo\s*Rate[\s\S]*?([0-9.]+\s*%)/i);
            if (!rateMatch) throw new Error('Could not parse Policy Repo Rate');
            const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '');
            const dateMatch = cleanHtml.match(/as\s*on\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i);
            const data = {
              rate: rateMatch[1].trim(),
              name: 'Policy Repo Rate',
              source: 'Reserve Bank of India',
              sourceUrl: RBI_URL,
              asOn: dateMatch ? dateMatch[1].trim() : null,
              updatedAt: new Date().toISOString()
            };
            cache = { data, timestamp: now };
            res.end(JSON.stringify(data));
          } catch (err: any) {
            if (cache) {
              res.end(JSON.stringify({ ...cache.data, stale: true }));
            } else {
              res.statusCode = 503;
              res.end(JSON.stringify({
                rate: null,
                name: 'Policy Repo Rate',
                source: 'Reserve Bank of India',
                sourceUrl: RBI_URL,
                error: 'Currently unavailable',
                updatedAt: new Date().toISOString()
              }));
            }
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/moneyplant-website/',
  plugins: [react(), repoRateDevPlugin()],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
