import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Works & Live Website Portfolio | GeoKit, A11yKit, CADGuide, AbleTarget, UnirCable',
  description: 'Explore the 9 live websites, GEO/WCAG audit engines, CAD engineering hubs, B2B industrial websites (AbleTarget, UnirCable), and digital archives built and scaled by Will Sun.',
  alternates: {
    canonical: 'https://willsun.agency/works',
  },
  openGraph: {
    title: 'Live Website & Tool Portfolio | WillSun Agency',
    description: 'A showcase of 9 live SEO/GEO audit engines, CAD portals, B2B industrial websites, and digital humanities archives.',
    url: 'https://willsun.agency/works',
  },
};

export default function WorksPage() {
  return <PageClientWrapper pageType="works" />;
}
