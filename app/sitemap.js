const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shrigaqua.in'

const routes = [
  { url: '/', priority: 1.0 },
  { url: '/ro-service', priority: 0.9 },
  { url: '/ro-installation', priority: 0.9 },
  { url: '/ro-amc', priority: 0.9 },
  { url: '/commercial-ro', priority: 0.9 },
  { url: '/ac-service', priority: 0.9 },
  { url: '/about', priority: 0.7 },
  { url: '/contact', priority: 0.8 },
  { url: '/book-service', priority: 0.8 },
  { url: '/privacy-policy', priority: 0.3 },
  { url: '/terms', priority: 0.3 },
  { url: '/cancellation-policy', priority: 0.3 },
  { url: '/service-warranty', priority: 0.3 },
]

export default function sitemap() {
  return routes.map(({ url, priority }) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
