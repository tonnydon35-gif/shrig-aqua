import './globals.css'
import { Providers } from './providers'
import { PHONE_PRIMARY_DISPLAY, PHONE_ALT_DISPLAY, EMAIL } from '@/lib/business'

export const metadata = {
  title: 'SHRI G AQUA Mathura | RO, Commercial RO & AC Service',
  description:
    'Domestic RO sales and service, customized Commercial RO systems, Split AC installation and service, washing machine service and refrigerator service enquiries in Mathura.',
  keywords: [
    'Commercial RO Mathura',
    'Domestic RO Mathura',
    'RO service Mathura',
    'Split AC installation Mathura',
    'Washing machine service Mathura',
    'Refrigerator service Mathura',
    'SHRI G AQUA'
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SHRI G AQUA Mathura | RO, Commercial RO & AC Service',
    description:
      'Domestic RO sales and service, customized Commercial RO systems, Split AC installation and service, and appliance service enquiries across Mathura.',
    type: 'website',
    url: '/'
  },
  robots: { index: true, follow: true }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#05070c'
}

const localBusinessLd = {
  '@context': 'https://schema.org',
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
  ],
  areaServed: { '@type': 'City', name: 'Mathura, Uttar Pradesh' }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
      </head>
      <body className="antialiased bg-[#05070c] text-white overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
