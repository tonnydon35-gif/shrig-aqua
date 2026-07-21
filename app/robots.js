const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shrigaqua.in'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
