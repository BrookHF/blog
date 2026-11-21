import type { VisualEssay } from '../types';

export const costOfSoloBuilding2026: VisualEssay = {
  slug: 'cost-of-solo-building-2026',
  issueNumber: 'ISSUE NO. 002',
  issueShort: 'ISSUE 02 · 3 MIN VISUAL READ',
  publishedLabel: 'SEP 2026 · 3 MIN',
  readTime: '3 MIN',
  mediaSummary: '4 CHARTS · 3 MIN',
  category: 'metrics',
  format: 'cost-audits',

  title: 'The 2026 Cost of Solo Building',
  subtitle: 'A line-by-line P&L breakdown of running a profitable one-person software studio.',
  heroBadge: {
    value: '$184',
    label: 'MONTHLY',
  },

  feedCardStyle: 'chart',
  heroPlate: {
    alt: 'Minimalist cost audit ledger placeholder',
    motif: 'minimal-frame',
    figureLabel: 'FIG. 01 · LEDGER AUDIT',
    aspectHint: '16:9 · UPLOAD PHOTO',
    tone: 'slate',
  },
  feedBarChart: {
    title: 'SOLO OVERHEAD INDEX',
    bars: [
      { label: 'Hosting', value: 53, color: '#325368', detail: '$48/mo edge & static' },
      { label: 'Storage', value: 78, color: '#4A7C8C', detail: '$62/mo DB & backups' },
      { label: 'Mail', value: 100, color: '#73937E', detail: '$39/mo transactional' },
      { label: 'Design', value: 38, color: '#C48F5A', detail: '$20/mo core licenses' },
      { label: 'Domains', value: 25, color: '#E6DFD1', detail: '$15/mo DNS & certs' },
    ],
  },
  upNextStyle: 'sparkline',
  sparklineValues: [88, 74, 66, 48, 39, 32],

  outcomes: {
    sectionTitle: 'OUTCOMES & METRICS',
    leftPlate: {
      alt: 'Quarterly tool consolidation worksheet placeholder',
      motif: 'tablet-sketch',
      figureLabel: 'FIG. 02 · STACK PRUNING',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'stone',
    },
    leftCaptionTitle: 'Audit subscriptions quarterly,',
    leftCaptionBody: 'defaulting to static & open tools.',
    chartTitle: 'Monthly burn per product',
    chartUnit: 'USD',
    chartPoints: [
      { label: '2022', value: 92, note: '$490/mo multi-SaaS sprawl' },
      { label: '2023', value: 78, note: '$410/mo consolidated CI' },
      { label: '2024', value: 61, note: '$320/mo dropped seat bloat' },
      { label: '2025', value: 44, note: '$235/mo edge-first stack' },
      { label: '2025 H2', value: 38, note: '$205/mo automated backups' },
      { label: '2026', value: 34, note: '$184/mo lean core baseline' },
    ],
    rightCaptionTitle: 'Fixed costs dropped 61%',
    rightCaptionBody: 'while total traffic tripled.',
  },

  kpiSplit: [
    {
      value: '$184',
      unit: '/mo',
      description: 'Total fixed infrastructure spend across three live apps.',
      icon: 'trend',
    },
    {
      value: '61%',
      unit: 'saved',
      description: 'Annualized burn removed by pruning overlapping SaaS tools.',
      icon: 'clock',
    },
  ],

  workflow: {
    sectionTitle: 'THE 3-STEP COST AUDIT',
    steps: [
      {
        number: '01',
        title: 'LIST',
        tone: 'sand',
        schematic: 'notes',
        summary:
          'Export the last 90 days of card statements and tag every recurring charge as Core Infra or Convenience.',
      },
      {
        number: '02',
        title: 'CONSOLIDATE',
        tone: 'charcoal',
        schematic: 'code',
        summary:
          'Replace redundant analytics, form backends, and monitoring seats with lightweight native primitives.',
      },
      {
        number: '03',
        title: 'LOCK',
        tone: 'slate',
        schematic: 'gauge',
        summary:
          'Set a hard $200/month studio ceiling—any new subscription requires canceling an older one first.',
      },
    ],
  },

  editorialNotes: {
    heading: 'Low Overhead Buys Creative Patience',
    paragraphs: [
      'A high monthly software bill quietly warps product judgment. When infrastructure and seat licenses cost thousands before a single sale clears, builders are pressured into short-term monetization hacks.',
      'Keeping total operational overhead under two hundred dollars per month turns time into an ally. Products can mature slowly, stay ad-free, and compound organically through word of mouth.',
    ],
  },

  takeaway: {
    focusValue: '81%',
    headline: '81% of value comes from just 4 foundational utilities.',
    bullets: [
      'Cancel any tool unused for 14 days',
      'Prefer static content over managed CMS fees',
    ],
    segments: [
      {
        label: 'Edge Hosting & Data',
        percentage: 46,
        color: '#131E29',
        detail: '$85/mo — Core compute, Postgres/storage, and automated backups.',
      },
      {
        label: 'Email & Delivery',
        percentage: 21,
        color: '#4A7C8C',
        detail: '$39/mo — Reader dispatch and transactional receipts.',
      },
      {
        label: 'Design & Dev Tools',
        percentage: 19,
        color: '#C48F5A',
        detail: '$35/mo — Local-first editors and typography licenses.',
      },
      {
        label: 'Domains & Reserves',
        percentage: 14,
        color: '#C8C2B4',
        detail: '$25/mo — DNS, SSL renewals, and domain buffer.',
      },
    ],
  },

  pullQuote: {
    quote: 'Every dollar you do not burn is another week you own your roadmap.',
    attribution: 'P&L Audit · Issue 02',
    plate: {
      alt: 'Quiet desk audit at dusk placeholder',
      motif: 'night-lamp',
      figureLabel: 'FIG. 03 · LEDGER CLOSE',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'moody',
    },
  },
};
