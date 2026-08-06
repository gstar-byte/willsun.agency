import type { Metadata } from 'next';
import { PageClientWrapper } from '@/components/PageClientWrapper';

export const metadata: Metadata = {
  title: 'About WillSun Agency | 15+ Years Mastery in Global Growth & Commercialization',
  description: 'Learn about Founder Will Sun and our cross-functional team specializing in technical SEO, GEO AI search positioning, performance ads, and AI visual creative execution.',
  alternates: {
    canonical: 'https://willsun.agency/about',
  },
  openGraph: {
    title: 'About Founder & Growth Studio | WillSun Agency',
    description: 'Empowering cross-border SaaS, E-Commerce, and Industrial Exporters with 15+ years of battle-tested growth mastery.',
    url: 'https://willsun.agency/about',
  },
};

export default function AboutPage() {
  return <PageClientWrapper pageType="about" />;
}
