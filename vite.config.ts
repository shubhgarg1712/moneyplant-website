import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function ratesDevPlugin(): Plugin {
  let cache: { data: any; timestamp: number } | null = null;
  const CACHE_TTL_MS = 60 * 60 * 1000;
  const RBI_URL = 'https://m.rbi.org.in/scripts/bs_viewcontent.aspx?Id=426';

  return {
    name: 'vite-plugin-rates-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (
          req.url === '/api/rates' || 
          req.url?.startsWith('/api/rates?') ||
          req.url === '/api/repo-rate' || 
          req.url?.startsWith('/api/repo-rate?')
        ) {
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

            const repoMatch = html.match(/Policy\s*Repo\s*Rate[\s\S]*?([0-9.]+\s*%)/i);
            const mclrMatch = html.match(/MCLR\s*\(\s*Overnight\s*\)[\s\S]*?([0-9.]+\s*%\s*(?:[-–—]\s*[0-9.]+\s*%)?)/i);
            const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '');
            const dateMatch = cleanHtml.match(/as\s*on\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i);

            const repoRate = repoMatch ? repoMatch[1].trim() : (cache?.data?.repoRate || null);
            const mclrOvernight = mclrMatch ? mclrMatch[1].trim().replace(/\s*[-–—]\s*/, ' – ') : (cache?.data?.mclrOvernight || null);

            const data = {
              repoRate,
              mclrOvernight,
              rate: repoRate,
              name: 'RBI Current Rates',
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
                repoRate: null,
                mclrOvernight: null,
                rate: null,
                name: 'RBI Current Rates',
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
  plugins: [react(), ratesDevPlugin()],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
