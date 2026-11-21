import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  allEssays,
  getEssayBySlug,
  getNextEssays,
} from '@/content/posts';
import { siteConfig } from '@/content/site';
import ArticleReaderView from '@/components/ArticleReaderView';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allEssays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);
  if (!essay) {
    return {
      title: `Not Found — ${siteConfig.mastheadName}`,
    };
  }
  return {
    title: `${essay.title} — ${siteConfig.mastheadName}`,
    description: essay.subtitle,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  const nextEssays = getNextEssays(essay.slug, 2);

  return <ArticleReaderView essay={essay} nextEssays={nextEssays} />;
}
