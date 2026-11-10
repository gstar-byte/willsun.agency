import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';
import { EXP_YEARS } from '@/lib/dictionary';

export const metadata: Metadata = {
  title: `About Will Sun | ${EXP_YEARS}+ Years Hands-On Growth, Google Ads, GEO/SEO & Web Building`,
  description: `Learn about Will Sun, an independent growth consultant with ${EXP_YEARS}+ years of hands-on experience in website building, technical SEO, GEO AI search, Google Ads, and SaaS/App monetization (DWG FastView 1.5M+ DAU, KingCamp, Yoybuy, PostPony).`,
  alternates: {
    canonical: 'https://willsun.agency/about',
  },
  openGraph: {
    title: `About Will Sun (Independent Consultant) | WillSun Agency`,
    description: `${EXP_YEARS}+ years of direct hands-on execution across global SaaS, cross-border DTC e-commerce, and B2B industrial websites.`,
    url: 'https://willsun.agency/about',
  },
};

export default function AboutPage() {
  return <PageClientWrapper pageType="about" />;
}
