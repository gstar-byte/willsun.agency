import React from 'react';
import { EXP_YEARS } from '@/lib/dictionary';

export const JsonLd: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://willsun.agency/#organization',
        'name': 'WillSun Agency | Fractional Growth & Full-Stack Growth Consultancy',
        'alternateName': 'Will Sun Growth Consultancy',
        'url': 'https://willsun.agency',
        'email': 'will@willsun.agency',
        'logo': 'https://willsun.agency/icon.svg',
        'image': 'https://willsun.agency/icon.svg',
        'description': `Boutique growth consultancy led by Will Sun with ${EXP_YEARS}+ years hands-on experience in Website Building, Google Ads, Generative Engine Optimization (GEO), SEO, and SaaS/App monetization.`,
        'founder': {
          '@type': 'Person',
          'name': 'Will Sun',
          'jobTitle': 'Fractional Growth Marketing Manager & AI-Native Technical SEO Engineer',
          'email': 'will@willsun.agency',
          'alumniOf': {
            '@type': 'CollegeOrUniversity',
            'name': 'Beijing Foreign Studies University (BFSU)'
          },
          'knowsAbout': [
            'Technical SEO & Programmatic SEO',
            'Generative Engine Optimization (GEO / AEO)',
            'WCAG 2.2 & ADA Web Accessibility Auditing',
            'Google Ads & Cross-Border DTC Growth',
            'SaaS & Mobile App Subscription Monetization',
            'GA4 & Google Search Console Python Automation'
          ]
        },
        'knowsLanguage': ['en', 'zh-CN'],
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'addressLocality': 'Beijing',
          'addressCountry': 'CN'
        },
        'sameAs': [
          'https://geokit.site',
          'https://a11ykit.site',
          'https://cadguide.tools',
          'https://gstarcademy.com',
          'https://blog.dwgfastview.com',
          'https://www.abletarget.com',
          'https://www.unircable.com',
          'https://ramanamaharshi.space',
          'https://chanzong.space'
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Hands-On Web Building, Google Ads, GEO/SEO & Monetization Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'GEO, SEO & Growth Audit + Fix Package ($499+)',
                'description': 'Full SEO, indexing & speed audit plus direct server, backend, or code fixes for technical SEO, GEO (llms.txt & Schema), WCAG 2.2 accessibility, and Google/Meta Ads tracking with a 90-day action plan.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Part-Time Growth, Google Ads & SEO/GEO Consultant ($2,000/mo)',
                'description': '15–20 hrs/week hands-on execution across Google Ads, technical SEO, GEO (llms.txt/Schema), white-hat link building, landing page CRO, and automated Python GA4/GSC reporting.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'All-in-One Website, Traffic & Monetization Package ($3,500+/mo)',
                'description': 'Turnkey execution covering custom website building, competitor/market/persona research reports, Google Ads & SEO/GEO, and subscription/checkout optimization.'
              }
            }
          ]
        }
      },
      {
        '@type': 'ItemList',
        '@id': 'https://willsun.agency/#works',
        'name': 'Proprietary Audit Engines, B2B Industrial Sites & Content Portals',
        'description': 'Live web tools, B2B industrial sites, and content portals built and scaled by Will Sun',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'item': {
              '@type': 'SoftwareApplication',
              'name': 'GeoKit.site',
              'url': 'https://geokit.site',
              'applicationCategory': 'BusinessApplication',
              'description': 'Automated Generative Engine Optimization (GEO) & AI search readiness auditing platform for ChatGPT, Perplexity, and Google AI Overviews.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'item': {
              '@type': 'SoftwareApplication',
              'name': 'A11yKit.site',
              'url': 'https://a11ykit.site',
              'applicationCategory': 'DeveloperApplication',
              'description': 'Automated Web Accessibility (WCAG 2.2, ADA & European Accessibility Act) scanning and remediation toolkit.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'item': {
              '@type': 'WebApplication',
              'name': 'CADGuide.tools',
              'url': 'https://cadguide.tools',
              'applicationCategory': 'DesignApplication',
              'description': 'Interactive engineering utility hub for global CAD/BIM professionals featuring 45+ specialized calculation utilities and software directories.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'item': {
              '@type': 'CreativeWork',
              'name': 'GstarCademy',
              'url': 'https://gstarcademy.com',
              'description': 'Global CAD/BIM education and product-led SEO training academy for professional designers and engineers.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 5,
            'item': {
              '@type': 'WebSite',
              'name': 'DWG FastView Official Blog',
              'url': 'https://blog.dwgfastview.com',
              'description': 'Global SaaS technical SEO & product content hub for DWG FastView.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 6,
            'item': {
              '@type': 'WebSite',
              'name': 'AbleTarget (Sputtering Targets)',
              'url': 'https://www.abletarget.com',
              'description': 'Global B2B industrial website and product specification matrix for high-purity sputtering targets.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 7,
            'item': {
              '@type': 'WebSite',
              'name': 'UnirCable (Subsea & ROV Cables)',
              'url': 'https://www.unircable.com',
              'description': 'Custom B2B industrial website and Google Search acquisition funnel for underwater and ROV cables.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 8,
            'item': {
              '@type': 'WebSite',
              'name': 'Ramana Maharshi Digital Space',
              'url': 'https://ramanamaharshi.space',
              'description': 'Multi-lingual digital humanities archive preserving the teachings of Sri Ramana Maharshi.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 9,
            'item': {
              '@type': 'WebSite',
              'name': 'ChanZong Digital Archive',
              'url': 'https://chanzong.space',
              'description': 'Open digital repository curating Chan (Zen) Buddhism texts and contemplative web utilities.'
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
