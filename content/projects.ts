import type { PortfolioProject } from './types';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'cadence-ledger',
    title: 'Cadence Ledger',
    year: '2026',
    role: 'Design & Engineering',
    category: 'Financial Analytics',
    summary:
      'A calm P&L and recurring-cost instrument for solo founders and micro-studios, replacing multi-tab spreadsheets with a single weekly audit view.',
    keyMetric: '34%',
    keyMetricLabel: 'Avg. SaaS overhead cut',
    deliverables: ['Interface Architecture', 'SVG Chart Engine', 'Design System'],
    plate: {
      alt: 'Cadence Ledger product plate placeholder',
      motif: 'desk-horizon',
      figureLabel: 'WORK 01 · PRODUCT',
      aspectHint: '16:10 · DROP PHOTO',
      tone: 'warm',
    },
    relatedEssaySlug: 'cost-of-solo-building-2026',
  },
  {
    id: 'monograph-press',
    title: 'Monograph Press',
    year: '2025',
    role: 'Creative Direction',
    category: 'Editorial Publishing',
    summary:
      'A static-first reading platform engineered for visual essays, combining high-contrast print typography with lightweight interactive datasets.',
    keyMetric: '82%',
    keyMetricLabel: 'Median read completion',
    deliverables: ['Editorial System', 'Reading Metrics', 'Frontend Build'],
    plate: {
      alt: 'Monograph Press editorial system placeholder',
      motif: 'architectural-grid',
      figureLabel: 'WORK 02 · EDITORIAL',
      aspectHint: '16:10 · DROP PHOTO',
      tone: 'stone',
    },
    relatedEssaySlug: 'designing-for-100-true-readers',
  },
  {
    id: 'quiet-sprint',
    title: 'Quiet Sprint Protocol',
    year: '2025',
    role: 'Systems & Research',
    category: 'Workflow Tooling',
    summary:
      'An async planning ritual and five-hour weekly shipping framework adopted by small independent product teams across twelve countries.',
    keyMetric: '5 hrs',
    keyMetricLabel: 'Core weekly build cap',
    deliverables: ['Field Study', 'Playbook Visuals', 'Interactive Templates'],
    plate: {
      alt: 'Quiet Sprint Protocol sketchbook plate placeholder',
      motif: 'tablet-sketch',
      figureLabel: 'WORK 03 · SYSTEMS',
      aspectHint: '16:10 · DROP PHOTO',
      tone: 'stone',
    },
    relatedEssaySlug: 'anatomy-of-the-five-hour-week',
  },
];
