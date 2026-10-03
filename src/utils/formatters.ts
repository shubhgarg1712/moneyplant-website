/**
 * Centralized formatting utilities for MoneyPlant Financial Calculators.
 * Adheres strictly to Indian numbering conventions (Lakhs, Crores) and INR currency format.
 */

export function formatINR(val: number, options?: { showDecimals?: boolean; compact?: boolean }): string {
  if (val === undefined || val === null || isNaN(val) || !isFinite(val)) {
    return '₹0';
  }

  const isNegative = val < 0;
  const absVal = Math.abs(val);

  if (options?.compact) {
    if (absVal >= 10000000) {
      const cr = absVal / 10000000;
      return `${isNegative ? '-' : ''}₹${cr.toFixed(cr >= 10 ? 1 : 2)} Cr`;
    }
    if (absVal >= 100000) {
      const lk = absVal / 100000;
      return `${isNegative ? '-' : ''}₹${lk.toFixed(lk >= 10 ? 1 : 2)} L`;
    }
    if (absVal >= 1000) {
      const k = absVal / 1000;
      return `${isNegative ? '-' : ''}₹${k.toFixed(1)} k`;
    }
  }

  if (options?.showDecimals) {
    const formatted = absVal.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${isNegative ? '-' : ''}₹${formatted}`;
  }

  const formatted = Math.round(absVal).toLocaleString('en-IN');
  return `${isNegative ? '-' : ''}₹${formatted}`;
}

export function formatNumberINR(val: number): string {
  if (val === undefined || val === null || isNaN(val) || !isFinite(val)) {
    return '0';
  }
  return Math.round(Math.abs(val)).toLocaleString('en-IN');
}

export function parseNumberFromInput(val: string): number | null {
  if (!val || typeof val !== 'string') return null;
  // Remove currency symbols, commas, percent, letters, spaces
  const cleaned = val.replace(/[^0-9.]/g, '');
  if (cleaned === '' || cleaned === '.') return null;
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  const sanitized = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
  
  const num = parseFloat(sanitized);
  return isNaN(num) || !isFinite(num) ? null : num;
}

export function formatPercent(val: number, decimals: number = 2): string {
  if (val === undefined || val === null || isNaN(val) || !isFinite(val)) {
    return '0%';
  }
  return `${Number(val.toFixed(decimals))}%`;
}

export function formatYears(val: number): string {
  const rounded = Math.round(val);
  return rounded === 1 ? '1 year' : `${rounded} years`;
}

export function formatMonths(val: number): string {
  const rounded = Math.round(val);
  return rounded === 1 ? '1 month' : `${rounded} months`;
}
