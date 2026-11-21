import type { VisualEssay } from '../types';

export const anatomyOfTheFiveHourWeek: VisualEssay = {
  slug: 'anatomy-of-the-five-hour-week',
  issueNumber: 'ISSUE NO. 004',
  issueShort: 'ISSUE 04 · 3 MIN VISUAL READ',
  publishedLabel: 'NOV 2026 · 3 MIN',
  readTime: '3 MIN',
  mediaSummary: '5 CHARTS · 3 MIN',
  category: 'workflow',
  format: 'workflows',
  featured: true,

  title: 'The Anatomy of the Five-Hour Week',
  subtitle: 'How independent builders ship more by capping scope.',
  heroBadge: {
    value: '19.8%',
    label: 'GROWTH',
  },

  feedCardStyle: 'visual',
  heroPlate: {
    alt: 'Minimalist studio desk placeholder for The Anatomy of the Five-Hour Week',
    motif: 'desk-horizon',
    figureLabel: 'FIG. 01 · STUDIO DESK',
    aspectHint: '16:9 · UPLOAD PHOTO',
    tone: 'warm',
  },
  upNextStyle: 'sparkline',
  sparklineValues: [28, 36, 33, 56, 52, 78],

  outcomes: {
    sectionTitle: 'OUTCOMES & METRICS',
    leftPlate: {
      alt: 'Angled tablet wireframe sketch placeholder',
      motif: 'tablet-sketch',
      figureLabel: 'FIG. 02 · CONSTRAINT SKETCH',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'stone',
    },
    leftCaptionTitle: 'Sketch constraints first,',
    leftCaptionBody: 'then build one core loop.',
    chartTitle: 'Focus hours vs output',
    chartUnit: 'Index',
    chartPoints: [
      { label: '2022', value: 31, note: 'Unstructured 18-hr side weeks' },
      { label: '2023', value: 42, note: 'Introduced weekly scope cap' },
      { label: '2024', value: 38, note: 'Tooling consolidation dip' },
      { label: '2025', value: 67, note: 'Two Tuesday focus blocks locked' },
      { label: '2025 H2', value: 63, note: 'Documentation & automation pass' },
      { label: '2026', value: 94, note: 'Sustained 5-hr shipping cadence' },
    ],
    rightCaptionTitle: 'Output rises smoothly',
    rightCaptionBody: 'while hours stay capped.',
  },

  kpiSplit: [
    {
      value: '5',
      unit: 'hrs/wk',
      description: 'Weekly focused cap for sustainable shipping.',
      icon: 'users',
    },
    {
      value: '34%',
      unit: 'costs',
      description: 'Lower tooling overhead than multi-tool stacks.',
      icon: 'trend',
    },
  ],

  workflow: {
    sectionTitle: 'THE 3-STEP VISUAL WORKFLOW',
    steps: [
      {
        number: '01',
        title: 'IDEATE',
        tone: 'sand',
        schematic: 'notes',
        summary:
          'Spend 45 minutes on Sunday evening collapsing ideas down to a single observable user constraint on three index cards.',
      },
      {
        number: '02',
        title: 'BUILD',
        tone: 'charcoal',
        schematic: 'code',
        summary:
          'Execute two protected 90-minute blocks with zero meetings, building strictly the core interactive loop and data layer.',
      },
      {
        number: '03',
        title: 'SHIP',
        tone: 'slate',
        schematic: 'gauge',
        summary:
          'Reserve the final 75 minutes on Tuesday night to verify metrics, capture one clear visual artifact, and publish.',
      },
    ],
  },

  editorialNotes: {
    heading: 'Why Artificial Scarcity Protects Craft',
    paragraphs: [
      'Most independent projects stall not from a lack of ambition, but from an unbounded calendar. When a release has forty open hours ahead of it, speculative refactors and secondary preferences expand to swallow the entire sprint.',
      'Capping build time at five deliberate hours per week flips the incentive structure. Every non-essential dependency, complex deployment ritual, and speculative sidebar gets cut before a single line is written—leaving a leaner codebase and a dramatically higher finish rate.',
    ],
  },

  takeaway: {
    focusValue: '68%',
    headline: '68% of solo output comes from 2 focused blocks.',
    bullets: [
      'Cut admin tools by half',
      'Ship every Tuesday night',
    ],
    segments: [
      {
        label: 'Deep Build Blocks',
        percentage: 48,
        color: '#131E29',
        detail: '2.4 hrs/wk — Uninterrupted implementation on the core loop.',
      },
      {
        label: 'Scope & Visual Sketching',
        percentage: 20,
        color: '#4A7C8C',
        detail: '1.0 hr/wk — Paper wireframes and single-metric constraints.',
      },
      {
        label: 'Shipping & Review',
        percentage: 20,
        color: '#C48F5A',
        detail: '1.0 hr/wk — QA, release notes, and Tuesday night publish.',
      },
      {
        label: 'Maintenance & Ops',
        percentage: 12,
        color: '#C8C2B4',
        detail: '0.6 hrs/wk — Automated checks and light housekeeping.',
      },
    ],
  },

  pullQuote: {
    quote: 'Lowering the stakes is the only way to keep building.',
    attribution: 'Field Note · Issue 04',
    plate: {
      alt: 'Warm desk lamp at night placeholder',
      motif: 'night-lamp',
      figureLabel: 'FIG. 03 · TUESDAY NIGHT',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'moody',
    },
  },
};
