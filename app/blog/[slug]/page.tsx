import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ChevronRight, MessageCircle, Phone, Bug } from 'lucide-react'
import { getPostBySlug, getAllPostSlugs, type WPPost } from '@/lib/wordpress'
import { services } from '@/data/services'
import { siteConfig } from '@/data/siteConfig'
import JsonLd from '@/components/ui/JsonLd'
import CTABanner from '@/components/ui/CTABanner'
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/schema'
import { htmlToPlainText, sanitizeWordPressHtml } from '@/lib/sanitize'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

type Params = { slug: string }

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return {
      description: 'Pest control tips, prevention guides and service updates for homes and businesses in Delhi NCR.',
      alternates: { canonical: `https://bioorganicpestcontrol.in/blog/${slug}` },
    }
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url
  const title = htmlToPlainText(post.title.rendered)
  const description = htmlToPlainText(post.excerpt.rendered).slice(0, 160)

  return {
    title,
    description,
    alternates: { canonical: `https://bioorganicpestcontrol.in/blog/${slug}` },
    openGraph: featuredImage ? { images: [{ url: featuredImage }] } : undefined,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function wordCount(html: string) {
  return htmlToPlainText(html).split(/\s+/).filter(Boolean).length
}

function getCategory(post: WPPost): string | null {
  return post._embedded?.['wp:term']?.[0]?.[0]?.name ?? null
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
  const category = getCategory(post)
  const readTime = Math.max(1, Math.ceil(wordCount(post.content.rendered) / 200))
  const plainTitle = htmlToPlainText(post.title.rendered)
  const plainExcerpt = htmlToPlainText(post.excerpt.rendered).slice(0, 160)
  const safeContent = sanitizeWordPressHtml(post.content.rendered)

  const schema = [
    getArticleSchema({
      title: plainTitle,
      slug,
      date: post.date,
      excerpt: plainExcerpt,
    }),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: plainTitle, url: `/blog/${slug}` },
    ]),
  ]

  const sidebarServices = services.slice(0, 6)

  return (
    <>
      <JsonLd schema={schema} />

      {/* Breadcrumb */}
      <div className="bg-gray-bg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-gray-700 line-clamp-1">{plainTitle}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* ── Article ── */}
          <article className="max-w-3xl">

            {/* Header */}
            <header className="mb-8 space-y-4">
              {category && (
                <span className="inline-block bg-primary-light text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                  {category}
                </span>
              )}

              <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
                {plainTitle}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {readTime} min read
                </span>
              </div>

              {featuredImage ? (
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={featuredImage.source_url}
                    alt={featuredImage.alt_text || plainTitle}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-primary-light flex items-center justify-center">
                  <Bug size={56} className="text-primary opacity-30" />
                </div>
              )}
            </header>

            {/* Content */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-24 space-y-6">

            {/* Quote card */}
            <div className="bg-primary rounded-2xl p-6 text-white space-y-4">
              <h3 className="font-semibold text-lg leading-snug">
                Need Pest Control in Delhi NCR?
              </h3>
              <p className="text-white/75 text-sm leading-relaxed">
                Free inspection. 1–3 year warranty.
              </p>
              <TrackedWhatsAppLink
                href={siteConfig.whatsappHref}
                source="blog_sidebar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition-colors"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </TrackedWhatsAppLink>
              <TrackedCallLink
                href={siteConfig.phoneHref}
                source="blog_sidebar"
                className="flex items-center justify-center gap-2 w-full border border-white/30 text-white/80 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                <Phone size={15} />
                {siteConfig.phoneFormatted}
              </TrackedCallLink>
            </div>

            {/* Services list */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">Our Services</h3>
              <ul className="space-y-2">
                {sidebarServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors group"
                    >
                      <ChevronRight size={13} className="text-gray-300 group-hover:text-primary transition-colors shrink-0" />
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="block mt-4 text-xs font-medium text-primary hover:underline"
              >
                View all services →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <CTABanner />
    </>
  )
}
