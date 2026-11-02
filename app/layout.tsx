import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://willsun.agency'),
  title: {
    default: 'Will Sun | Fractional Growth Consultant, Technical SEO & AI-Native Engineer',
    template: '%s | WillSun Agency',
  },
  description: '16+ years hands-on global growth, Technical SEO, GEO (AI Search Citations), WCAG 2.2 compliance, and full-funnel monetization for SaaS, Apps & DTC brands (DWG FastView, KingCamp, Yoybuy). Creator of GeoKit.site, A11yKit.site & CADGuide.tools.',
  keywords: [
    'Fractional Growth Consultant',
    'Technical SEO Consultant',
    'Generative Engine Optimization',
    'GEO AI Search Optimization',
    'WCAG 2.2 Accessibility Audit',
    'Programmatic SEO',
    'Google Ads Consultant',
    'SaaS Monetization',
    'Will Sun',
    'WillSun Agency',
    'GeoKit.site',
    'A11yKit.site',
    'CADGuide.tools',
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
    title: 'Will Sun | Fractional Growth Consultant & AI-Native Technical SEO Engineer',
    description: '16+ years scaling global organic search, paid acquisition & subscription monetization (DWG FastView, KingCamp, Yoybuy). Founder of GeoKit.site, A11yKit.site & CADGuide.tools.',
    url: 'https://willsun.agency',
    siteName: 'WillSun Agency',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will Sun | Fractional Growth & AI-Native Technical SEO Consultant',
    description: 'Scale your SaaS & DTC brand with 16+ years of Technical SEO, GEO AI Citations, Google Ads, and Vibe Coding engineering.',
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
      { url: '/icon.svg?v=300', type: 'image/svg+xml' },
    ],
    shortcut: ['/icon.svg?v=300'],
    apple: ['/icon.svg?v=300'],
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
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google tag (gtag.js) for GA4 and Google Search Console verification */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1B29WEPTV9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1B29WEPTV9');
            `,
          }}
        />
        <JsonLd />
      </head>
      <body className={`${inter.className} bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
