'use client';

import { useState } from 'react';
import type { AreaChartPoint, BarChartPoint, DonutSegment } from '@/content/types';

/* -------------------------------------------------------------------------- */
/* 1. Flow 01 Dark Chart-Led Feed Card: Solo Overhead Index / Bar Index       */
/* -------------------------------------------------------------------------- */

interface MiniBarIndexChartProps {
  title: string;
  bars: BarChartPoint[];
}

export function MiniBarIndexChart({ title, bars }: MiniBarIndexChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxVal = Math.max(...bars.map((b) => b.value), 100);
  const activeBar = hoveredIdx !== null ? bars[hoveredIdx] : null;

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between rounded-[8px] bg-[#131E29] p-3.5 text-[#F3EFE6]"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate font-sans text-[10px] font-semibold tracking-[0.06em] text-[#9BB5C0]">
          {title}
        </span>
        {activeBar && (
          <span className="shrink-0 font-mono text-[10px] tabular-nums text-[#F3EFE6]">
            {activeBar.label}
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-1 items-end gap-2 border-b border-[#364C5E] pb-1.5 pt-3">
        {bars.map((bar, index) => {
          const heightPct = Math.max(16, Math.round((bar.value / maxVal) * 100));
          const isActive = hoveredIdx === index;
          return (
            <div
              key={bar.label}
              onMouseEnter={() => setHoveredIdx(index)}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <div
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: bar.color,
                  opacity: hoveredIdx === null || isActive ? 1 : 0.48,
                }}
                className="w-full max-w-[26px] rounded-t-[2px] transition-opacity duration-150"
                title={`${bar.label}: ${bar.detail ?? bar.value}`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-1.5 flex items-center justify-between font-mono text-[9.5px] tabular-nums text-[#8FB3C0]">
        <span className="truncate">
          {activeBar ? activeBar.detail ?? `${activeBar.value} idx` : 'Hover bars to inspect'}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Flow 02 Dark Interactive Area/Line Visualization Card                   */
/* -------------------------------------------------------------------------- */

interface AreaLineChartCardProps {
  title: string;
  unit: string;
  points: AreaChartPoint[];
}

export function AreaLineChartCard({
  title,
  unit,
  points,
}: AreaLineChartCardProps) {
  const [activeIndex, setActiveIndex] = useState<number>(points.length - 1);

  const width = 260;
  const height = 152;
  const padLeft = 30;
  const padRight = 14;
  const padTop = 18;
  const padBottom = 26;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const coords = points.map((pt, idx) => {
    const x =
      points.length === 1
        ? padLeft + plotW / 2
        : padLeft + (idx / (points.length - 1)) * plotW;
    const clamped = Math.max(0, Math.min(100, pt.value));
    const y = padTop + plotH - (clamped / 100) * plotH;
    return { ...pt, x, y };
  });

  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(' ');
  const areaPath =
    coords.length > 0
      ? `M ${coords[0].x},${coords[0].y} ` +
        coords.slice(1).map((c) => `L ${c.x},${c.y}`).join(' ') +
        ` L ${coords[coords.length - 1].x},${padTop + plotH} L ${coords[0].x},${padTop + plotH} Z`
      : '';

  const activePoint = coords[activeIndex] ?? coords[coords.length - 1];
  const yTicks = [100, 75, 50, 25];

  return (
    <div className="flex h-full flex-col justify-between rounded-[10px] bg-[#131E29] p-4 text-[#F3EFE6]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-sans text-[12px] font-semibold tracking-[0.01em] text-[#F3EFE6]">
            {title}
          </p>
          <p className="mt-0.5 font-mono text-[10px] tabular-nums text-[#8FB3C0]">
            {activePoint.label} · {activePoint.value} {unit}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums text-[#F3EFE6]">
          {activePoint.value}
        </span>
      </div>

      <div className="mt-2 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label={`${title} chart`}
        >
          <defs>
            <linearGradient id="editorialAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A7C8C" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#131E29" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines & Y ticks */}
          {yTicks.map((tick) => {
            const y = padTop + plotH - (tick / 100) * plotH;
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#283A4B"
                  strokeWidth="0.9"
                />
                <text
                  x={padLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-[#7D94A6] font-mono text-[8.5px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line
            x1={padLeft}
            y1={padTop + plotH}
            x2={width - padRight}
            y2={padTop + plotH}
            stroke="#2F4457"
            strokeWidth="1"
          />

          {/* Area & Line */}
          <path d={areaPath} fill="url(#editorialAreaGrad)" />
          <polyline
            points={linePoints}
            fill="none"
            stroke="#85B8C8"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active vertical guide */}
          <line
            x1={activePoint.x}
            y1={activePoint.y}
            x2={activePoint.x}
            y2={padTop + plotH}
            stroke="#85B8C8"
            strokeOpacity="0.35"
            strokeDasharray="3 3"
            strokeWidth="1"
          />

          {/* Interactive points */}
          {coords.map((pt, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <g key={pt.label}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? 4.5 : 3}
                  fill={isSelected ? '#FFFFFF' : '#85B8C8'}
                  stroke="#131E29"
                  strokeWidth="1.5"
                  className="transition-all duration-150"
                />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="14"
                  fill="transparent"
                  className="cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label={`${pt.label}: ${pt.value} ${unit}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                />
              </g>
            );
          })}

          {/* First and Last X labels */}
          {coords.length > 0 && (
            <>
              <text
                x={coords[0].x}
                y={height - 6}
                textAnchor="start"
                className="fill-[#7D94A6] font-mono text-[8.5px]"
              >
                {coords[0].label}
              </text>
              <text
                x={coords[coords.length - 1].x}
                y={height - 6}
                textAnchor="end"
                className="fill-[#7D94A6] font-mono text-[8.5px]"
              >
                {coords[coords.length - 1].label}
              </text>
            </>
          )}
        </svg>
      </div>

      <p className="mt-1 min-h-[16px] truncate font-sans text-[11px] text-[#B5C2CC]">
        {activePoint.note ?? `${activePoint.label}: ${activePoint.value} ${unit}`}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Flow 04 Interactive Donut-Chart Takeaway Card                           */
/* -------------------------------------------------------------------------- */

interface DonutTakeawayCardProps {
  focusValue: string;
  headline: string;
  bullets: string[];
  segments: DonutSegment[];
}

export function DonutTakeawayCard({
  focusValue,
  headline,
  bullets,
  segments,
}: DonutTakeawayCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  // Compute cumulative offsets for SVG stroke-dasharray
  const computedSegments = segments.reduce<
    Array<DonutSegment & { dash: number; offset: number }>
  >((acc, seg) => {
    const prevSum = acc.reduce((sum, s) => sum + s.percentage, 0);
    const dash = (seg.percentage / 100) * circumference;
    const offset = -((prevSum / 100) * circumference);
    acc.push({ ...seg, dash, offset });
    return acc;
  }, []);

  const activeSeg = selectedIdx !== null ? computedSegments[selectedIdx] : null;

  return (
    <section
      aria-label="Data and takeaway"
      className="rounded-[12px] border border-[#D1CBBF] bg-[#E7E2D6] p-5 sm:p-6"
    >
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
        {/* Interactive Donut Chart */}
        <div
          className="relative flex shrink-0 items-center justify-center self-center sm:self-auto"
          onMouseLeave={() => setSelectedIdx(null)}
        >
          <svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            role="img"
            aria-label={`Donut breakdown highlighting ${focusValue}`}
          >
            <g transform="translate(56, 56) rotate(-90)">
              <circle
                cx="0"
                cy="0"
                r={radius}
                fill="none"
                stroke="#C8C2B4"
                strokeWidth="16"
              />
              {computedSegments.map((seg, idx) => {
                const isHighlighted = selectedIdx === idx;
                return (
                  <circle
                    key={seg.label}
                    cx="0"
                    cy="0"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={isHighlighted ? 19 : 16}
                    strokeDasharray={`${Math.max(0, seg.dash - 1.5)} ${circumference}`}
                    strokeDashoffset={seg.offset}
                    opacity={selectedIdx === null || isHighlighted ? 1 : 0.45}
                    className="cursor-pointer transition-all duration-150"
                    tabIndex={0}
                    role="button"
                    aria-label={`${seg.label}: ${seg.percentage}%`}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    onFocus={() => setSelectedIdx(idx)}
                    onClick={() =>
                      setSelectedIdx((prev) => (prev === idx ? null : idx))
                    }
                  />
                );
              })}
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-sans text-[16px] font-extrabold tabular-nums text-[#141414]">
              {activeSeg ? `${activeSeg.percentage}%` : focusValue}
            </span>
          </div>
        </div>

        {/* Takeaway Copy & Interactive Legend */}
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]">
            DATA &amp; TAKEAWAY
          </p>
          <h3 className="mt-1.5 font-sans text-[15px] font-semibold leading-snug text-[#141414] sm:text-[17px]">
            {headline}
          </h3>

          {activeSeg ? (
            <div className="mt-2.5 border-t border-[#CFC9BC] pt-2.5">
              <p className="font-sans text-[13px] font-semibold text-[#141414]">
                {activeSeg.label} ·{' '}
                <span className="font-mono tabular-nums">
                  {activeSeg.percentage}%
                </span>
              </p>
              <p className="mt-0.5 font-sans text-[12.5px] text-[#5A5750]">
                {activeSeg.detail}
              </p>
            </div>
          ) : (
            <ul className="mt-2.5 space-y-1 font-sans text-[13px] text-[#5A5750]">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-[#4A7C8C]">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Clean interactive legend buttons (unboxed text) */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#CFC9BC]/80 pt-2.5">
            {computedSegments.map((seg, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={seg.label}
                  type="button"
                  onClick={() =>
                    setSelectedIdx((prev) => (prev === idx ? null : idx))
                  }
                  onMouseEnter={() => setSelectedIdx(idx)}
                  onMouseLeave={() => setSelectedIdx(null)}
                  className={`inline-flex items-center gap-1.5 font-mono text-[10.5px] tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C] ${
                    isSelected
                      ? 'font-semibold text-[#141414]'
                      : 'text-[#5A5750] hover:text-[#141414]'
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: seg.color }}
                    aria-hidden="true"
                  />
                  <span>
                    {seg.label} ({seg.percentage}%)
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Flow 04 Up Next Sparkline Preview                                       */
/* -------------------------------------------------------------------------- */

interface MiniSparklinePreviewProps {
  values: number[];
}

export function MiniSparklinePreview({ values }: MiniSparklinePreviewProps) {
  const max = Math.max(...values, 100);
  const min = Math.min(...values, 0);
  const range = Math.max(1, max - min);

  const pts = values.map((v, i) => {
    const x = 18 + (i / Math.max(1, values.length - 1)) * 124;
    const y = 66 - ((v - min) / range) * 44;
    return { x, y };
  });

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(' ');
  const last = pts[pts.length - 1];

  return (
    <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#2B4050]">
      <svg viewBox="0 0 160 84" className="h-full w-full" aria-hidden="true">
        <line x1="16" y1="68" x2="144" y2="68" stroke="#3D576B" strokeWidth="0.9" />
        <line x1="16" y1="42" x2="144" y2="42" stroke="#3D576B" strokeWidth="0.7" strokeDasharray="3 3" />
        <polyline
          points={polyline}
          fill="none"
          stroke="#E8DFC8"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {last && <circle cx={last.x} cy={last.y} r="4" fill="#C48F5A" />}
      </svg>
    </div>
  );
}
