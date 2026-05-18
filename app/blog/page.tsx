import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Bug, ChevronRight, Calendar } from 'lucide-react'
import { getAllPosts, type WPPost } from '@/lib/wordpress'
import CTABanner from '@/components/ui/CTABanner'
import { htmlToPlainText } from '@/lib/sanitize'

export const metadata: Metadata = {
  title: 'Pest Control Blog & Tips | Delhi NCR',
  description:
    'Expert pest control tips, prevention guides and local service updates for homeowners and businesses in Delhi NCR.',
  alternates: {
    canonical: 'https://bioorganicpestcontrol.in/blog',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function PostCard({ post }: { post: WPPost }) {
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]
  const title = htmlToPlainText(post.title.rendered)
  const excerpt = htmlToPlainText(post.excerpt.rendered).slice(0, 200)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden"
    >
      {/* Featured image */}
      {featuredImage ? (
        <div className="relative aspect-video">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-primary-light flex items-center justify-center">
          <Bug size={40} className="text-primary opacity-40" />
        </div>
      )}

      <div className="flex flex-col flex-1 gap-2 p-5">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={12} />
          {formatDate(post.date)}
        </div>
        <h2 className="font-medium text-lg text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>
        <span className="text-sm font-medium text-primary mt-1">Read More →</span>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const posts = await getAllPosts(1, 9)

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-12">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Blog</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
            Pest Control Tips &amp; Updates
          </h1>
          <p className="text-white/70">
            Prevention guides, seasonal tips, and service updates for Delhi NCR homeowners and businesses.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-gray-bg py-14">
        <div className="max-w-6xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Bug size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium text-gray-500">No posts yet.</p>
              <p className="text-sm mt-1">Check back soon for pest control tips and updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  )
}
