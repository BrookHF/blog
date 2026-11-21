'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Layers, TrendingDown, Users } from 'lucide-react';
import type { VisualEssay, WorkflowStep } from '@/content/types';
import { useEditorialShell } from './EditorialShell';
import VisualPlate from './VisualPlate';
import {
  AreaLineChartCard,
  DonutTakeawayCard,
  MiniSparklinePreview,
} from './Charts';
import NewsletterCard from './NewsletterCard';

interface ArticleReaderViewProps {
  essay: VisualEssay;
  nextEssays: VisualEssay[];
}

function KpiIcon({ type }: { type?: 'users' | 'trend' | 'clock' | 'layers' }) {
  const cls = 'h-4 w-4 text-[#8FB3C0]';
  switch (type) {
    case 'trend':
      return <TrendingDown className={cls} aria-hidden="true" />;
    case 'clock':
      return <Clock className={cls} aria-hidden="true" />;
    case 'layers':
      return <Layers className={cls} aria-hidden="true" />;
    case 'users':
    default:
      return <Users className={cls} aria-hidden="true" />;
  }
}

function WorkflowSchematic({ schematic }: { schematic: WorkflowStep['schematic'] }) {
  if (schematic === 'notes') {
    return (
      <svg viewBox="0 0 88 54" className="h-12 w-full sm:h-14" aria-hidden="true">
        <rect x="6" y="4" width="32" height="24" rx="2" fill="#E9D675" />
        <rect x="44" y="10" width="32" height="24" rx="2" fill="#8FB3C0" />
        <rect x="20" y="28" width="34" height="22" rx="2" fill="#D99888" />
      </svg>
    );
  }
  if (schematic === 'code') {
    return (
      <svg viewBox="0 0 88 54" className="h-12 w-full sm:h-14" aria-hidden="true">
        <rect
          x="4"
          y="6"
          width="80"
          height="42"
          rx="4"
          fill="#18212A"
          stroke="#4D6172"
          strokeWidth="1"
        />
        <line x1="14" y1="18" x2="62" y2="18" stroke="#73937E" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="14" y1="28" x2="48" y2="28" stroke="#8FB3C0" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="14" y1="38" x2="68" y2="38" stroke="#53687A" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 88 54" className="h-12 w-full sm:h-14" aria-hidden="true">
      <circle cx="44" cy="27" r="20" fill="none" stroke="#4A7C8C" strokeWidth="5.5" />
      <path
        d="M44,7 A20,20 0 0,1 64,27"
        fill="none"
        stroke="#E8DFC8"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ArticleReaderView({
  essay,
  nextEssays,
}: ArticleReaderViewProps) {
  const { setReadingProgress } = useEditorialShell();
  const [selectedStepIdx, setSelectedStepIdx] = useState<number>(0);

  // Track scroll reading progress for sticky top bar
  useEffect(() => {
    const updateProgress = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(4, Math.round((scrollTop / maxScroll) * 100)));
      setReadingProgress(pct);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [setReadingProgress]);

  const activeStep = essay.workflow.steps[selectedStepIdx] ?? essay.workflow.steps[0];

  return (
    <article className="mx-auto max-w-3xl space-y-8 sm:space-y-10">
      {/* Flow 02 Header Block: Issue Meta + Serif Headline + Deck */}
      <header>
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.08em] text-[#5A5750] sm:text-[11px]">
          <span>{essay.issueNumber}</span>
          <span>{essay.publishedLabel}</span>
        </div>

        <h1 className="mt-3 font-serif text-[30px] font-bold leading-[1.1] tracking-[-0.025em] text-[#141414] sm:text-[42px]">
          {essay.title}
        </h1>
        <p className="mt-2.5 max-w-2xl font-sans text-[14px] leading-relaxed text-[#4E4C46] sm:text-[16px]">
          {essay.subtitle}
        </p>
      </header>

      {/* Flow 02: OUTCOMES & METRICS — Two-Column Photo Plate + Dark Interactive Chart */}
      <section aria-labelledby="outcomes-metrics-heading">
        <h2
          id="outcomes-metrics-heading"
          className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]"
        >
          {essay.outcomes.sectionTitle}
        </h2>

        <div className="mt-3.5 grid grid-cols-2 items-stretch gap-3.5 sm:gap-6">
          {/* Left Column: Minimalist Visual Photo Plate + Short Caption */}
          <figure className="flex flex-col">
            <div className="aspect-[169/150] w-full flex-1 overflow-hidden rounded-[10px] border border-[#CFC9BC]/70 sm:min-h-[240px]">
              <VisualPlate
                plate={essay.outcomes.leftPlate}
                className="h-full w-full"
              />
            </div>
            <figcaption className="mt-2.5 font-sans text-[12px] leading-snug sm:text-[13.5px]">
              <span className="block font-semibold text-[#141414]">
                {essay.outcomes.leftCaptionTitle}
              </span>
              <span className="block text-[#5A5750]">
                {essay.outcomes.leftCaptionBody}
              </span>
            </figcaption>
          </figure>

          {/* Right Column: Dark Interactive Area Chart + Short Caption */}
          <figure className="flex flex-col">
            <div className="min-h-[168px] flex-1 sm:min-h-[240px]">
              <AreaLineChartCard
                title={essay.outcomes.chartTitle}
                unit={essay.outcomes.chartUnit}
                points={essay.outcomes.chartPoints}
              />
            </div>
            <figcaption className="mt-2.5 font-sans text-[12px] leading-snug sm:text-[13.5px]">
              <span className="block font-semibold text-[#141414]">
                {essay.outcomes.rightCaptionTitle}
              </span>
              <span className="block text-[#5A5750]">
                {essay.outcomes.rightCaptionBody}
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Flow 02: Unified Dark KPI Split Card */}
      <section
        aria-label="Key performance outcomes"
        className="rounded-[12px] bg-[#131E29] p-5 text-white sm:p-7"
      >
        <div className="grid grid-cols-2 divide-x divide-[#2D4152]">
          {essay.kpiSplit.map((kpi, idx) => (
            <div
              key={kpi.value + kpi.unit}
              className={idx === 0 ? 'pr-4 sm:pr-7' : 'pl-4 sm:pl-7'}
            >
              <div className="mb-3 flex h-5 items-center">
                <KpiIcon type={kpi.icon} />
              </div>
              <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                <span className="font-sans text-[38px] font-extrabold leading-none tracking-[-0.03em] tabular-nums text-white sm:text-[52px]">
                  {kpi.value}
                </span>
                <span className="font-sans text-[17px] font-bold text-[#D9E2E8] sm:text-[22px]">
                  {kpi.unit}
                </span>
              </div>
              <p className="mt-2.5 font-sans text-[11.5px] leading-snug text-[#9BB0BF] sm:text-[13px]">
                {kpi.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Flow 02: THE 3-STEP VISUAL WORKFLOW STRIP */}
      <section aria-labelledby="workflow-strip-heading">
        <div className="flex items-baseline justify-between gap-2">
          <h2
            id="workflow-strip-heading"
            className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]"
          >
            {essay.workflow.sectionTitle}
          </h2>
          <span className="font-mono text-[10px] text-[#5A5750]">
            Select step to inspect
          </span>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-2.5 sm:gap-4">
          {essay.workflow.steps.map((step, idx) => {
            const isSelected = selectedStepIdx === idx;
            const toneStyles =
              step.tone === 'sand'
                ? {
                    card: 'bg-[#E5DFD2] text-[#141414]',
                    badge: 'bg-[#131E29] text-white',
                    title: 'text-[#141414]',
                  }
                : step.tone === 'charcoal'
                  ? {
                      card: 'bg-[#2A343E] text-[#F3EFE6]',
                      badge: 'bg-[#F3EFE6] text-[#131E29]',
                      title: 'text-[#F3EFE6]',
                    }
                  : {
                      card: 'bg-[#131E29] text-[#F3EFE6]',
                      badge: 'bg-[#4A7C8C] text-white',
                      title: 'text-[#F3EFE6]',
                    };

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setSelectedStepIdx(idx)}
                aria-pressed={isSelected}
                className={`flex flex-col justify-between rounded-[10px] p-3 text-left transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C] sm:p-4 ${toneStyles.card} ${
                  isSelected
                    ? 'ring-2 ring-[#4A7C8C] ring-offset-2 ring-offset-[#F3EFE6]'
                    : 'hover:-translate-y-0.5'
                }`}
              >
                <span
                  className={`inline-flex h-5 w-7 items-center justify-center rounded-[4px] font-mono text-[10px] font-bold tabular-nums ${toneStyles.badge}`}
                >
                  {step.number}
                </span>

                <div className="my-3">
                  <WorkflowSchematic schematic={step.schematic} />
                </div>

                <span
                  className={`font-sans text-[11px] font-extrabold tracking-[0.06em] sm:text-[12px] ${toneStyles.title}`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Concise Selected Step Execution Note */}
        <div className="mt-3.5 rounded-[10px] border border-[#CFC9BC] bg-[#FAF7F1] px-4 py-3.5">
          <p className="font-mono text-[10.5px] font-semibold tracking-[0.08em] text-[#4A7C8C]">
            STEP {activeStep.number} · {activeStep.title}
          </p>
          <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-[#3D3B36]">
            {activeStep.summary}
          </p>
        </div>
      </section>

      {/* Concise Editorial Field Notes */}
      <section className="max-w-2xl space-y-3.5 border-t border-[#CFC9BC] pt-7">
        <h2 className="font-serif text-[22px] font-bold leading-snug text-[#141414] sm:text-[26px]">
          {essay.editorialNotes.heading}
        </h2>
        {essay.editorialNotes.paragraphs.map((para, i) => (
          <p
            key={i}
            className="font-sans text-[15px] leading-[1.7] text-[#2F2D29]"
          >
            {para}
          </p>
        ))}
      </section>

      {/* Flow 04: Visual Donut-Chart Takeaway Card */}
      <DonutTakeawayCard
        focusValue={essay.takeaway.focusValue}
        headline={essay.takeaway.headline}
        bullets={essay.takeaway.bullets}
        segments={essay.takeaway.segments}
      />

      {/* Flow 04: Photographic Pull-Quote Banner */}
      <section
        aria-label="Pull quote"
        className="overflow-hidden rounded-[12px] bg-[#131E29] text-white"
      >
        <div className="grid grid-cols-12 items-stretch">
          <div className="col-span-5 min-h-[150px] sm:min-h-[190px]">
            <VisualPlate
              plate={essay.pullQuote.plate}
              compact
              className="h-full w-full"
            />
          </div>
          <blockquote className="col-span-7 flex flex-col justify-center p-4 sm:p-7">
            <span
              aria-hidden="true"
              className="font-serif text-[34px] font-bold leading-none text-[#8FB3C0] sm:text-[42px]"
            >
              &ldquo;
            </span>
            <p className="-mt-2 font-serif text-[16px] font-bold leading-snug text-white sm:text-[22px]">
              {essay.pullQuote.quote}
            </p>
            {essay.pullQuote.attribution && (
              <footer className="mt-2.5 font-mono text-[10px] tracking-[0.08em] text-[#9BB5C0]">
                {essay.pullQuote.attribution}
              </footer>
            )}
          </blockquote>
        </div>
      </section>

      {/* Flow 04: Newsletter Capture Card */}
      <NewsletterCard variant="capture" />

      {/* Flow 04: UP NEXT Visual Recommendations */}
      <section aria-labelledby="up-next-heading" className="pt-2">
        <h2
          id="up-next-heading"
          className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]"
        >
          UP NEXT
        </h2>

        <div className="mt-3.5 grid grid-cols-2 gap-3.5 sm:gap-6">
          {nextEssays.map((rec) => (
            <Link
              key={rec.slug}
              href={`/posts/${rec.slug}`}
              className="group flex flex-col rounded-[10px] border border-transparent bg-[#E7E2D6] p-2.5 transition-colors duration-150 hover:border-[#B8B2A4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C] sm:p-3.5"
            >
              <div className="aspect-[153/84] w-full overflow-hidden rounded-[6px]">
                {rec.upNextStyle === 'sparkline' && rec.sparklineValues ? (
                  <MiniSparklinePreview values={rec.sparklineValues} />
                ) : (
                  <VisualPlate
                    plate={rec.heroPlate}
                    compact
                    className="h-full w-full"
                  />
                )}
              </div>
              <h3 className="mt-3 font-serif text-[14.5px] font-bold leading-snug text-[#141414] transition-colors group-hover:text-[#4A7C8C] sm:text-[17px]">
                {rec.title}
              </h3>
              <p className="mt-1.5 font-mono text-[9.5px] tracking-[0.04em] text-[#5A5750] sm:text-[10.5px]">
                {rec.mediaSummary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
