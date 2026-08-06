import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Contact Us & Schedule Strategy Consultation | WillSun Agency',
  description: 'Book a free 30-minute growth strategy session with WillSun Agency. Discuss your SaaS commercialization, SEO, GEO AI search positioning, or ad performance goals.',
  alternates: {
    canonical: 'https://willsun.agency/contact',
  },
  openGraph: {
    title: 'Schedule a Strategy Consultation | WillSun Agency',
    description: 'Get actionable insights for your global growth roadmap. Connect directly with founder Will Sun.',
    url: 'https://willsun.agency/contact',
  },
};

export default function ContactPage() {
  return <PageClientWrapper pageType="contact" />;
}
