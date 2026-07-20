export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.shrigaqua.in'
  const now = new Date()
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${base}/commercial-ro`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    }
  ]
}
