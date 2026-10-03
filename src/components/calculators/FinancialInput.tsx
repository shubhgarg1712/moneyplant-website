import React, { useState, useEffect, useId } from 'react';
import { formatNumberINR, parseNumberFromInput, formatPercent } from '../../utils/formatters';

export interface FinancialInputProps {
  id?: string;
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string; // e.g. '₹'
  suffix?: string; // e.g. '%', 'years', 'months'
  isCurrency?: boolean;
  isPercentage?: boolean;
  decimalPlaces?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const FinancialInput: React.FC<FinancialInputProps> = ({
  id,
  label,
  sublabel,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  isCurrency = false,
  isPercentage = false,
  decimalPlaces = isPercentage ? 2 : 0,
  onChange,
  className = '',
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  // Format a number for display in the manual text box
  const formatForDisplay = (val: number): string => {
    if (isNaN(val) || !isFinite(val)) return '0';
    if (isCurrency) {
      return formatNumberINR(val);
    }
    if (isPercentage || decimalPlaces > 0) {
      return Number(val.toFixed(decimalPlaces)).toString();
    }
    return Math.round(val).toString();
  };

  const [textValue, setTextValue] = useState<string>(() => formatForDisplay(value));
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  // Keep manual text in sync with external value changes (e.g. slider drag or reset)
  useEffect(() => {
    if (!isFocused) {
      setTextValue(formatForDisplay(value));
      setValidationError('');
    }
  }, [value, isFocused]);

  // Handle manual input typing
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    
    // Clean input characters: allow digits and a single decimal point
    let cleaned = raw.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }

    setTextValue(raw);

    if (cleaned === '' || cleaned === '.') {
      setValidationError('Enter a valid amount');
      return;
    }

    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed) && isFinite(parsed)) {
      if (parsed < min) {
        setValidationError(`Min: ${prefix || ''}${isCurrency ? formatNumberINR(min) : min}${suffix ? ' ' + suffix : ''}`);
      } else if (parsed > max) {
        setValidationError(`Max: ${prefix || ''}${isCurrency ? formatNumberINR(max) : max}${suffix ? ' ' + suffix : ''}`);
      } else {
        setValidationError('');
      }

      // Propagate exact typed number to parent calculation engine immediately
      onChange(parsed);
    } else {
      setValidationError('Enter a valid amount');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    const parsed = parseNumberFromInput(textValue);

    if (parsed === null) {
      // Revert to current valid value or min
      const fallback = Math.max(min, Math.min(max, value || min));
      setTextValue(formatForDisplay(fallback));
      setValidationError('');
      onChange(fallback);
      return;
    }

    // Clamp on blur to strict min/max boundaries
    const clamped = Math.max(min, Math.min(max, parsed));
    setTextValue(formatForDisplay(clamped));
    setValidationError('');
    onChange(clamped);
  };

  // Handle slider changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = parseFloat(e.target.value);
    const rounded = decimalPlaces > 0 
      ? Math.round(rawVal * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
      : Math.round(rawVal);

    setTextValue(formatForDisplay(rounded));
    setValidationError('');
    onChange(rounded);
  };

  // Clamped slider value so slider handle never overflows track boundaries
  const sliderValue = Math.max(min, Math.min(max, isNaN(value) ? min : value));

  // Minimum & Maximum labels
  const formattedMin = `${prefix || ''}${isCurrency ? formatNumberINR(min) : min}${suffix ? ' ' + suffix : ''}`;
  const formattedMax = `${prefix || ''}${isCurrency ? formatNumberINR(max) : max}${suffix ? ' ' + suffix : ''}`;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Header: Label + Synchronized Manual Numeric Input */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <div>
          <label htmlFor={inputId} className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            {label}
          </label>
          {sublabel && (
            <span className="text-[11px] text-slate-400 block leading-tight">{sublabel}</span>
          )}
        </div>

        {/* Manual Input Container */}
        <div className="flex items-center">
          <div
            className={`flex items-center rounded-xl border bg-white px-3 py-1.5 shadow-xs transition-all ${
              validationError
                ? 'border-amber-400 ring-2 ring-amber-100'
                : 'border-slate-300 focus-within:border-brand-forest focus-within:ring-2 focus-within:ring-brand-forest/20'
            }`}
          >
            {prefix && (
              <span className="text-brand-forest font-bold text-sm sm:text-base mr-1 select-none">
                {prefix}
              </span>
            )}
            
            <input
              id={inputId}
              type="text"
              inputMode={isPercentage || decimalPlaces > 0 ? 'decimal' : 'numeric'}
              value={textValue}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              className="w-28 sm:w-36 text-right font-extrabold text-brand-forest focus:outline-none text-sm sm:text-base bg-transparent tracking-tight"
              aria-label={label}
              placeholder={formatForDisplay(min)}
            />

            {suffix && (
              <span className="text-slate-500 font-semibold text-xs sm:text-sm ml-1 select-none">
                {suffix}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Synchronized Slider Control */}
      <div className="pt-0.5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-brand-forest/30"
          aria-label={`${label} slider`}
        />

        {/* Slider Min, Max, and Validation Notice */}
        <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
          <span>Min: {formattedMin}</span>
          {validationError ? (
            <span className="text-amber-700 font-medium text-[11px] bg-amber-50 px-2 py-0.5 rounded">
              {validationError}
            </span>
          ) : (
            <span className="text-slate-600 font-semibold">
              {prefix || ''}{isCurrency ? formatNumberINR(value) : (decimalPlaces > 0 ? value.toFixed(decimalPlaces) : Math.round(value))}{suffix ? ' ' + suffix : ''}
            </span>
          )}
          <span>Max: {formattedMax}</span>
        </div>
      </div>
    </div>
  );
};
