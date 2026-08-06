import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://willsun.agency'),
  title: {
    default: 'WillSun Agency | Global Growth & Commercialization Studio',
    template: '%s | WillSun Agency',
  },
  description: 'Accelerate Global Growth for Cross-Border SaaS, E-Commerce, and Industrial Exporters with 15+ Years Mastery in SEO, GEO AI Search, and Performance Monetization.',
  keywords: [
    'Growth Agency',
    'Cross-Border SaaS Growth',
    'Global E-Commerce Marketing',
    'Technical SEO',
    'GEO AI Search Optimization',
    'Generative Engine Optimization',
    'Monetization Architecture',
    'WillSun Agency',
  ],
  authors: [{ name: 'Will Sun', url: 'https://willsun.agency' }],
  creator: 'Will Sun',
  publisher: 'WillSun Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://willsun.agency',
  },
  openGraph: {
    title: 'WillSun Agency | Global Growth & Commercialization Studio',
    description: 'Scale your SaaS, E-Commerce, or Industrial business with 15+ years of proven SEO, GEO AI Search, and performance monetization strategies.',
    url: 'https://willsun.agency',
    siteName: 'WillSun Agency',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WillSun Agency | Global Growth & Commercialization Studio',
    description: 'Scale your SaaS & E-Commerce globally with data-driven SEO, GEO AI Search, and performance ad funnels.',
    creator: '@WillSunAgency',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg?v=200', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg?v=200'],
    apple: ['/icon.svg?v=200'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.className} bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
