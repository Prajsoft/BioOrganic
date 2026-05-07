import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Bio Organic Pest Control',
  description: 'How Bio Organic Pest Control collects and uses your personal information.',
  robots: { index: false },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: January 2025</p>

      <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Information We Collect</h2>
          <p>
            When you submit a contact form on this website, we collect your name, phone number,
            and email address. We collect only the information needed to respond to your
            service enquiry.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">How We Use It</h2>
          <p>
            The information you provide is used solely to respond to your pest control enquiry
            and, if you book a service, to carry out and follow up on that service. We do not
            use your details for any other purpose.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Third Parties</h2>
          <p>
            We do not sell, rent, or share your personal information with any third parties
            for marketing or commercial purposes. Contact form submissions are processed by
            Web3Forms solely to deliver your message to us.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Analytics &amp; Cookies</h2>
          <div className="space-y-3">
            <p>
              This website uses Google Analytics 4 (GA4) to understand how visitors use the site.
              GA4 collects anonymised data including pages visited, time spent, and general location.
              No personally identifiable information is collected by GA4.
            </p>
            <p>
              This website uses Meta Pixel to measure the effectiveness of our advertising on
              Facebook and Instagram. Meta Pixel tracks actions such as page visits and form
              submissions to help us reach relevant audiences.
            </p>
            <p>
              Both tools use cookies. By using this website you consent to the use of these
              analytics tools.
            </p>
            <p>
              To opt out of Google Analytics tracking, visit:{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                tools.google.com/dlpage/gaoptout
              </a>
            </p>
            <p>
              To manage your Meta ad preferences, visit:{' '}
              <a
                href="https://www.facebook.com/ads/preferences"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                facebook.com/ads/preferences
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Contact</h2>
          <p>
            To request access to, correction of, or deletion of your data, contact us at{' '}
            <a
              href="mailto:info@bioorganicpestcontrol.in"
              className="text-primary font-medium hover:underline"
            >
              info@bioorganicpestcontrol.in
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  )
}
