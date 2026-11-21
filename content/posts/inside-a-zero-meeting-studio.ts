import type { VisualEssay } from '../types';

export const insideAZeroMeetingStudio: VisualEssay = {
  slug: 'inside-a-zero-meeting-studio',
  issueNumber: 'ISSUE NO. 000',
  issueShort: 'ISSUE 00 · 3 MIN VISUAL READ',
  publishedLabel: 'JUL 2026 · 3 MIN',
  readTime: '3 MIN',
  mediaSummary: '3 MIN · 8 PHOTOS',
  category: 'studies',
  format: 'studio-tours',

  title: 'Inside a Zero-Meeting Studio',
  subtitle: 'How replacing recurring calendar invites with written artifacts restored 14 hours a week.',
  heroBadge: {
    value: '91%',
    label: 'DEEP WORK',
  },

  feedCardStyle: 'visual',
  heroPlate: {
    alt: 'Minimalist zero-meeting studio room layout placeholder',
    motif: 'studio-blocks',
    figureLabel: 'FIG. 01 · STUDIO FLOOR',
    aspectHint: '4:3 · UPLOAD PHOTO',
    tone: 'warm',
  },
  upNextStyle: 'schematic',

  outcomes: {
    sectionTitle: 'OUTCOMES & METRICS',
    leftPlate: {
      alt: 'Quiet studio desk and printed pinboard placeholder',
      motif: 'studio-blocks',
      figureLabel: 'FIG. 02 · ASYNC WALL',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'stone',
    },
    leftCaptionTitle: 'Pin decisions in public,',
    leftCaptionBody: 'so nobody schedules a sync.',
    chartTitle: 'Uninterrupted maker hours',
    chartUnit: 'Hrs/Wk',
    chartPoints: [
      { label: 'M1', value: 36, note: '11 recurring weekly calls' },
      { label: 'M2', value: 48, note: 'Canceled Monday status sync' },
      { label: 'M3', value: 62, note: 'Moved critiques to Loom + docs' },
      { label: 'M4', value: 74, note: 'Introduced async decision log' },
      { label: 'M5', value: 85, note: 'Zero standing invites left' },
      { label: 'M6', value: 91, note: '91% calendar open for craft' },
    ],
    rightCaptionTitle: 'Deep blocks expanded fast',
    rightCaptionBody: 'once recurring calls vanished.',
  },

  kpiSplit: [
    {
      value: '0',
      unit: 'syncs',
      description: 'Recurring calendar meetings kept on the studio schedule.',
      icon: 'clock',
    },
    {
      value: '91%',
      unit: 'focus',
      description: 'Share of weekly studio hours spent in unbroken maker mode.',
      icon: 'layers',
    },
  ],

  workflow: {
    sectionTitle: 'THE 3-STEP ASYNC PROTOCOL',
    steps: [
      {
        number: '01',
        title: 'WRITE',
        tone: 'sand',
        schematic: 'notes',
        summary:
          'Start every proposal as a visual memo with a clear default decision if no objections arrive in 24 hours.',
      },
      {
        number: '02',
        title: 'PROTOTYPE',
        tone: 'charcoal',
        schematic: 'code',
        summary:
          'Share working preview links instead of slide decks so feedback happens directly against real interactions.',
      },
      {
        number: '03',
        title: 'LOG',
        tone: 'slate',
        schematic: 'gauge',
        summary:
          'Archive every shipped choice in a dated studio changelog so new context is searchable in seconds.',
      },
    ],
  },

  editorialNotes: {
    heading: 'Protecting the Maker’s Schedule',
    paragraphs: [
      'A single thirty-minute check-in at 11:00 AM does not cost thirty minutes—it fractures an entire morning into two shallow fragments too short for architectural work.',
      'Removing every recurring meeting felt uncomfortable for ten days. By week three, written decisions were sharper, feedback was more thoughtful, and weekly output climbed without anyone working past five.',
    ],
  },

  takeaway: {
    focusValue: '91%',
    headline: '91% of weekly hours stayed unbroken after removing syncs.',
    bullets: [
      'Default to dated written memos',
      'Keep calls strictly opt-in for blockers',
    ],
    segments: [
      {
        label: 'Unbroken Deep Work',
        percentage: 64,
        color: '#131E29',
        detail: '64% — Multi-hour design and engineering sessions.',
      },
      {
        label: 'Written Critiques',
        percentage: 19,
        color: '#4A7C8C',
        detail: '19% — Async prototype reviews and memos.',
      },
      {
        label: 'Ad-hoc Pairing',
        percentage: 10,
        color: '#C48F5A',
        detail: '10% — On-demand 15-min huddles when truly stuck.',
      },
      {
        label: 'Admin & Ops',
        percentage: 7,
        color: '#C8C2B4',
        detail: '7% — Billing, planning, and studio maintenance.',
      },
    ],
  },

  pullQuote: {
    quote: 'Calendar whitespace is the raw material of original work.',
    attribution: 'Studio Tour · Issue 00',
    plate: {
      alt: 'Quiet studio lamp at twilight placeholder',
      motif: 'night-lamp',
      figureLabel: 'FIG. 03 · QUIET STUDIO',
      aspectHint: '4:3 · UPLOAD PHOTO',
      tone: 'moody',
    },
  },
};
