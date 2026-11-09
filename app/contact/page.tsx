import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Contact Will Sun & Request Free Site Review | WillSun Agency',
  description: 'Request a free written website, SEO, GEO AI search, or Google Ads review directly from Will Sun. Online & async communication with optional 30-min call when time zones align.',
  alternates: {
    canonical: 'https://willsun.agency/contact',
  },
  openGraph: {
    title: 'Contact Will Sun & Request Free Site Review | WillSun Agency',
    description: 'Get actionable written insights for your global growth roadmap. Connect directly with Will Sun.',
    url: 'https://willsun.agency/contact',
  },
};

export default function ContactPage() {
  return <PageClientWrapper pageType="contact" />;
}
