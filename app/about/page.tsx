import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import AboutPortfolioView from '@/components/AboutPortfolioView';

export const metadata: Metadata = {
  title: `About & Manifesto — ${siteConfig.mastheadName}`,
  description: siteConfig.tagline,
};

export default function AboutPage() {
  return <AboutPortfolioView />;
}
