export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://shrigaqua.example'
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
