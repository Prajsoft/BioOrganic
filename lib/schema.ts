import { siteConfig } from '@/data/siteConfig'
import { locations } from '@/data/locations'

const SITE_URL = 'https://bioorganicpestcontrol.in'

type Location = (typeof locations)[number]
type Service = {
  slug: string
  title: string
  heroSubtext: string
  [key: string]: unknown
}
type FAQ = { q: string; a: string }
type BreadcrumbItem = { name: string; url: string }
type BlogPost = { title: string; slug: string; date: string; excerpt: string }

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: SITE_URL,
    telephone: '+919999266042',
    logo: `${SITE_URL}/images/logo.svg`,
    sameAs: Object.values(siteConfig.social),
  }
}

export function getLocalBusinessSchema(location?: Location) {
  const loc = location ?? locations.find((l) => l.slug === 'ghaziabad')!
  const [streetAddress, ...rest] = loc.address.split(', ')
  const locality = rest.slice(0, -1).join(', ')
  const postalEntry = loc.address.match(/\d{6}/)
  const postalCode = postalEntry ? postalEntry[0] : '201011'

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'PestControl'],
    name: siteConfig.name,
    telephone: '+919999266042',
    url: SITE_URL,
    image: `${SITE_URL}/images/social-card.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: locality,
      addressRegion: loc.state,
      postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    },
    areaServed: locations.map((l) => l.city),
    priceRange: '₹₹',
    openingHours: 'Mo-Su 09:00-19:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.googleRating,
      reviewCount: siteConfig.reviewCount,
      bestRating: '5',
    },
  }
}

export function getServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.heroSubtext,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    areaServed: 'Delhi NCR',
    url: `${SITE_URL}/services/${service.slug}`,
  }
}

export function getFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function getArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.svg`,
      },
    },
  }
}
