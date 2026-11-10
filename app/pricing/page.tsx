import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Flexible Remote Pricing & Fix Packages | WillSun Agency',
  description: 'Transparent remote engagement pricing: One-Time GEO/SEO & Growth Audit + Server/Code Fix Package ($499+), Part-Time Growth & Google Ads Consultant ($2,000/mo), and All-in-One Turnkey Package ($3,500+/mo).',
  alternates: {
    canonical: 'https://willsun.agency/pricing',
  },
  openGraph: {
    title: 'Remote Consulting Pricing & Fix Packages | WillSun Agency',
    description: 'Hands-on website building, technical SEO/GEO fixes, Google Ads management, and monetization optimization by Will Sun.',
    url: 'https://willsun.agency/pricing',
  },
};

export default function PricingPage() {
  return <PageClientWrapper pageType="pricing" />;
}
