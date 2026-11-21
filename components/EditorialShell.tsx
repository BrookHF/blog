'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Camera,
  Check,
  LayoutGrid,
  Menu,
  PieChart,
  Search,
  Share2,
  X,
} from 'lucide-react';
import { siteConfig } from '@/content/site';
import {
  allEssays,
  FORMAT_META,
  getEditorialCounts,
  getFeaturedEssay,
} from '@/content/posts';
import type { VisualFormat } from '@/content/types';

interface ShellContextValue {
  isExplorerOpen: boolean;
  openExplorer: () => void;
  closeExplorer: () => void;
  readingProgress: number;
  setReadingProgress: (pct: number) => void;
}

const ShellContext = createContext<ShellContextValue>({
  isExplorerOpen: false,
  openExplorer: () => {},
  closeExplorer: () => {},
  readingProgress: 0,
  setReadingProgress: () => {},
});

export function useEditorialShell() {
  return useContext(ShellContext);
}

const FORMAT_ITEMS: Array<{
  key: VisualFormat;
  icon: typeof BarChart3;
}> = [
  { key: 'charts-metrics', icon: BarChart3 },
  { key: 'studio-tours', icon: Camera },
  { key: 'workflows', icon: LayoutGrid },
  { key: 'cost-audits', icon: PieChart },
];

