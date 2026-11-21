import type { VisualEssay } from '../types';

export const smallTeamsOutsizedOutput: VisualEssay = {
  slug: 'small-teams-outsized-output',
  issueNumber: 'ISSUE NO. 003',
  issueShort: 'ISSUE 03 · 2 MIN VISUAL READ',
  publishedLabel: 'OCT 2026 · 2 MIN',
  readTime: '2 MIN',
  mediaSummary: '6 PHOTOS · 2 MIN',
  category: 'studies',
  format: 'studio-tours',

  title: 'Small Teams, Outsized Output',
  subtitle: 'Inside three sub-five-person studios shipping category-defining software.',
  heroBadge: {
    value: '2.8×',
    label: 'VELOCITY',
  },

  feedCardStyle: 'visual',
  heroPlate: {
    alt: 'Minimalist architectural studio layout placeholder',
    motif: 'architectural-grid',
    figureLabel: 'FIG. 01 · STUDIO STUDY',
    aspectHint: '4:3 · UPLOAD PHOTO',
    tone: 'stone',
  },
  upNextStyle: 'schematic',

  outcomes: {
    sectionTitle: 'OUTCOMES & METRICS',
    leftPlate: {
      alt: 'Two-person studio pairing table placeholder',
      motif: 'architectural-grid',
      figureLabel: 'FIG. 02 · SHARED CANVAS',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'stone',
    },
    leftCaptionTitle: 'Shared context beats specs,',
    leftCaptionBody: 'cutting review handoffs in half.',
    chartTitle: 'Releases per maker',
    chartUnit: 'Ships/Qtr',
    chartPoints: [
      { label: '12-ppl', value: 24, note: 'Heavy cross-team alignment tax' },
      { label: '8-ppl', value: 38, note: 'Split squad sprint overhead' },
      { label: '6-ppl', value: 52, note: 'Two parallel tracks' },
      { label: '4-ppl', value: 76, note: 'Direct designer-engineer loop' },
      { label: '3-ppl', value: 89, note: 'Single shared architecture map' },
      { label: '2-ppl', value: 95, note: 'Zero-handoff continuous shipping' },
    ],
    rightCaptionTitle: 'Coordination cost drops fast',
    rightCaptionBody: 'below four active contributors.',
  },

  kpiSplit: [
    {
      value: '2.8×',
      unit: 'output',
      description: 'Median shipped features per maker vs. 12-person squads.',
      icon: 'users',
    },
    {
      value: '42%',
      unit: 'fewer',
      description: 'Reduction in ticket re-opens from direct pairing.',
      icon: 'layers',
    },
  ],

  workflow: {
    sectionTitle: 'THE 3-STEP STUDIO LOOP',
    steps: [
      {
        number: '01',
        title: 'FRAME',
        tone: 'sand',
        schematic: 'notes',
        summary:
          'Write a one-page visual brief with exact boundaries before opening Figma or an IDE.',
      },
      {
        number: '02',
        title: 'PAIR',
        tone: 'charcoal',
        schematic: 'code',
        summary:
          'Design directly in the browser beside production data rather than passing static redlines over the wall.',
      },
      {
        number: '03',
        title: 'AUDIT',
        tone: 'slate',
        schematic: 'gauge',
        summary:
          'Review live customer sessions every Friday for 20 minutes and fold findings straight into Monday.',
      },
    ],
  },

  editorialNotes: {
    heading: 'The Communication Surface Area Tax',
    paragraphs: [
      'Every additional seat on a product team adds quadratic communication paths. What looks like parallel velocity on a roadmap often degrades into status synchronization, translation layers, and defensive documentation.',
      'Across six studio visits documented for this issue, the highest-performing teams shared one structural habit: every contributor owned both visual quality and shipping reliability from start to finish.',
    ],
  },

  takeaway: {
    focusValue: '74%',
    headline: '74% of shipped polish happens during direct build reviews.',
    bullets: [
      'Eliminate static handoff decks',
      'Keep core squads under four makers',
    ],
    segments: [
      {
        label: 'Direct Build & Polish',
        percentage: 54,
        color: '#131E29',
        detail: '54% — Co-designing edge states directly in code.',
      },
      {
        label: 'Visual Framing',
        percentage: 20,
        color: '#4A7C8C',
        detail: '20% — Early sketches and scope boundaries.',
      },
      {
        label: 'User Telemetry Review',
        percentage: 16,
        color: '#C48F5A',
        detail: '16% — Weekly audit of real friction points.',
      },
      {
        label: 'Async Check-ins',
        percentage: 10,
        color: '#C8C2B4',
        detail: '10% — Written changelog updates, zero standups.',
      },
    ],
  },

  pullQuote: {
    quote: 'Small teams move faster because nobody waits for permission to care.',
    attribution: 'Studio Field Study · Issue 03',
    plate: {
      alt: 'Evening studio desk lamp placeholder',
      motif: 'night-lamp',
      figureLabel: 'FIG. 03 · STUDIO NOTES',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'moody',
    },
  },
};
