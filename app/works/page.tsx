import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'Works & Incubated Digital Assets | CADGuide, GstarCademy, A11yKit, GeoKit, RamanaMaharshi, ChanZong',
  description: 'Explore the digital portfolio, engineering tools, educational academies, and cultural archives built, scaled, and managed by WillSun Agency.',
  alternates: {
    canonical: 'https://willsun.agency/works',
  },
  openGraph: {
    title: 'Featured Digital Assets & Portfolio | WillSun Agency',
    description: 'A curated showcase of engineering portals, educational platforms, accessibility toolkits, and cultural digital spaces.',
    url: 'https://willsun.agency/works',
  },
};

export default function WorksPage() {
  return <PageClientWrapper pageType="works" />;
}
