import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tranzrmoves.com'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/quotation`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/storage`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Moving services pages
  const movingPages = [
    '24-7',
    'local-residential',
    'long-distance',
    'commercial',
    'small-moves',
    'last-minute',
    'apartment',
    'house',
    'student',
    'hourly',
    'events',
    'same-building',
  ].map(service => ({
    url: `${baseUrl}/moving/${service}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Service pages
  const servicePages = [
    'full-packing',
    'white-glove',
    'plastic-bin-rental',
    'box-delivery',
    'valuable-items',
    'piano-moving',
    'furniture-assembly',
    'fitness-equipment',
    'wooden-crate-packing',
  ].map(service => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Company pages
  const companyPages = [
    'about',
    'contact',
    'experience',
    'licenses',
    'movers',
    'press-news',
    'quality-assurance',
    'safety',
    'truck-fleet',
  ].map(page => ({
    url: `${baseUrl}/company/${page}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Resource pages
  const resourcePages = [
    'blogs',
    'claims',
    'cost-calculator',
    'faq',
    'flat-fee-move',
    'how-to-pack',
    'move-day-checklist',
    'move-day-guide',
    'packing-videos',
    'referral-program',
    'reviews',
  ].map(page => ({
    url: `${baseUrl}/resources/${page}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...movingPages,
    ...servicePages,
    ...companyPages,
    ...resourcePages,
  ]
}
