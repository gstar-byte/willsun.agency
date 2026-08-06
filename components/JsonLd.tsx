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
        '@id': 'https://willsun.agency/#cases',
        'name': 'Featured Digital Product Portfolio & Growth Case Studies',
        'description': 'Real-world digital assets engineered and scaled by WillSun Agency',
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
              'name': 'A11yKit.site',
              'url': 'https://a11ykit.site',
              'description': 'WCAG 2.2 and EAA Compliance toolkit for international digital accessibility standards.'
            }
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'item': {
              '@type': 'CreativeWork',
              'name': 'GeoKit.site',
              'url': 'https://geokit.site',
              'description': 'Generative Engine Optimization (GEO) and Prompt Engineering utility suite.'
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
