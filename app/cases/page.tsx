import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Case Studies & Digital Product Portfolio | CADGuide, A11yKit, GeoKit',
  description: 'Explore real-world case studies built and scaled by WillSun Agency, including CADGuide.tools (45+ calculation tools), A11yKit.site (WCAG compliance), and GeoKit.site (GEO prompt suite).',
  alternates: {
    canonical: 'https://willsun.agency/cases',
  },
  openGraph: {
    title: 'Featured Growth Case Studies | WillSun Agency',
    description: 'See how WillSun Agency builds and scales global digital assets across CAD/BIM, Web Accessibility, and GEO AI Search.',
    url: 'https://willsun.agency/cases',
  },
};

export default function CasesPage() {
  return <PageClientWrapper pageType="cases" />;
}
