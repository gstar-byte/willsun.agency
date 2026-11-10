import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Client & In-House Case Studies | DWG FastView, KingCamp, Yoybuy, PostPony, AbleTarget',
  description: 'Verified global growth and monetization case studies by Will Sun: DWG FastView (1.5M+ DAU), KingCamp, Yoybuy, PostPony (20-mo GMV growth), AbleTarget, UnirCable, and GeoKit/A11yKit.',
  alternates: {
    canonical: 'https://willsun.agency/cases',
  },
  openGraph: {
    title: 'Verified Growth & Monetization Case Studies | WillSun Agency',
    description: 'Real-world impact across global CAD software, cross-border DTC brands, US SaaS, and B2B industrial exporters.',
    url: 'https://willsun.agency/cases',
  },
};

export default function CasesPage() {
  return <PageClientWrapper pageType="cases" />;
}
