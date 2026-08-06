import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Global Growth Services | Technical SEO, GEO & Monetization Architecture',
  description: 'Explore WillSun Agency’s core services: Technical SEO, Generative Engine Optimization (GEO) for Perplexity/ChatGPT, SaaS commercialization, and ROI-driven ad scaling.',
  alternates: {
    canonical: 'https://willsun.agency/services',
  },
  openGraph: {
    title: 'Global Growth Services | WillSun Agency',
    description: 'Master SEO, GEO AI Search Positioning, and Monetization Architecture for Cross-Border Tech & SaaS.',
    url: 'https://willsun.agency/services',
  },
};

export default function ServicesPage() {
  return <PageClientWrapper pageType="services" />;
}
