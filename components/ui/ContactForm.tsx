'use client'

import { useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { locations } from '@/data/locations'
import { services } from '@/data/services'
import { trackFormSubmit, trackLeadPixel } from '@/components/analytics/AnalyticsEvents'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMessage('')
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const service = (data.service as string) || 'unknown'
    const city = (data.city as string) || 'unknown'

    // Generate event_id here so client + server use the same one for deduplication
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const fbp = document.cookie.split('; ').find((r) => r.startsWith('_fbp='))?.split('=')[1]
    const fbc = document.cookie.split('; ').find((r) => r.startsWith('_fbc='))?.split('=')[1]

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _eventId: eventId, _fbp: fbp, _fbc: fbc }),
      })
      if (res.ok) {
        // GA4 + Google Ads conversion
        trackFormSubmit(service, city)
        // Meta Pixel client-side Lead — same eventId as CAPI (server fires from /api/contact)
        trackLeadPixel(service, city, eventId)
        setState('success')
        form.reset()
      } else {
        const response = await res.json().catch(() => null)
        setErrorMessage(response?.message || 'Please call or WhatsApp us directly.')
        setState('error')
      }
    } catch {
      setErrorMessage('Please call or WhatsApp us directly.')
      setState('error')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Request a Free Quote</h2>

      {state === 'success' && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-6" role="status" aria-live="polite">
          <CheckCircle2 size={20} className="text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-800 text-sm">Thank you!</p>
            <p className="text-green-700 text-sm">We will call you within 2 hours.</p>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6" role="alert">
          <AlertCircle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 text-sm">Something went wrong.</p>
            <p className="text-red-700 text-sm">
              {errorMessage || 'Please call us directly.'}{' '}
              <TrackedCallLink href={siteConfig.phoneHref} source="contact_form_error" className="underline font-medium">
                {siteConfig.phoneFormatted}
              </TrackedCallLink>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot — must stay empty; bots fill it and get silently discarded */}
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden', opacity: 0 }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Rahul Sharma"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              pattern="[+()\-.\s0-9]{8,20}"
              required
              placeholder="+91 98765 43210"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="city">
              City <span className="text-red-500">*</span>
            </label>
            <select
              id="city"
              name="city"
              required
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">Select your city</option>
              {locations.map((l) => (
                <option key={l.slug} value={l.city}>{l.city}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700" htmlFor="service">
              Service Required <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.shortTitle}>{s.shortTitle}</option>
              ))}
              <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
              <option value="Not sure / General Enquiry">Not sure / General Enquiry</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700" htmlFor="message">
            Message <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us more — property type, size, any specific pest problem..."
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={state === 'submitting'}
          aria-busy={state === 'submitting'}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === 'submitting' ? 'Sending…' : 'Send Request'}
        </button>

        <p className="text-xs text-center text-gray-400">
          Or reach us directly on{' '}
          <TrackedWhatsAppLink href={siteConfig.whatsappHref} source="contact_form_fallback" target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">
            WhatsApp
          </TrackedWhatsAppLink>
          {' '}for an instant reply.
        </p>
      </form>
    </div>
  )
}
