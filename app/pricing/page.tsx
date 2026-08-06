import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Flexible Engagement Plans & Growth Advisory Pricing | WillSun Agency',
  description: 'Transparent growth advisory pricing models for Cross-Border SaaS, E-Commerce brands, and B2B exporters. Choose from Starter Audit, Core Scaling, or Enterprise Partnership.',
  alternates: {
    canonical: 'https://willsun.agency/pricing',
  },
  openGraph: {
    title: 'Growth Advisory Pricing & Engagement Models | WillSun Agency',
    description: 'Data-driven SEO, GEO AI Search, and performance marketing engagement plans tailored for high-growth global teams.',
    url: 'https://willsun.agency/pricing',
  },
};

export default function PricingPage() {
  return <PageClientWrapper pageType="pricing" />;
}
