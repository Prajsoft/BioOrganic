import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import CredentialsBar from '@/components/sections/CredentialsBar'
import TrustBar from '@/components/sections/TrustBar'
import ServicesGrid from '@/components/sections/ServicesGrid'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyUs from '@/components/sections/WhyUs'
import TrustedBy from '@/components/sections/TrustedBy'
import Testimonials from '@/components/sections/Testimonials'
import LocationsStrip from '@/components/sections/LocationsStrip'
import CTABanner from '@/components/ui/CTABanner'
import JsonLd from '@/components/ui/JsonLd'
import { getLocalBusinessSchema, getOrganizationSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: { absolute: 'Pest Control Services in Delhi NCR | Bio Organic Pest Control' },
  description:
    'Professional pest control in Ghaziabad, Noida, Greater Noida & East Delhi. Govt-licensed, non-toxic, 1–3 year warranty. Call +91-9999266042.',
  alternates: {
    canonical: 'https://bioorganicpestcontrol.in',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={[getLocalBusinessSchema(), getOrganizationSchema()]} />
      <Hero />
      <CredentialsBar />
      <TrustBar />
      <ServicesGrid />
      <HowItWorks />
      <WhyUs />
      <TrustedBy />
      <Testimonials />
      <LocationsStrip />
      <CTABanner />
    </>
  )
}
