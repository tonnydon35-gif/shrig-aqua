import { BUSINESS_NAME, PHONE_PRIMARY_DISPLAY, PHONE_ALT_DISPLAY, EMAIL } from '@/lib/business'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://www.shrigaqua.in'

export const metadata = {
  title: `Commercial RO Systems in Mathura | ${BUSINESS_NAME}`,
  description:
    'Commercial RO systems from 250 LPH to 3000+ LPH for offices, restaurants, schools, hotels, and businesses in Mathura. Installation, maintenance, and AMC support by Shrig Aqua.',
  alternates: { canonical: '/commercial-ro' },
  openGraph: {
    title: `Commercial RO Systems in Mathura | ${BUSINESS_NAME}`,
    description:
      `Commercial and industrial RO capacities from 250 LPH to custom 3000+ LPH plants by ${BUSINESS_NAME}, Mathura.`,
    url: '/commercial-ro',
    siteName: BUSINESS_NAME,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Commercial RO Systems in Mathura | ${BUSINESS_NAME}`,
    description:
      `Commercial and industrial RO capacities from 250 LPH to custom 3000+ LPH plants — ${BUSINESS_NAME}, Mathura.`,
  },
  robots: { index: true, follow: true },
}

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Commercial and Industrial RO Systems',
  name: `Commercial RO Systems in Mathura | ${BUSINESS_NAME}`,
  areaServed: { '@type': 'City', name: 'Mathura, Uttar Pradesh' },
  provider: {
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    url: SITE_URL,
    telephone: PHONE_PRIMARY_DISPLAY,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '301 Krishna Vihar Colony, Near Diksha Public School, BSA Road, Bypass',
      addressLocality: 'Mathura',
      addressRegion: 'Uttar Pradesh',
      postalCode: '281001',
      addressCountry: 'IN',
    },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: PHONE_PRIMARY_DISPLAY, contactType: 'customer service' },
      { '@type': 'ContactPoint', telephone: PHONE_ALT_DISPLAY, contactType: 'customer service' },
    ],
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
          description: 'Ideal for small offices, restaurants, cafés and coaching institutes.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'High-Demand Commercial RO 1000–2000 LPH',
          description: 'Engineered for schools, banquet halls, hotels, hospitals and housing societies.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Industrial Custom RO 3000 LPH+',
          description: 'Custom-built large-capacity systems for manufacturing and packaging plants.',
        },
      },
    ],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Commercial RO', item: `${SITE_URL}/commercial-ro` },
  ],
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
