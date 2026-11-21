export type EssayCategory = 'metrics' | 'workflow' | 'studies';

export type VisualFormat =
  | 'charts-metrics'
  | 'studio-tours'
  | 'workflows'
  | 'cost-audits';

export type PlaceholderMotif =
  | 'desk-horizon'
  | 'architectural-grid'
  | 'tablet-sketch'
  | 'night-lamp'
  | 'studio-blocks'
  | 'reader-arc'
  | 'minimal-frame';

export interface VisualPlateConfig {
  /**
   * Drop your own photo path (e.g. "/images/my-photo.jpg") here to replace
   * the minimalist architectural placeholder automatically.
   */
  imageSrc?: string;
  alt: string;
  motif: PlaceholderMotif;
  figureLabel: string;
  aspectHint: string;
  tone?: 'warm' | 'stone' | 'moody' | 'slate';
}

export interface AreaChartPoint {
  label: string;
  value: number;
  note?: string;
}

export interface BarChartPoint {
  label: string;
  value: number;
  color: string;
  detail?: string;
}

export interface KpiItem {
  value: string;
  unit: string;
  description: string;
  icon?: 'users' | 'trend' | 'clock' | 'layers';
}

export interface WorkflowStep {
  number: string;
  title: string;
  tone: 'sand' | 'charcoal' | 'slate';
  schematic: 'notes' | 'code' | 'gauge';
  summary: string;
}

export interface DonutSegment {
  label: string;
  percentage: number;
  color: string;
  detail: string;
}

export interface VisualEssay {
  slug: string;
  issueNumber: string;
  issueShort: string;
  publishedLabel: string;
  readTime: string;
  mediaSummary: string;
  category: EssayCategory;
  format: VisualFormat;
  featured?: boolean;

  title: string;
  subtitle: string;
  heroBadge: {
    value: string;
    label: string;
  };

  /**
   * Controls whether the card on the Homepage Visual Feed leads with
   * a minimalist visual plate or a dark analytical chart card.
   */
  feedCardStyle: 'visual' | 'chart';
  heroPlate: VisualPlateConfig;
  feedBarChart?: {
    title: string;
    bars: BarChartPoint[];
  };
  upNextStyle: 'sparkline' | 'schematic';
  sparklineValues?: number[];

  /** Flow 02: Outcomes & Metrics two-column split */
  outcomes: {
    sectionTitle: string;
    leftPlate: VisualPlateConfig;
    leftCaptionTitle: string;
    leftCaptionBody: string;
    chartTitle: string;
    chartUnit: string;
    chartPoints: AreaChartPoint[];
    rightCaptionTitle: string;
    rightCaptionBody: string;
  };

  /** Flow 02: High-contrast split dark KPI card */
  kpiSplit: [KpiItem, KpiItem];

  /** Flow 02: 3-step visual workflow strip */
  workflow: {
    sectionTitle: string;
    steps: [WorkflowStep, WorkflowStep, WorkflowStep];
  };

  /** Concise editorial narrative blocks */
  editorialNotes: {
    heading: string;
    paragraphs: string[];
  };

  /** Flow 04: Donut-chart takeaway */
  takeaway: {
    focusValue: string;
    headline: string;
    bullets: string[];
    segments: DonutSegment[];
  };

  /** Flow 04: Photographic pull-quote banner */
  pullQuote: {
    quote: string;
    attribution?: string;
    plate: VisualPlateConfig;
  };
}

export interface PortfolioProject {
  id: string;
  title: string;
  year: string;
  role: string;
  category: string;
  summary: string;
  keyMetric: string;
  keyMetricLabel: string;
  deliverables: string[];
  plate: VisualPlateConfig;
  relatedEssaySlug?: string;
}

export interface SiteConfig {
  /** Personalize your masthead name on this single line */
  mastheadName: string;
  /** Editorial series identity preserved from the Scale & Substance design */
  journalSeries: string;
  tagline: string;
  authorRole: string;
  location: string;
  email: string;
  currentIssueLabel: string;
  currentEditionTitle: string;
  currentEditionMeta: string;
  nextIssueLabel: string;
  subscriberCount: string;
  bio: string[];
  manifestoPrinciples: {
    number: string;
    title: string;
    body: string;
  }[];
  socialLinks: {
    label: string;
    href: string;
    handle: string;
  }[];
}
