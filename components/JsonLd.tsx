import React from 'react';

export const JsonLd: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://willsun.agency/#organization',
        'name': 'WillSun Agency | Fractional Growth & AI-Native Technical SEO Consultancy',
        'alternateName': 'Will Sun Growth Consultancy',
        'url': 'https://willsun.agency',
        'email': 'will@willsun.agency',
        'logo': 'https://willsun.agency/icon.svg',
        'image': 'https://willsun.agency/icon.svg',
        'description': 'Boutique technical growth consultancy led by Will Sun with 16+ years hands-on experience in Technical SEO, Generative Engine Optimization (GEO), WCAG 2.2 accessibility compliance, Google Ads, and SaaS/App monetization.',
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
          'https://ramanamaharshi.space',
          'https://chanzong.space'
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Fractional Growth & Technical SEO Services',
          'itemListElement': [
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'GEO, Technical SEO & WCAG 2.2 Audit Sprint ($499)',
                'description': 'Comprehensive technical SEO, AI search citation readiness (GeoKit.site), and WCAG 2.2 / ADA compliance (A11yKit.site) audit with a 90-day roadmap.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'Fractional SEO & Growth Consultant Retainer ($2,000/mo)',
                'description': '15–20 hrs/week dedicated senior execution across Technical/Programmatic SEO, GEO entity schema, Google Ads, and Python GA4/GSC reporting.'
              }
            },
            {
              '@type': 'Offer',
              'itemOffered': {
                '@type': 'Service',
                'name': 'AI-Native Growth & Vibe Coding Partner ($3,500+/mo)',
                'description': 'Full-stack fractional growth leadership, custom interactive web tool development (Next.js), subscription CRO, and agency white-label delivery.'
              }
            }
          ]
        }
      },
      {
        '@type': 'ItemList',
        '@id': 'https://willsun.agency/#works',
        'name': 'Featured AI-Native SaaS Audit Engines & Programmatic Portals',
        'description': 'Live web tools and audit platforms independently architected and scaled by Will Sun',
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
              'description': 'Programmatic SEO & interactive utility hub for global CAD engineers featuring 45+ calculation tools and 2,500+ monthly organic visits.'
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
