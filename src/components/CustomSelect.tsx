import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  id?: string;
  label?: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  id = 'service-required-select',
  label = 'Service Required',
  required = true,
  value,
  options,
  onChange,
  error
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(() => {
    const idx = options.indexOf(value);
    return idx >= 0 ? idx : 0;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Sync highlightedIndex when value changes or dropdown opens
  useEffect(() => {
    const idx = options.indexOf(value);
    if (idx >= 0) {
      setHighlightedIndex(idx);
    }
  }, [value, isOpen, options]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation & accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
        buttonRef.current?.focus();
      }
      return;
    }

    if (e.key === 'Tab') {
      if (isOpen) {
        setIsOpen(false);
      }
      return;
    }

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = options.indexOf(value);
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    // When dropdown is OPEN
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const selectedOption = options[highlightedIndex];
        if (selectedOption) {
          onChange(selectedOption);
          setIsOpen(false);
          buttonRef.current?.focus();
        }
        break;
      }
      case 'Home': {
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      }
      case 'End': {
        e.preventDefault();
        setHighlightedIndex(options.length - 1);
        break;
      }
    }
  };

  const handleSelectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Label */}
      <label 
        id={`${id}-label`}
        htmlFor={`${id}-trigger`}
        className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Closed State Button Trigger */}
      <button
        ref={buttonRef}
        id={`${id}-trigger`}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-labelledby={`${id}-label ${id}-trigger`}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-slate-900 flex items-center justify-between text-left shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
          error 
            ? 'border-red-400 bg-red-50/20' 
            : isOpen 
              ? 'border-brand-primary ring-2 ring-emerald-500/20 shadow-md' 
              : 'border-slate-200 hover:border-emerald-600/60'
        }`}
      >
        <span className="font-medium text-slate-800 truncate">
          {value || 'Select a service'}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-brand-forest transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-brand-dark' : 'text-slate-500'
          }`} 
        />
      </button>

      {/* Validation Error Message */}
      {error && (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      )}

      {/* Custom Open State Dropdown Popup Menu */}
      {isOpen && (
        <ul
          ref={listboxRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="absolute left-0 right-0 top-full mt-2 z-40 bg-white rounded-2xl shadow-xl border border-emerald-100 p-1.5 max-h-72 overflow-y-auto transform animate-in fade-in slide-in-from-top-2 duration-150 focus:outline-none"
        >
          {options.map((option, index) => {
            const isSelected = option === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <li
                key={option}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`min-h-[44px] px-3.5 py-2.5 rounded-xl flex items-center justify-between cursor-pointer select-none text-sm transition-all duration-150 my-0.5 ${
                  isHighlighted || isSelected
                    ? 'bg-emerald-50/80 text-brand-dark font-medium'
                    : 'text-slate-700 hover:bg-emerald-50/50'
                }`}
              >
                {/* Left side: Accent bar indicator + Option text */}
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span 
                    className={`w-1 h-4 rounded-full shrink-0 transition-all duration-150 ${
                      isSelected || isHighlighted 
                        ? 'bg-brand-forest opacity-100 scale-100' 
                        : 'bg-transparent opacity-0 scale-75'
                    }`}
                  />
                  <span className={`truncate ${isSelected ? 'font-semibold text-brand-forest' : 'font-normal'}`}>
                    {option}
                  </span>
                </div>

                {/* Right side: Checkmark for selected or hovered item */}
                <span className="shrink-0 flex items-center justify-center w-5 h-5 ml-2">
                  {(isSelected || isHighlighted) && (
                    <Check 
                      className={`w-4 h-4 transition-all duration-150 ${
                        isSelected ? 'text-brand-forest' : 'text-emerald-600/70'
                      }`} 
                    />
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
