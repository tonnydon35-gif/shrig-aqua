import './globals.css'
import { Providers } from './providers'
import {
  BUSINESS_NAME,
  TAGLINE,
  PHONE_PRIMARY_DISPLAY,
  PHONE_ALT_DISPLAY,
  EMAIL,
} from '@/lib/business'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.shrigaqua.in')

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BUSINESS_NAME} | RO Repair, Installation, AMC, Commercial RO & AC Service`,
  description: `Professional RO repair, installation, filter replacement, AMC, commercial RO and AC service solutions for homes and businesses in Mathura, Vrindavan, Kosi Kalan, and nearby areas. ${TAGLINE}`,
  keywords: [
    'RO repair Mathura',
    'RO installation Mathura',
    'RO AMC plans',
    'Commercial RO systems',
    'AC repair Mathura',
    'water purifier service',
    'filter replacement',
    'RO service Mathura',
    'Shrig Aqua',
    'RO service Vrindavan',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${BUSINESS_NAME} | ${TAGLINE}`,
    description: `Professional RO repair, installation, filter replacement, AMC, commercial RO and AC service solutions for homes and businesses in Mathura, Vrindavan, Kosi Kalan, and nearby areas.`,
    url: '/',
    siteName: BUSINESS_NAME,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BUSINESS_NAME} | RO Repair, Installation, AMC, Commercial RO & AC Service`,
    description: `Professional RO repair, installation, filter replacement, AMC, commercial RO and AC service solutions in Mathura, Vrindavan, Kosi Kalan, and nearby areas.`,
  },
  robots: { index: true, follow: true },
  category: 'Water treatment and AC services',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#041827',
}

const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  telephone: PHONE_PRIMARY_DISPLAY,
  email: EMAIL,
  description: TAGLINE,
  areaServed: ['Mathura', 'Vrindavan', 'Kosi Kalan', 'Gokul', 'Govardhan', 'Barsana'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '301 Krishna Vihar Colony, Near Diksha Public School, BSA Road, Bypass',
    addressLocality: 'Mathura',
    addressRegion: 'Uttar Pradesh',
    postalCode: '281001',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: PHONE_PRIMARY_DISPLAY,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    {
      '@type': 'ContactPoint',
      telephone: PHONE_ALT_DISPLAY,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Repair and Maintenance' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO Installation' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Filter and Membrane Replacement' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RO AMC Plans' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial RO Systems' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AC Repair and Service' } },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23041827'/><text x='16' y='22' text-anchor='middle' font-size='18' fill='%2320C5D8' font-family='sans-serif'>S</text></svg>"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
