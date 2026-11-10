import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { JsonLd } from '@/components/JsonLd';
import { EXP_YEARS } from '@/lib/dictionary';

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
    default: 'Will Sun | Fractional Growth Consultant • Web Building, Google Ads, GEO & Monetization',
    template: '%s | WillSun Agency',
  },
  description: `${EXP_YEARS}+ years hands-on experience building high-converting websites, scaling global traffic (Google Ads, GEO & SEO), and driving revenue for DWG FastView (1.5M+ DAU), KingCamp & Yoybuy. Creator of GeoKit.site, A11yKit.site & CADGuide.tools.`,
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
    title: 'Will Sun | Fractional Growth Consultant • Web Building, Google Ads, GEO & Monetization',
    description: `${EXP_YEARS}+ years scaling global website traffic, paid acquisition & subscription monetization (DWG FastView 1.5M+ DAU, KingCamp, Yoybuy). Founder of GeoKit.site, A11yKit.site & CADGuide.tools.`,
    url: 'https://willsun.agency',
    siteName: 'WillSun Agency',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will Sun | Fractional Growth • Web Building, Google Ads, GEO & Monetization',
    description: `Scale your SaaS & DTC brand with ${EXP_YEARS}+ years of Website Building, Google Ads, GEO AI Citations, and hands-on monetization execution.`,
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
        {/* Google Analytics with Consent Mode v2 & Headless Datacenter Bot Shield */}
        <script
          data-cfasync="false"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var isHeadlessBot = false;
                try {
                  var ua = navigator.userAgent || '';
                  var sw = window.screen ? window.screen.width : 0;
                  var sh = window.screen ? window.screen.height : 0;
                  var res = sw + 'x' + sh;
                  var botScreens = {
                    '1280x1200': 1,
                    '1366x1366': 1,
                    '1280x1280': 1,
                    '1600x1600': 1,
                    '1280x1600': 1,
                    '1600x1200': 1,
                    '800x600': 1
                  };
                  if (
                    navigator.webdriver === true ||
                    /HeadlessChrome|PhantomJS|Playwright|Puppeteer|SlimerJS|CasperJS/i.test(ua) ||
                    botScreens[res] === 1 ||
                    (sw > 0 && sw === sh)
                  ) {
                    isHeadlessBot = true;
                  } else {
                    var c = document.createElement('canvas');
                    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
                    if (gl) {
                      var dbg = gl.getExtension('WEBGL_debug_renderer_info');
                      if (dbg) {
                        var renderer = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || '';
                        if (/SwiftShader|llvmpipe|Software Rasterizer/i.test(renderer)) {
                          isHeadlessBot = true;
                        }
                      }
                    }
                  }
                } catch (_) {}

                if (isHeadlessBot) {
                  window['ga-disable-G-1B29WEPTV9'] = true;
                  return;
                }

                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;

                gtag('consent', 'default', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted'
                });

                gtag('js', new Date());
                gtag('config', 'G-1B29WEPTV9');
              })();
            `,
          }}
        />
        <script
          data-cfasync="false"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1B29WEPTV9"
        />
        <JsonLd />
      </head>
      <body className={`${inter.className} bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
