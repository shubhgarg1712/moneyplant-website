import React, { useState } from 'react';
import { formatINR } from '../../utils/formatters';

interface AreaChartPoint {
  label: string;
  series1: number; // e.g. Principal / Contributions / Without Extra
  series2: number; // e.g. Total / Future Value / With Extra
}

interface AreaTrendChartProps {
  data: AreaChartPoint[];
  series1Name: string;
  series2Name: string;
  series1Color?: string;
  series2Color?: string;
  height?: number;
  yAxisFormatter?: (val: number) => string;
}

export const AreaTrendChart: React.FC<AreaTrendChartProps> = ({
  data,
  series1Name,
  series2Name,
  series1Color = '#10B981', // Emerald
  series2Color = '#1E3F0A', // Brand Forest
  height = 220,
  yAxisFormatter = (v) => formatINR(v, { compact: true }),
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.series1, d.series2)),
    1
  );

  const paddingLeft = 60;
  const paddingRight = 24;
  const paddingTop = 20;
  const paddingBottom = 35;
  const chartWidth = 560;
  const chartHeight = height;

  const usableWidth = chartWidth - paddingLeft - paddingRight;
  const usableHeight = chartHeight - paddingTop - paddingBottom;

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + usableWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * usableWidth;
  };

  const getY = (val: number) => {
    return chartHeight - paddingBottom - (val / maxVal) * usableHeight;
  };

  // Generate SVG path strings
  const points1 = data.map((d, i) => `${getX(i)},${getY(d.series1)}`).join(' ');
  const points2 = data.map((d, i) => `${getX(i)},${getY(d.series2)}`).join(' ');

  const area1 = `${points1} ${getX(data.length - 1)},${chartHeight - paddingBottom} ${getX(0)},${chartHeight - paddingBottom}`;
  const area2 = `${points2} ${getX(data.length - 1)},${chartHeight - paddingBottom} ${getX(0)},${chartHeight - paddingBottom}`;

  // Y-axis grid ticks (4 ticks)
  const yTicks = [0, maxVal * 0.33, maxVal * 0.66, maxVal];

  // X-axis label indices (at start, middle, end)
  const xIndices = [
    0,
    Math.floor((data.length - 1) / 2),
    data.length - 1,
  ];

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div className="w-full relative select-none">
      {/* Legend & Tooltip Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: series1Color }} />
            <span className="text-slate-600 font-medium">{series1Name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: series2Color }} />
            <span className="text-slate-600 font-medium">{series2Name}</span>
          </div>
        </div>

        {activePoint && (
          <div className="bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md font-medium shadow-sm animate-in fade-in">
            <span className="text-slate-300 mr-2">{activePoint.label}:</span>
            <span style={{ color: series1Color }} className="font-bold mr-2">
              {formatINR(activePoint.series1)}
            </span>
            <span style={{ color: series2Color === '#1E3F0A' ? '#6EE7B7' : series2Color }} className="font-bold">
              {formatINR(activePoint.series2)}
            </span>
          </div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full h-auto overflow-visible"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="gradSeries1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={series1Color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={series1Color} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="gradSeries2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={series2Color} stopOpacity="0.30" />
            <stop offset="100%" stopColor={series2Color} stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Y-axis grid lines & labels */}
        {yTicks.map((tick, idx) => {
          const y = getY(tick);
          return (
            <g key={idx}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="#E2E8F0"
                strokeDasharray={idx === 0 ? '0' : '4 4'}
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-medium"
              >
                {yAxisFormatter(tick)}
              </text>
            </g>
          );
        })}

        {/* Shaded Areas */}
        <polygon points={area2} fill="url(#gradSeries2)" />
        <polygon points={area1} fill="url(#gradSeries1)" />

        {/* Trend Lines */}
        <polyline
          fill="none"
          stroke={series2Color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points2}
        />
        <polyline
          fill="none"
          stroke={series1Color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points1}
        />

        {/* X-axis ticks */}
        {xIndices.map((idx) => {
          const pt = data[idx];
          if (!pt) return null;
          return (
            <text
              key={idx}
              x={getX(idx)}
              y={chartHeight - 10}
              textAnchor={idx === 0 ? 'start' : idx === data.length - 1 ? 'end' : 'middle'}
              className="text-[10px] fill-slate-400 font-medium"
            >
              {pt.label}
            </text>
          );
        })}

        {/* Hover interaction overlay columns */}
        {data.map((_, idx) => {
          const x = getX(idx);
          const colWidth = usableWidth / data.length;
          return (
            <rect
              key={idx}
              x={x - colWidth / 2}
              y={paddingTop}
              width={colWidth}
              height={usableHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          );
        })}

        {/* Active hover crosshair and marker */}
        {hoverIndex !== null && (
          <g>
            <line
              x1={getX(hoverIndex)}
              y1={paddingTop}
              x2={getX(hoverIndex)}
              y2={chartHeight - paddingBottom}
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle
              cx={getX(hoverIndex)}
              cy={getY(data[hoverIndex].series1)}
              r="4.5"
              fill={series1Color}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <circle
              cx={getX(hoverIndex)}
              cy={getY(data[hoverIndex].series2)}
              r="4.5"
              fill={series2Color}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export interface BreakdownItem {
  label: string;
  amount: number;
  color: string;
}

export const BreakdownBarChart: React.FC<{
  items: BreakdownItem[];
  totalLabel?: string;
}> = ({ items, totalLabel = 'Total' }) => {
  const total = items.reduce((acc, curr) => acc + Math.max(0, curr.amount), 0);

  if (total <= 0) return null;

  return (
    <div className="space-y-4 select-none">
      {/* Proportion Bar */}
      <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
        {items.map((item, idx) => {
          const pct = (Math.max(0, item.amount) / total) * 100;
          if (pct <= 0) return null;
          return (
            <div
              key={idx}
              style={{
                width: `${pct}%`,
                backgroundColor: item.color,
              }}
              className="h-full transition-all duration-300 relative group cursor-pointer"
              title={`${item.label}: ${formatINR(item.amount)} (${pct.toFixed(1)}%)`}
            />
          );
        })}
      </div>

      {/* Itemized Legend & Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {items.map((item, idx) => {
          const pct = (Math.max(0, item.amount) / total) * 100;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-md shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-semibold text-slate-700 truncate">{item.label}</span>
              </div>
              <div className="text-right shrink-0 ml-2">
                <div className="font-bold text-slate-900">{formatINR(item.amount)}</div>
                <div className="text-[10px] text-slate-400 font-medium">{pct.toFixed(1)}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
