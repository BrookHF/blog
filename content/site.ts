import type { SiteConfig } from './types';

/**
 * CENTRAL SITE IDENTITY & PORTFOLIO CONFIG
 * Edit `mastheadName`, bio, and links here to personalize the entire site.
 */
export const siteConfig: SiteConfig = {
  mastheadName: 'BROOK HE',
  journalSeries: 'Scale & Substance',
  tagline: 'Visual-analytical notes on independent software, calm systems, and product craft.',
  authorRole: 'Product Designer & Independent Builder',
  location: 'San Francisco, CA',
  email: 'hello@brookhe.studio',
  currentIssueLabel: 'CURRENT EDITION · ISSUE 04',
  currentEditionTitle: 'The Lean Builder Index',
  currentEditionMeta: '5 visual case studies · 18 custom charts',
  nextIssueLabel: "DON'T MISS ISSUE 05",
  subscriberCount: '14,200',
  bio: [
    'I design and build focused digital products, visual essays, and analytical interfaces for small, high-leverage teams. Every piece in this journal pairs direct photographic observation with primary numbers—no filler paragraphs, no unmeasured claims.',
    'Scale & Substance serves as both my personal studio notebook and public portfolio: a running record of how constrained time budgets, clean tooling stacks, and calmer workflows outperform bloated organizations.',
  ],
  manifestoPrinciples: [
    {
      number: '01',
      title: 'Evidence Over Adjectives',
      body: 'Every claim sits directly beside a chart, audit, or workflow artifact that proves or qualifies it.',
    },
    {
      number: '02',
      title: 'Visual Rhythm First',
      body: 'Readers scan before they commit. Pair every insight with a crisp visual frame so the thesis is legible in thirty seconds.',
    },
    {
      number: '03',
      title: 'Small Scopes, Compounding Cadence',
      body: 'Capping weekly hours forces ruthless prioritization—eliminating busywork until only the core product loop remains.',
    },
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com', handle: '@brookhe' },
    { label: 'X / Twitter', href: 'https://x.com', handle: '@brookhe_studio' },
    { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'in/brookhe' },
    { label: 'RSS Feed', href: '#rss', handle: 'scale-and-substance.xml' },
  ],
};
