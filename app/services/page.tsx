import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Hands-On Growth Services | Website Building, Google Ads, GEO/SEO & Monetization',
  description: 'Direct hands-on execution by Will Sun across 4 core pillars: Global Organic UA (GEO & SEO), High-ROI Paid UA (Google Ads & Affiliates), Subscription/Ad Monetization, and Custom Website Building.',
  alternates: {
    canonical: 'https://willsun.agency/services',
  },
  openGraph: {
    title: 'Hands-On Website Building, Google Ads, GEO/SEO & Monetization | WillSun Agency',
    description: 'Practical execution across custom website development, search/paid traffic acquisition, and global subscription monetization.',
    url: 'https://willsun.agency/services',
  },
};

export default function ServicesPage() {
  return <PageClientWrapper pageType="services" />;
}
