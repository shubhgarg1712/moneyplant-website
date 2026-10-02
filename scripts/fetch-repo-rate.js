// Pre-build script to fetch current RBI Policy Repo Rate for static deployments (e.g. GitHub Pages)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RBI_URL = 'https://m.rbi.org.in/scripts/bs_speechesview.aspx?id=1352';
const OUTPUT_DIR = path.resolve(__dirname, '../public/api');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'repo-rate.json');

async function fetchAndSaveRepoRate() {
  console.log('[fetch-repo-rate] Fetching official RBI policy repo rate...');
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(RBI_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`RBI responded with HTTP ${response.status}`);
    }

    const html = await response.text();
    const rateMatch = html.match(/Policy\s*Repo\s*Rate[\s\S]*?([0-9.]+\s*%)/i);

    if (!rateMatch) {
      throw new Error('Could not parse Policy Repo Rate from RBI page');
    }

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

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`[fetch-repo-rate] Successfully saved live RBI Repo Rate (${data.rate}, as on ${data.asOn || 'latest'}) to public/api/repo-rate.json`);
  } catch (err) {
    console.warn(`[fetch-repo-rate] Warning: Could not fetch live RBI rate (${err.message}).`);
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('[fetch-repo-rate] Preserving existing cached public/api/repo-rate.json');
    } else {
      const fallback = {
        rate: null,
        name: 'Policy Repo Rate',
        source: 'Reserve Bank of India',
        sourceUrl: RBI_URL,
        error: 'Currently unavailable',
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fallback, null, 2), 'utf-8');
    }
  }
}

fetchAndSaveRepoRate();
