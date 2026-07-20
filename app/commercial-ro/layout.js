import {
  PHONE_PRIMARY_DISPLAY,
  PHONE_ALT_DISPLAY,
  EMAIL,
  ADDRESS_LINE
} from '@/lib/business'

export const metadata = {
  title: 'Commercial RO Plant Systems in Mathura | SHRI G AQUA',
  description:
    'Explore 250–500 LPH, 1000–2000 LPH and customized 3000+ LPH Commercial and Industrial RO systems, installation and maintenance support from SHRI G AQUA in Mathura.',
  alternates: { canonical: '/commercial-ro' },
  openGraph: {
    title: 'Commercial RO Plant Systems in Mathura | SHRI G AQUA',
    description:
      'Commercial and Industrial RO capacities from 250 LPH to custom 3000+ LPH plants, planned around your requirement by SHRI G AQUA, Mathura.',
    url: '/commercial-ro',
    type: 'website'
  },
  robots: { index: true, follow: true }
}

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Commercial and Industrial RO Plant Systems',
  name: 'Commercial RO Plant Systems in Mathura',
  areaServed: {
    '@type': 'City',
    name: 'Mathura, Uttar Pradesh'
  },
  provider: {
    '@type': 'LocalBusiness',
    name: 'SHRI G AQUA',
    telephone: PHONE_PRIMARY_DISPLAY,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '301 Krishna Vihar Colony, Near Diksha Public School, BSA Road, Bypass',
      addressLocality: 'Mathura',
      addressRegion: 'Uttar Pradesh',
      postalCode: '281001',
      addressCountry: 'IN'
    },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: PHONE_PRIMARY_DISPLAY, contactType: 'customer service' },
      { '@type': 'ContactPoint', telephone: PHONE_ALT_DISPLAY, contactType: 'customer service' }
    ]
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Commercial RO Capacities',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Compact Commercial RO 250–500 LPH',
          description:
            'Ideal for small offices, restaurants, cafés and coaching institutes requiring a steady purified-water supply.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High-Demand Commercial RO 1000–2000 LPH',
          description:
            'Engineered for schools, banquet halls, hotels, hospitals and housing societies.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Industrial Custom RO 3000 LPH+',
          description:
            'Custom-built large-capacity mineral-water packaging plants and industrial manufacturing setups.'
        }
      }
    ]
  }
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
    { '@type': 'ListItem', position: 2, name: 'Commercial RO Solutions', item: '/commercial-ro' }
  ]
}

export default function CommercialROLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
