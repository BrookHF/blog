import type { VisualEssay } from '../types';

export const designingFor100TrueReaders: VisualEssay = {
  slug: 'designing-for-100-true-readers',
  issueNumber: 'ISSUE NO. 001',
  issueShort: 'ISSUE 01 · 2 MIN VISUAL READ',
  publishedLabel: 'AUG 2026 · 2 MIN',
  readTime: '2 MIN',
  mediaSummary: '2 MIN · 5 CHARTS',
  category: 'metrics',
  format: 'charts-metrics',

  title: 'Designing for 100 True Readers',
  subtitle: 'Why optimizing typography and chart density for depth beats chasing viral impressions.',
  heroBadge: {
    value: '82%',
    label: 'COMPLETION',
  },

  feedCardStyle: 'chart',
  heroPlate: {
    alt: 'Reading engagement curve placeholder',
    motif: 'reader-arc',
    figureLabel: 'FIG. 01 · READING CURVE',
    aspectHint: '16:9 · UPLOAD PHOTO',
    tone: 'slate',
  },
  feedBarChart: {
    title: 'SCROLL COMPLETION BY FORMAT',
    bars: [
      { label: 'Wall', value: 26, color: '#325368', detail: '26% plain text essay' },
      { label: 'List', value: 44, color: '#4A7C8C', detail: '44% bullet digest' },
      { label: 'Photo', value: 68, color: '#C48F5A', detail: '68% photo essay' },
      { label: 'Visual', value: 86, color: '#73937E', detail: '86% photo + chart' },
      { label: 'Brief', value: 82, color: '#E6DFD1', detail: '82% 3-min brief' },
    ],
  },
  upNextStyle: 'sparkline',
  sparklineValues: [24, 44, 38, 68, 79, 86],

  outcomes: {
    sectionTitle: 'OUTCOMES & METRICS',
    leftPlate: {
      alt: 'Editorial measure and paper grid study placeholder',
      motif: 'architectural-grid',
      figureLabel: 'FIG. 02 · MEASURE STUDY',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'stone',
    },
    leftCaptionTitle: 'Pair prose with visual anchors,',
    leftCaptionBody: 'respecting mobile scan rhythms.',
    chartTitle: 'Finish rate across formats',
    chartUnit: '% Read',
    chartPoints: [
      { label: 'I-01', value: 34, note: 'Long unillustrated essay' },
      { label: 'I-02', value: 49, note: 'Added pull quotes & rules' },
      { label: 'I-03', value: 58, note: 'Introduced split KPI block' },
      { label: 'I-04', value: 71, note: 'Paired charts with captions' },
      { label: 'I-05', value: 78, note: 'Trimmed to 3-min cadence' },
      { label: 'I-06', value: 84, note: 'Full visual-analytical grid' },
    ],
    rightCaptionTitle: 'Completion more than doubled',
    rightCaptionBody: 'when charts replaced exposition.',
  },

  kpiSplit: [
    {
      value: '82%',
      unit: 'finish',
      description: 'Readers reaching the final takeaway card on mobile.',
      icon: 'users',
    },
    {
      value: '4.6×',
      unit: 'replies',
      description: 'Higher reader reply rate compared to standard newsletters.',
      icon: 'trend',
    },
  ],

  workflow: {
    sectionTitle: 'THE 3-STEP EDITORIAL EDIT',
    steps: [
      {
        number: '01',
        title: 'DISTILL',
        tone: 'sand',
        schematic: 'notes',
        summary:
          'Reduce the entire draft to one central chart and two numbers before writing the opening paragraph.',
      },
      {
        number: '02',
        title: 'PAIR',
        tone: 'charcoal',
        schematic: 'code',
        summary:
          'Place every quantitative claim directly beside its visual proof so readers never scroll back to verify.',
      },
      {
        number: '03',
        title: 'TRIM',
        tone: 'slate',
        schematic: 'gauge',
        summary:
          'Cut 35% of adjectives during the final pass until every caption fits cleanly inside two lines.',
      },
    ],
  },

  editorialNotes: {
    heading: 'Writing for Attention You Earned',
    paragraphs: [
      'Most web essays fail in the first fifteen seconds because they ask for trust before demonstrating clarity. A visual-analytical opening reverses that contract: the headline, visual frame, and primary chart deliver the thesis upfront.',
      'Once readers see the evidence clearly, they stay for the nuance—and they forward the piece to peers who care about the same craft.',
    ],
  },

  takeaway: {
    focusValue: '82%',
    headline: '82% of readers finish briefs structured around visual proof.',
    bullets: [
      'Keep captions under two lines',
      'Lead with one undeniable metric',
    ],
    segments: [
      {
        label: 'Complete Read',
        percentage: 62,
        color: '#131E29',
        detail: '62% — Read every section through Up Next.',
      },
      {
        label: 'Visual Scan + Takeaway',
        percentage: 20,
        color: '#4A7C8C',
        detail: '20% — Scanned charts, KPIs, and summary card.',
      },
      {
        label: 'Mid-Article Bookmark',
        percentage: 11,
        color: '#C48F5A',
        detail: '11% — Saved link to return on desktop.',
      },
      {
        label: 'Early Bounce',
        percentage: 7,
        color: '#C8C2B4',
        detail: '7% — Exited before the metrics block.',
      },
    ],
  },

  pullQuote: {
    quote: 'Respecting a reader’s time is the highest form of editorial design.',
    attribution: 'Editorial Note · Issue 01',
    plate: {
      alt: 'Warm reading light placeholder',
      motif: 'night-lamp',
      figureLabel: 'FIG. 03 · READING ROOM',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'moody',
    },
  },
};
