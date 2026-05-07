import Link from 'next/link'
import CTABanner from '@/components/ui/CTABanner'

export default function NotFound() {
  return (
    <>
      <div className="min-h-[60vh] flex items-center justify-center bg-primary-light px-4">
        <div className="max-w-md w-full text-center space-y-5">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Page Not Found</h2>
            <p className="text-gray-500 text-sm">
              The page you are looking for does not exist.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-primary text-primary font-semibold px-6 py-3 rounded-xl hover:bg-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <CTABanner />
    </>
  )
}
