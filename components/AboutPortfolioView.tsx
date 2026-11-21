'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, FileCode2, X } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { portfolioProjects } from '@/content/projects';
import { allEssays } from '@/content/posts';
import type { PortfolioProject } from '@/content/types';
import VisualPlate from './VisualPlate';
import NewsletterCard from './NewsletterCard';

export default function AboutPortfolioView() {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Personal Intro & Editorial Identity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="font-mono text-[10.5px] tracking-[0.09em] text-[#5A5750]">
            ABOUT &amp; MANIFESTO · {siteConfig.journalSeries.toUpperCase()}
          </p>
          <h1 className="mt-2.5 font-serif text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-[#141414] sm:text-[42px]">
            {siteConfig.mastheadName}
          </h1>
          <p className="mt-2 font-sans text-[15px] font-medium text-[#4A7C8C]">
            {siteConfig.authorRole} · {siteConfig.location}
          </p>

          <div className="mt-5 max-w-2xl space-y-3.5 font-sans text-[15px] leading-[1.7] text-[#2F2D29]">
            {siteConfig.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* High-Contrast Dark Snapshot Card */}
        <aside className="flex flex-col justify-between rounded-[12px] bg-[#131E29] p-6 text-white lg:col-span-5">
          <div>
            <p className="font-mono text-[10px] tracking-[0.1em] text-[#8FB3C0]">
              PUBLICATION LEDGER
            </p>
            <div className="mt-4 grid grid-cols-2 gap-5 border-b border-[#2D4152] pb-5">
              <div>
                <p className="font-sans text-[34px] font-extrabold leading-none tabular-nums text-white">
                  {String(allEssays.length).padStart(2, '0')}
                </p>
                <p className="mt-1.5 font-mono text-[10px] text-[#9BB5C0]">
                  VISUAL ESSAYS
                </p>
              </div>
              <div>
                <p className="font-sans text-[34px] font-extrabold leading-none tabular-nums text-white">
                  {String(portfolioProjects.length).padStart(2, '0')}
                </p>
                <p className="mt-1.5 font-mono text-[10px] text-[#9BB5C0]">
                  SELECTED WORKS
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <p className="font-mono text-[10px] tracking-[0.08em] text-[#8FB3C0]">
              DIRECT CHANNELS
            </p>
            <ul className="space-y-1.5">
              {siteConfig.socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="flex items-center justify-between font-sans text-[13px] text-[#D9E2E8] transition-colors hover:text-white"
                  >
                    <span>{link.label}</span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#8FB3C0]">
                      {link.handle}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <hr className="border-[#CFC9BC]" />

      {/* Selected Portfolio Works */}
      <section aria-labelledby="selected-works-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id="selected-works-heading"
            className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]"
          >
            SELECTED PORTFOLIO WORK
          </h2>
          <span className="font-mono text-[10.5px] text-[#5A5750]">
            Click any project to inspect
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col rounded-[10px] border border-[#CFC9BC] bg-[#E7E2D6]/65 p-4 text-left transition-colors duration-150 hover:border-[#141414] hover:bg-[#E7E2D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A7C8C]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden rounded-[6px]">
                <VisualPlate
                  plate={project.plate}
                  className="h-full w-full"
                />
              </div>

              <div className="mt-3.5 flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-[19px] font-bold text-[#141414] group-hover:text-[#4A7C8C]">
                  {project.title}
                </h3>
                <span className="font-mono text-[10.5px] tabular-nums text-[#5A5750]">
                  {project.year}
                </span>
              </div>

              <p className="mt-1 font-mono text-[10px] text-[#5A5750]">
                {project.role} · {project.category}
              </p>

              <p className="mt-2.5 flex-1 font-sans text-[13px] leading-relaxed text-[#4E4C46]">
                {project.summary}
              </p>

              <div className="mt-4 flex items-baseline justify-between border-t border-[#CFC9BC] pt-3">
                <span className="font-sans text-[18px] font-extrabold tabular-nums text-[#131E29]">
                  {project.keyMetric}
                </span>
                <span className="font-sans text-[11.5px] text-[#5A5750]">
                  {project.keyMetricLabel}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Editorial Manifesto (3 Principles) */}
      <section aria-labelledby="manifesto-heading">
        <h2
          id="manifesto-heading"
          className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]"
        >
          EDITORIAL MANIFESTO
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {siteConfig.manifestoPrinciples.map((item) => (
            <div
              key={item.number}
              className="rounded-[10px] border border-[#CFC9BC] bg-[#FAF7F1] p-5"
            >
              <span className="font-mono text-[11px] font-semibold tabular-nums text-[#4A7C8C]">
                {item.number}
              </span>
              <h3 className="mt-2 font-serif text-[18px] font-bold text-[#141414]">
                {item.title}
              </h3>
              <p className="mt-1.5 font-sans text-[13.5px] leading-relaxed text-[#5A5750]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code-First Publishing Quick Reference */}
      <section
        aria-labelledby="publishing-guide-heading"
        className="rounded-[12px] border border-[#CFC9BC] bg-[#E7E2D6] p-5 sm:p-6"
      >
        <div className="flex items-center gap-2">
          <FileCode2 className="h-4 w-4 text-[#131E29]" aria-hidden="true" />
          <h2
            id="publishing-guide-heading"
            className="font-sans text-[11px] font-extrabold tracking-[0.09em] text-[#141414]"
          >
            PUBLISHING NEW VISUAL ESSAYS
          </h2>
        </div>

        <p className="mt-2.5 max-w-2xl font-sans text-[13.5px] leading-relaxed text-[#3D3B36]">
          Every essay, chart series, KPI block, and visual plate is stored in
          structured TypeScript content modules. To add a new blog post or swap
          your own photography:
        </p>

        <ol className="mt-3.5 grid grid-cols-1 gap-3 font-sans text-[13px] text-[#141414] md:grid-cols-3">
          <li className="rounded-[8px] bg-[#F3EFE6] p-3.5">
            <span className="font-mono text-[10px] font-semibold text-[#4A7C8C]">
              STEP 01 · PROFILE
            </span>
            <p className="mt-1 text-[#3D3B36]">
              Edit <code className="font-mono text-[12px] text-[#141414]">content/site.ts</code> to
              update your masthead name, bio, and social links globally.
            </p>
          </li>
          <li className="rounded-[8px] bg-[#F3EFE6] p-3.5">
            <span className="font-mono text-[10px] font-semibold text-[#4A7C8C]">
              STEP 02 · ADD ESSAY
            </span>
            <p className="mt-1 text-[#3D3B36]">
              Duplicate any file in{' '}
              <code className="font-mono text-[12px] text-[#141414]">content/posts/</code> and
              export it in <code className="font-mono text-[12px] text-[#141414]">index.ts</code>.
            </p>
          </li>
          <li className="rounded-[8px] bg-[#F3EFE6] p-3.5">
            <span className="font-mono text-[10px] font-semibold text-[#4A7C8C]">
              STEP 03 · PHOTOS
            </span>
            <p className="mt-1 text-[#3D3B36]">
              Add photos to <code className="font-mono text-[12px] text-[#141414]">public/images/</code> and
              set <code className="font-mono text-[12px] text-[#141414]">imageSrc</code> on any plate.
            </p>
          </li>
        </ol>
      </section>

      <NewsletterCard variant="capture" />

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-[#131E29]/55 backdrop-blur-[2px]"
          />
          <div className="relative z-10 w-full max-w-lg rounded-[14px] border border-[#CFC9BC] bg-[#F3EFE6] p-5 text-[#141414] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.08em] text-[#5A5750]">
                  {selectedProject.year} · {selectedProject.category}
                </p>
                <h3 className="mt-1 font-serif text-[24px] font-bold text-[#141414]">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#141414] hover:bg-[#E7E2D6]"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-[8px]">
              <VisualPlate plate={selectedProject.plate} className="h-full w-full" />
            </div>

            <p className="mt-4 font-sans text-[14px] leading-relaxed text-[#3D3B36]">
              {selectedProject.summary}
            </p>

            <div className="mt-4 flex items-center justify-between rounded-[10px] bg-[#131E29] px-4 py-3 text-white">
              <span className="font-sans text-[12px] text-[#9BB5C0]">
                {selectedProject.keyMetricLabel}
              </span>
              <span className="font-sans text-[22px] font-extrabold tabular-nums">
                {selectedProject.keyMetric}
              </span>
            </div>

            <p className="mt-3.5 font-mono text-[11px] text-[#5A5750]">
              Deliverables: {selectedProject.deliverables.join(' · ')}
            </p>

            {selectedProject.relatedEssaySlug && (
              <div className="mt-5 flex justify-end border-t border-[#CFC9BC] pt-4">
                <Link
                  href={`/posts/${selectedProject.relatedEssaySlug}`}
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[#131E29] px-5 font-sans text-[12.5px] font-bold text-[#F3EFE6] hover:bg-[#1E2E3E]"
                >
                  <span>Read related visual essay</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
