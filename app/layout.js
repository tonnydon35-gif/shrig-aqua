import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'SHRI G AQUA Mathura — Commercial RO, Domestic RO & Split AC Service',
  description:
    'SHRI G AQUA Mathura designs customized Commercial RO systems and delivers dependable Domestic RO sales, installation and service, alongside Split AC installation and service across Mathura, Uttar Pradesh.',
  keywords: [
    'Commercial RO Mathura',
    'Domestic RO Mathura',
    'RO service Mathura',
    'Split AC installation Mathura',
    'Washing machine service Mathura',
    'Refrigerator service Mathura',
    'SHRI G AQUA'
  ],
  openGraph: {
    title: 'SHRI G AQUA Mathura — Commercial RO specialists',
    description:
      'Customized commercial RO systems, domestic RO sales & service, and Split AC service across Mathura.',
    type: 'website'
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover'
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
        <meta name="theme-color" content="#05070c" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="antialiased bg-[#05070c] text-white overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
