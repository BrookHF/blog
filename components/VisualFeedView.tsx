'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
import {
  allEssays,
  CATEGORY_LABELS,
  FORMAT_META,
  getFeaturedEssay,
} from '@/content/posts';
import { siteConfig } from '@/content/site';
import type { EssayCategory, VisualFormat } from '@/content/types';
import VisualPlate from './VisualPlate';
import { MiniBarIndexChart } from './Charts';
import NewsletterCard from './NewsletterCard';

const CATEGORY_ORDER: Array<'all' | EssayCategory> = [
  'all',
  'metrics',
  'workflow',
  'studies',
];

export default function VisualFeedView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAllBriefs, setShowAllBriefs] = useState(false);

  const paramCategory = searchParams.get('category') as EssayCategory | null;
  const paramFormat = searchParams.get('format') as VisualFormat | null;

  const activeCategory: 'all' | EssayCategory =
    paramCategory && ['metrics', 'workflow', 'studies'].includes(paramCategory)
      ? paramCategory
      : 'all';

  const activeFormat: VisualFormat | null =
    paramFormat && paramFormat in FORMAT_META ? paramFormat : null;

  const featured = useMemo(() => getFeaturedEssay(), []);

  const filteredEssays = useMemo(() => {
    return allEssays.filter((essay) => {
      if (activeFormat && essay.format !== activeFormat) return false;
      if (activeCategory !== 'all' && essay.category !== activeCategory)
        return false;
      return true;
    });
  }, [activeCategory, activeFormat]);

  const isDefaultView = activeCategory === 'all' && !activeFormat;

  const heroEssay = isDefaultView
    ? featured
    : filteredEssays[0] ?? null;

  const briefsList = useMemo(() => {
    if (!heroEssay) return [];
    const rest = filteredEssays.filter((e) => e.slug !== heroEssay.slug);
    if (isDefaultView && !showAllBriefs) {
      return rest.slice(0, 4);
    }
    return rest;
  }, [filteredEssays, heroEssay, isDefaultView, showAllBriefs]);

  const handleSelectCategory = (cat: 'all' | EssayCategory) => {
    if (cat === 'all') {
      router.push('/', { scroll: false });
    } else {
      router.push(`/?category=${cat}`, { scroll: false });
    }
  };

  const clearFilters = () => {
    router.push('/', { scroll: false });
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Category Filter Controls & Active Format Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Filter visual stories by topic"
          className="flex flex-wrap items-center gap-2"
        >
          {CATEGORY_ORDER.map((cat) => {
            const isSelected = activeCategory === cat && !activeFormat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => handleSelectCategory(cat)}
                className={`h-8 rounded-full px-4 font-sans text-[10.5px] font-bold tracking-[0.07em] whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C] ${
                  isSelected
                    ? 'bg-[#131E29] text-[#F3EFE6]'
                    : 'border border-[#B8B2A4] bg-transparent text-[#3D3B36] hover:border-[#141414] hover:text-[#141414]'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>

        {/* Clean unboxed editorial series descriptor on desktop, or active format indicator */}
        {activeFormat ? (
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#5A5750]">
            <span>Format: {FORMAT_META[activeFormat].title}</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 font-sans text-[12px] font-semibold text-[#4A7C8C] hover:underline"
            >
              <span>Reset</span>
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <p className="hidden font-mono text-[11px] text-[#5A5750] lg:block">
            {siteConfig.journalSeries} · {siteConfig.authorRole}
          </p>
        )}
      </div>

      {/* Empty Filter Recovery State */}
      {!heroEssay ? (
        <section className="rounded-[12px] border border-[#CFC9BC] bg-[#E7E2D6] p-8 text-center">
          <p className="font-serif text-[20px] font-bold text-[#141414]">
            No visual briefs match this filter yet.
          </p>
          <p className="mt-1.5 font-sans text-[13.5px] text-[#5A5750]">
            Add a new essay module in your content folder or return to all
            published issues.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 inline-flex h-10 items-center rounded-full bg-[#131E29] px-5 font-sans text-[12px] font-bold text-[#F3EFE6] hover:bg-[#1E2E3E]"
          >
            Show all visual stories
          </button>
        </section>
      ) : (
        <>
          {/* Flow 01 Featured Hero Story Card (Asymmetric Editorial Spread on Desktop) */}
          <article className="group">
            <Link
              href={`/posts/${heroEssay.slug}`}
              className="grid grid-cols-1 items-stretch gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A7C8C] lg:grid-cols-12 lg:gap-8"
            >
              {/* Visual Plate + High-Contrast Metric Overlay Badge */}
              <div className="relative lg:col-span-7">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-[10px] border border-[#CFC9BC]/60 lg:h-full lg:min-h-[300px]">
                  <VisualPlate
                    plate={heroEssay.heroPlate}
                    className="h-full w-full"
                  />
                </div>

                {/* Dark Metric Overlay Badge (19.8% GROWTH) */}
                <div className="absolute right-3 top-3 rounded-[8px] bg-[#131E29]/95 px-3.5 py-2.5 text-center sm:right-4 sm:top-4 sm:px-4 sm:py-3">
                  <p className="font-sans text-[18px] font-extrabold leading-none tabular-nums text-white sm:text-[21px]">
                    {heroEssay.heroBadge.value}
                  </p>
                  <p className="mt-1 font-sans text-[9.5px] font-semibold tracking-[0.07em] text-[#9BB5C0]">
                    {heroEssay.heroBadge.label}
                  </p>
                </div>
              </div>

              {/* Hero Editorial Typography */}
              <div className="flex flex-col justify-between lg:col-span-5 lg:py-1">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.09em] text-[#5A5750]">
                    {heroEssay.issueShort}
                  </p>
                  <h1 className="mt-2 font-serif text-[26px] font-bold leading-[1.12] tracking-[-0.02em] text-[#141414] transition-colors group-hover:text-[#4A7C8C] sm:text-[34px] lg:text-[38px]">
                    {heroEssay.title}
                  </h1>
                  <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-[#4E4C46] sm:text-[15px]">
                    {heroEssay.subtitle}
                  </p>
                </div>

                <div className="mt-4 hidden items-center justify-between border-t border-[#CFC9BC] pt-4 lg:flex">
                  <span className="font-mono text-[11px] tabular-nums text-[#5A5750]">
                    {heroEssay.kpiSplit[0].value} {heroEssay.kpiSplit[0].unit} ·{' '}
                    {heroEssay.kpiSplit[1].value} {heroEssay.kpiSplit[1].unit}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#4A7C8C]">
                    <span>Read brief</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </article>

          <hr className="border-[#CFC9BC]" />

          {/* Latest Visual Briefs Grid */}
          {briefsList.length > 0 && (
            <section aria-labelledby="latest-briefs-heading">
              <div className="flex items-center justify-between gap-4">
                <h2
                  id="latest-briefs-heading"
                  className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]"
                >
                  LATEST VISUAL BRIEFS
                </h2>
                {isDefaultView ? (
                  <button
                    type="button"
                    onClick={() => setShowAllBriefs((prev) => !prev)}
                    className="inline-flex items-center gap-1 font-sans text-[12px] font-semibold text-[#4A7C8C] whitespace-nowrap hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
                  >
                    <span>
                      {showAllBriefs ? 'Show compact' : 'View all'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 font-sans text-[12px] font-semibold text-[#4A7C8C] whitespace-nowrap hover:underline"
                  >
                    <span>All issues</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* 2-Column Visual Grid on Mobile, Scaling Cleanly on Desktop */}
              <div className="mt-4 grid grid-cols-2 gap-3.5 sm:gap-6 lg:grid-cols-4">
                {briefsList.map((essay) => (
                  <article key={essay.slug} className="group flex flex-col">
                    <Link
                      href={`/posts/${essay.slug}`}
                      className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A7C8C]"
                    >
                      <div className="aspect-[169/122] w-full overflow-hidden rounded-[8px]">
                        {essay.feedCardStyle === 'chart' && essay.feedBarChart ? (
                          <MiniBarIndexChart
                            title={essay.feedBarChart.title}
                            bars={essay.feedBarChart.bars}
                          />
                        ) : (
                          <VisualPlate
                            plate={essay.heroPlate}
                            compact
                            className="h-full w-full"
                          />
                        )}
                      </div>

                      <h3 className="mt-3 font-serif text-[15px] font-bold leading-snug text-[#141414] transition-colors group-hover:text-[#4A7C8C] sm:text-[17px]">
                        {essay.title}
                      </h3>
                      <p className="mt-1.5 font-mono text-[9.5px] tracking-[0.04em] text-[#5A5750] sm:text-[10.5px]">
                        {essay.mediaSummary}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Flow 01 Bottom Visual Newsletter Teaser */}
      <NewsletterCard variant="teaser" />
    </div>
  );
}
