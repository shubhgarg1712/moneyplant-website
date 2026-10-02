// Pre-build script to fetch current RBI Policy Repo Rate & MCLR (Overnight) for static deployments
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RBI_URL = 'https://m.rbi.org.in/scripts/bs_viewcontent.aspx?Id=426';
const OUTPUT_DIR = path.resolve(__dirname, '../public/api');
const RATES_FILE = path.join(OUTPUT_DIR, 'rates.json');
const REPO_FILE = path.join(OUTPUT_DIR, 'repo-rate.json');

async function fetchAndSaveRates() {
  console.log('[fetch-rates] Fetching official RBI policy rates from:', RBI_URL);
  
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

    // Extract Policy Repo Rate
    const repoMatch = html.match(/Policy\s*Repo\s*Rate[\s\S]*?([0-9.]+\s*%)/i);
    
    // Extract MCLR (Overnight) - e.g. 7.80% - 8.00%
    const mclrMatch = html.match(/MCLR\s*\(\s*Overnight\s*\)[\s\S]*?([0-9.]+\s*%\s*(?:[-–—]\s*[0-9.]+\s*%)?)/i);

    // Extract date if present
    const cleanHtml = html.replace(/<!--[\s\S]*?-->/g, '');
    const dateMatch = cleanHtml.match(/as\s*on\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i);

    const repoRate = repoMatch ? repoMatch[1].trim() : null;
    let mclrOvernight = mclrMatch ? mclrMatch[1].trim().replace(/\s*[-–—]\s*/, ' – ') : null;

    if (!repoRate && !mclrOvernight) {
      throw new Error('Could not parse Repo Rate or MCLR from RBI page');
    }

    const data = {
      repoRate: repoRate,
      mclrOvernight: mclrOvernight,
      rate: repoRate, // for backward compatibility
      name: 'RBI Current Rates',
      source: 'Reserve Bank of India',
      sourceUrl: RBI_URL,
      asOn: dateMatch ? dateMatch[1].trim() : null,
      updatedAt: new Date().toISOString()
    };

    const jsonContent = JSON.stringify(data, null, 2);
    fs.writeFileSync(RATES_FILE, jsonContent, 'utf-8');
    fs.writeFileSync(REPO_FILE, jsonContent, 'utf-8');

    console.log(`[fetch-rates] Successfully saved live RBI rates (Repo: ${repoRate}, MCLR: ${mclrOvernight}, AsOn: ${data.asOn || 'latest'})`);
  } catch (err) {
    console.warn(`[fetch-rates] Warning: Could not fetch live RBI rates (${err.message}).`);
    if (fs.existsSync(RATES_FILE)) {
      console.log('[fetch-rates] Preserving existing cached rates file.');
    } else {
      const fallback = {
        repoRate: null,
        mclrOvernight: null,
        rate: null,
        name: 'RBI Current Rates',
        source: 'Reserve Bank of India',
        sourceUrl: RBI_URL,
        error: 'Currently unavailable',
        updatedAt: new Date().toISOString()
      };
      const jsonContent = JSON.stringify(fallback, null, 2);
      fs.writeFileSync(RATES_FILE, jsonContent, 'utf-8');
      fs.writeFileSync(REPO_FILE, jsonContent, 'utf-8');
    }
  }
}

fetchAndSaveRates();
