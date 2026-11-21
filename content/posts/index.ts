import type { EssayCategory, VisualEssay, VisualFormat } from '../types';
import { anatomyOfTheFiveHourWeek } from './anatomy-of-the-five-hour-week';
import { smallTeamsOutsizedOutput } from './small-teams-outsized-output';
import { costOfSoloBuilding2026 } from './cost-of-solo-building-2026';
import { designingFor100TrueReaders } from './designing-for-100-true-readers';
import { insideAZeroMeetingStudio } from './inside-a-zero-meeting-studio';

/**
 * HOW TO ADD A NEW BLOG POST IN 2 STEPS:
 * 1. Duplicate any file in `/content/posts/` (e.g. `my-new-essay.ts`) and edit its fields.
 *    Drop your own photos into `/public/images/...` and set `imageSrc: "/images/your-photo.jpg"`
 *    on any plate to replace the minimalist placeholder automatically.
 * 2. Import your post above and add it to the top of `allEssays` below.
 *    Feeds, Explorer counts, category/format filters, static routes, and "Up Next" cards update automatically.
 */
export const allEssays: VisualEssay[] = [
  anatomyOfTheFiveHourWeek,
  smallTeamsOutsizedOutput,
  costOfSoloBuilding2026,
  designingFor100TrueReaders,
  insideAZeroMeetingStudio,
];

export function getFeaturedEssay(): VisualEssay {
  return allEssays.find((post) => post.featured) ?? allEssays[0];
}

export function getEssayBySlug(slug: string): VisualEssay | undefined {
  return allEssays.find((post) => post.slug === slug);
}

export function getNextEssays(currentSlug: string, count = 2): VisualEssay[] {
  const others = allEssays.filter((post) => post.slug !== currentSlug);
  // Keep the iconic Flow 04 pair ("Designing for 100 True Readers" & "Inside a Zero-Meeting Studio")
  // first when reading the featured Issue 04 essay.
  if (currentSlug === 'anatomy-of-the-five-hour-week') {
    const preferred = [
      'designing-for-100-true-readers',
      'inside-a-zero-meeting-studio',
    ];
    const prioritized = preferred
      .map((slug) => others.find((p) => p.slug === slug))
      .filter((p): p is VisualEssay => Boolean(p));
    const remaining = others.filter((p) => !preferred.includes(p.slug));
    return [...prioritized, ...remaining].slice(0, count);
  }
  return others.slice(0, count);
}

export function getEditorialCounts() {
  const totalPosts = allEssays.length;
  const chartLedCount = allEssays.filter(
    (p) => p.format === 'charts-metrics' || p.format === 'cost-audits' || p.feedCardStyle === 'chart'
  ).length;
  const photoEssaysCount = allEssays.filter(
    (p) => p.format === 'studio-tours' || p.feedCardStyle === 'visual'
  ).length;
  const totalCharts = allEssays.reduce(
    (acc, post) => acc + (post.feedBarChart ? 3 : 2),
    0
  );

  return {
    totalPosts,
    chartLedCount,
    photoEssaysCount,
    totalCharts,
  };
}

export const CATEGORY_LABELS: Record<'all' | EssayCategory, string> = {
  all: 'ALL',
  metrics: 'METRICS',
  workflow: 'WORKFLOW',
  studies: 'STUDIES',
};

export const FORMAT_META: Record<
  VisualFormat,
  { title: string; subtitle: string }
> = {
  'charts-metrics': {
    title: 'Charts & Metrics',
    subtitle: 'Fast data breakdowns',
  },
  'studio-tours': {
    title: 'Studio Tours',
    subtitle: 'Candid builder setups',
  },
  workflows: {
    title: 'Workflows',
    subtitle: 'Visual step playbooks',
  },
  'cost-audits': {
    title: 'Cost Audits',
    subtitle: 'Real P&L snapshots',
  },
};