export default function EditorialShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const isArticlePage = pathname.startsWith('/posts/');
  const counts = useMemo(() => getEditorialCounts(), []);
  const featured = useMemo(() => getFeaturedEssay(), []);

  const closeExplorer = () => {
    setIsExplorerOpen(false);
    setSearchQuery('');
  };

  // Escape key & scroll lock for Explorer drawer
  useEffect(() => {
    if (!isExplorerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExplorerOpen(false);
        setSearchQuery('');
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isExplorerOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allEssays.filter((essay) => {
      const haystack = [
        essay.title,
        essay.subtitle,
        essay.issueNumber,
        essay.category,
        essay.format,
        essay.heroBadge.value,
        essay.heroBadge.label,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      window.setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      setCopiedShare(true);
      window.setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleNavigate = (href: string) => {
    closeExplorer();
    router.push(href);
  };

  const contextValue = useMemo(
    () => ({
      isExplorerOpen,
      openExplorer: () => setIsExplorerOpen(true),
      closeExplorer,
      readingProgress,
      setReadingProgress,
    }),
    [isExplorerOpen, readingProgress]
  );

  return (
    <ShellContext.Provider value={contextValue}>
      <div className="min-h-screen bg-[#F3EFE6] text-[#141414]">
        {/* Top Editorial Masthead / Compact Sticky Article Bar */}
        {isArticlePage ? (
          <header className="sticky top-0 z-30 bg-[#F3EFE6]/95 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
              <Link
                href="/"
                className="inline-flex min-h-[40px] items-center gap-1.5 font-sans text-[13px] font-semibold text-[#4A7C8C] whitespace-nowrap shrink-0 transition-colors hover:text-[#141414] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Feed</span>
              </Link>

              <Link
                href="/"
                className="font-serif text-[18px] font-bold tracking-[-0.02em] text-[#141414] whitespace-nowrap shrink-0 sm:text-[20px]"
              >
                {siteConfig.mastheadName}
              </Link>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex min-h-[40px] items-center gap-1.5 px-2 font-sans text-[12.5px] font-semibold text-[#141414] whitespace-nowrap transition-colors hover:text-[#4A7C8C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
                  aria-label="Copy article link"
                >
                  {copiedShare ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#4A7C8C]" aria-hidden="true" />
                      <span className="text-[#4A7C8C]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsExplorerOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#141414] transition-colors hover:bg-[#E7E2D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
                  aria-label="Open editorial index"
                  aria-expanded={isExplorerOpen}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Baseline rule + live Reading Progress Bar */}
            <div className="mx-auto max-w-5xl px-5 sm:px-8">
              <div className="relative h-[2.5px] w-full bg-[#CFC9BC]">
                <div
                  className="h-full origin-left bg-[#4A7C8C] transition-transform duration-100 ease-out"
                  style={{
                    transform: `scaleX(${Math.max(0.02, Math.min(1, readingProgress / 100))})`,
                  }}
                />
              </div>
            </div>
          </header>
        ) : (
          <header className="bg-[#F3EFE6] pt-4 sm:pt-6">
            <div className="mx-auto max-w-5xl px-5 sm:px-8">
              {/* Strict 3-Zone Top Bar Contract */}
              <div className="flex items-center justify-between gap-8 pb-3.5">
                {/* Zone 1: Single-line Wordmark */}
                <Link
                  href="/"
                  className="font-serif text-[22px] font-bold tracking-[-0.02em] text-[#141414] whitespace-nowrap shrink-0 sm:text-[26px]"
                >
                  {siteConfig.mastheadName}
                </Link>

                {/* Zone 2: 4 clean single-line text nav links on desktop */}
                <nav
                  aria-label="Primary navigation"
                  className="hidden items-center gap-7 md:flex"
                >
                  <Link
                    href="/"
                    className={`font-sans text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors hover:text-[#141414] ${
                      pathname === '/'
                        ? 'text-[#141414] underline decoration-[#4A7C8C] decoration-2 underline-offset-[6px]'
                        : 'text-[#5A5750]'
                    }`}
                  >
                    Visual Feed
                  </Link>
                  <Link
                    href="/?category=metrics"
                    className="font-sans text-[13.5px] font-medium text-[#5A5750] whitespace-nowrap shrink-0 transition-colors hover:text-[#141414]"
                  >
                    Data &amp; Charts
                  </Link>
                  <Link
                    href="/?format=studio-tours"
                    className="font-sans text-[13.5px] font-medium text-[#5A5750] whitespace-nowrap shrink-0 transition-colors hover:text-[#141414]"
                  >
                    Photo Essays
                  </Link>
                  <Link
                    href="/about"
                    className={`font-sans text-[13.5px] font-medium whitespace-nowrap shrink-0 transition-colors hover:text-[#141414] ${
                      pathname === '/about'
                        ? 'text-[#141414] underline decoration-[#4A7C8C] decoration-2 underline-offset-[6px]'
                        : 'text-[#5A5750]'
                    }`}
                  >
                    About
                  </Link>
                </nav>

                {/* Zone 3: Single primary action (Explorer Index trigger) */}
                <div className="flex items-center shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsExplorerOpen(true)}
                    className="inline-flex h-10 items-center gap-2 rounded-md px-2.5 text-[#141414] whitespace-nowrap transition-colors hover:bg-[#E7E2D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
                    aria-label="Open editorial index and topic explorer"
                    aria-expanded={isExplorerOpen}
                  >
                    <span className="hidden font-mono text-[11px] font-medium tracking-[0.06em] text-[#5A5750] sm:inline">
                      INDEX
                    </span>
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Signature Double-Rule Editorial Divider */}
              <div className="border-t-[1.5px] border-[#141414]" />
              <div className="mt-[3px] border-t border-[#C8C2B4]" />
            </div>
          </header>
        )}

        {/* Main Content Area */}
        <main className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pt-7">
          {children}
        </main>

        {/* Quiet Editorial Footer */}
        <footer className="mx-auto max-w-5xl px-5 pb-12 sm:px-8">
          <div className="border-t border-[#CFC9BC] pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[11px] text-[#5A5750]">
                {siteConfig.mastheadName} · {siteConfig.journalSeries} · 2026
              </p>
              <div className="flex flex-wrap items-center gap-5 font-sans text-[12.5px] text-[#5A5750]">
                <Link href="/" className="hover:text-[#141414]">
                  Visual Feed
                </Link>
                <Link href="/about" className="hover:text-[#141414]">
                  About &amp; Portfolio
                </Link>
                <button
                  type="button"
                  onClick={() => setIsExplorerOpen(true)}
                  className="hover:text-[#141414]"
                >
                  Topic Explorer
                </button>
              </div>
            </div>
          </div>
        </footer>

        {/* Flow 03: Slide-Over Navigation & Topic Explorer */}
        <AnimatePresence>
          {isExplorerOpen && (
            <div
              className="fixed inset-0 z-50 flex justify-end"
              role="dialog"
              aria-modal="true"
              aria-label="Editorial index and topic explorer"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setIsExplorerOpen(false)}
                className="fixed inset-0 bg-[#131E29]/45 backdrop-blur-[2px]"
              />

              {/* Slide-over warm paper sheet */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex h-full w-full max-w-[430px] flex-col overflow-y-auto border-l border-[#CFC9BC] bg-[#F3EFE6] px-5 pb-8 pt-5 text-[#141414] sm:px-7"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between gap-4 pb-3.5">
                  <span className="font-serif text-[21px] font-bold tracking-[-0.02em] text-[#141414]">
                    {siteConfig.mastheadName}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsExplorerOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[#141414] transition-colors hover:bg-[#E7E2D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
                    aria-label="Close editorial index"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="border-t-[1.5px] border-[#141414]" />

                {/* Live Search Input */}
                <div className="mt-5">
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A5750]"
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search visual stories, metrics, issues..."
                      aria-label="Search visual stories, metrics, issues"
                      className="h-11 w-full rounded-[10px] border border-[#C8C2B4] bg-[#E7E2D6] pl-10 pr-4 font-sans text-[13px] text-[#141414] placeholder:text-[#6E6A62] focus:border-[#131E29] focus:outline-none"
                    />
                  </div>

                  {/* Live Search Results Panel */}
                  {searchQuery.trim().length > 0 && (
                    <div className="mt-3 rounded-[10px] border border-[#CFC9BC] bg-[#FAF7F1] p-3">
                      <div className="flex items-center justify-between border-b border-[#E5DFD2] pb-2">
                        <span className="font-mono text-[10px] tracking-[0.08em] text-[#5A5750]">
                          {searchResults.length}{' '}
                          {searchResults.length === 1 ? 'MATCH' : 'MATCHES'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="font-mono text-[10px] text-[#4A7C8C] hover:underline"
                        >
                          Clear
                        </button>
                      </div>

                      {searchResults.length === 0 ? (
                        <p className="py-3 font-sans text-[13px] text-[#5A5750]">
                          No visual stories match &ldquo;{searchQuery}&rdquo;. Try
                          &ldquo;metrics&rdquo;, &ldquo;solo&rdquo;, or &ldquo;004&rdquo;.
                        </p>
                      ) : (
                        <ul className="divide-y divide-[#E5DFD2]">
                          {searchResults.map((essay) => (
                            <li key={essay.slug}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleNavigate(`/posts/${essay.slug}`)
                                }
                                className="flex w-full items-center justify-between gap-3 py-2.5 text-left transition-colors hover:text-[#4A7C8C]"
                              >
                                <div className="min-w-0">
                                  <p className="truncate font-serif text-[15px] font-bold text-[#141414]">
                                    {essay.title}
                                  </p>
                                  <p className="mt-0.5 font-mono text-[10px] text-[#5A5750]">
                                    {essay.issueNumber} · {essay.heroBadge.value}{' '}
                                    {essay.heroBadge.label}
                                  </p>
                                </div>
                                <ArrowRight
                                  className="h-4 w-4 shrink-0 text-[#4A7C8C]"
                                  aria-hidden="true"
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Primary Editorial Index (01 - 04) */}
                <nav aria-label="Editorial index" className="mt-6">
                  <ul className="divide-y divide-[#CFC9BC] border-b border-[#CFC9BC]">
                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('/')}
                        className="group flex w-full items-baseline justify-between py-3.5 text-left transition-colors hover:text-[#4A7C8C]"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[11px] tabular-nums text-[#5A5750]">
                            01
                          </span>
                          <span className="font-serif text-[21px] font-bold text-[#141414] group-hover:text-[#4A7C8C]">
                            Visual Feed
                          </span>
                        </span>
                        <span className="font-mono text-[10.5px] tabular-nums text-[#5A5750]">
                          {String(counts.totalPosts).padStart(2, '0')} POSTS
                        </span>
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('/?category=metrics')}
                        className="group flex w-full items-baseline justify-between py-3.5 text-left transition-colors hover:text-[#4A7C8C]"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[11px] tabular-nums text-[#5A5750]">
                            02
                          </span>
                          <span className="font-serif text-[21px] font-bold text-[#141414] group-hover:text-[#4A7C8C]">
                            Data &amp; Charts
                          </span>
                        </span>
                        <span className="font-mono text-[10.5px] tabular-nums text-[#5A5750]">
                          {String(counts.totalCharts).padStart(2, '0')} CHARTS
                        </span>
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('/?format=studio-tours')}
                        className="group flex w-full items-baseline justify-between py-3.5 text-left transition-colors hover:text-[#4A7C8C]"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[11px] tabular-nums text-[#5A5750]">
                            03
                          </span>
                          <span className="font-serif text-[21px] font-bold text-[#141414] group-hover:text-[#4A7C8C]">
                            Photo Essays
                          </span>
                        </span>
                        <span className="font-mono text-[10.5px] tabular-nums text-[#5A5750]">
                          {String(counts.photoEssaysCount).padStart(2, '0')}{' '}
                          STORIES
                        </span>
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        onClick={() => handleNavigate('/about')}
                        className="group flex w-full items-baseline justify-between py-3.5 text-left transition-colors hover:text-[#4A7C8C]"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[11px] tabular-nums text-[#5A5750]">
                            04
                          </span>
                          <span className="font-serif text-[21px] font-bold text-[#141414] group-hover:text-[#4A7C8C]">
                            About &amp; Manifesto
                          </span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 text-[#4A7C8C] transition-transform duration-150 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    </li>
                  </ul>
                </nav>

                {/* Browse by Visual Format (2x2 Grid) */}
                <div className="mt-7">
                  <p className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]">
                    BROWSE BY VISUAL FORMAT
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {FORMAT_ITEMS.map(({ key, icon: Icon }) => {
                      const meta = FORMAT_META[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleNavigate(`/?format=${key}`)}
                          className="group flex flex-col items-start rounded-[10px] border border-transparent bg-[#E7E2D6] p-3.5 text-left transition-colors duration-150 hover:border-[#B8B2A4] hover:bg-[#DFD9CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
                        >
                          <Icon
                            className="h-5 w-5 text-[#131E29] transition-colors group-hover:text-[#4A7C8C]"
                            aria-hidden="true"
                          />
                          <span className="mt-3 font-sans text-[13px] font-bold text-[#141414]">
                            {meta.title}
                          </span>
                          <span className="mt-0.5 font-sans text-[11px] text-[#5A5750]">
                            {meta.subtitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Current Issue Banner */}
                <div className="mt-7 rounded-[14px] bg-[#131E29] p-5 text-white">
                  <p className="font-mono text-[10px] tracking-[0.1em] text-[#8FB3C0]">
                    {siteConfig.currentIssueLabel}
                  </p>
                  <h3 className="mt-2 font-serif text-[21px] font-bold text-white">
                    {siteConfig.currentEditionTitle}
                  </h3>
                  <p className="mt-1 font-sans text-[12px] text-[#B5C2CC]">
                    {siteConfig.currentEditionMeta}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleNavigate(`/posts/${featured.slug}`)}
                    className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-full bg-[#F3EFE6] px-4 font-sans text-[12px] font-bold text-[#131E29] whitespace-nowrap transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8FB3C0]"
                  >
                    <span>Open Issue</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>
      </div>
    </ShellContext.Provider>
  );
}
