import React from 'react';

export const JsonLd: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://willsun.agency/#organization',
        'name': 'WillSun Agency | Global Growth & Commercialization Studio',
        'alternateName': 'WillSun Growth Studio',
        'url': 'https://willsun.agency',
        'logo': 'https://willsun.agency/icon.svg',
        'image': 'https://willsun.agency/icon.svg',
        'description': 'Executive Cross-Border SaaS, E-Commerce, and Industrial Exporter Growth Studio with 15+ Years Mastery in SEO, GEO AI Search Optimization, and Monetization Scaling.',
        'founder': {
          '@type': 'Person',
          'name': 'Will Sun',
          'jobTitle': 'Founder & Chief Growth Officer',
          'knowsAbout': [
            'Cross-Border E-Commerce Growth',
            'SaaS Commercialization Architecture',
            'Search Engine Optimization (SEO)',
            'Generative Engine Optimization (GEO)',
            'Performance Marketing & Monetization'
          ]
        },
        'knowsLanguage': ['en', 'zh-CN'],
        'priceRange': '$$$',
        'address': {
          '@type': 'PostalAddress',
          'addressCountry': 'CN'
        },
        'sameAs': [
          'https://cadguide.tools',
          'https://gstarcademy.com',
          'https://a11ykit.site',
          'https://geokit.site',
          'https://ramanamaharshi.space',
          'https://chanzong.space'
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Core Growth Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Global SEO & GEO AI Search Infrastructure',
                'description': 'Dominate Google organic search and Perplexity/ChatGPT AI answers with schema-first technical architecture.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Cross-Border SaaS & E-Commerce Commercialization',
                'description': 'End-to-end monetization architecture, pricing strategy, and multi-channel acquisition funnels.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Performance Ad Scaling & ROI Optimization',
                'description': 'Data-driven paid media execution across Google Ads, Meta, and niche B2B advertising networks.'
              }
            }
          ]
        }
      },
      {
        '@type': 'ItemList',
        '@id': 'https://willsun.agency/#works',
        'name': 'Featured Digital Product Portfolio & Incubated Assets',
        'description': 'Real-world digital assets and software portals engineered and scaled by WillSun Agency',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'item': {
              '@type': 'CreativeWork',
              'name': 'CADGuide.tools',
              'url': 'https://cadguide.tools',
              'description': 'CAD & BIM Engineering Portal featuring 45+ interactive calculation tools and software comparison matrix.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'item': {
              '@type': 'CreativeWork',
              'name': 'GstarCademy',
              'url': 'https://gstarcademy.com',
              'description': 'Global CAD/BIM education and training academy for professional designers and engineers.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'item': {
              '@type': 'CreativeWork',
              'name': 'A11yKit.site',
              'url': 'https://a11ykit.site',
              'description': 'WCAG 2.2 and EAA Compliance toolkit for international digital accessibility standards.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 4,
            'item': {
              '@type': 'CreativeWork',
              'name': 'GeoKit.site',
              'url': 'https://geokit.site',
              'description': 'Generative Engine Optimization (GEO) and Prompt Engineering utility suite.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 5,
            'item': {
              '@type': 'CreativeWork',
              'name': 'Ramana Maharshi Digital Space',
              'url': 'https://ramanamaharshi.space',
              'description': 'Digital archive and sanctuary for the teachings and Self-Enquiry philosophy of Sri Ramana Maharshi.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 6,
            'item': {
              '@type': 'CreativeWork',
              'name': 'ChanZong Digital Archive',
              'url': 'https://chanzong.space',
              'description': 'Open digital repository preserving Chan (Zen) Buddhism lineage transmissions and Koan wisdom.'
            }
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://willsun.agency/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is Generative Engine Optimization (GEO)?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Generative Engine Optimization (GEO) is the strategy of optimizing digital content and technical architecture so AI search engines like SearchGPT, Perplexity, Claude, and Google AI Overviews cite and recommend your brand.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does WillSun Agency accelerate SaaS & Cross-Border E-Commerce growth?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We leverage 15+ years of hands-on experience combining technical SEO, GEO AI positioning, monetization funnel refactoring, and AI-assisted creative production to deliver measurable revenue growth.'
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
