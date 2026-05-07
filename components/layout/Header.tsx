'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/data/siteConfig'
import { services } from '@/data/services'
import { pests } from '@/data/pests'
import { TrackedCallLink, TrackedWhatsAppLink } from '@/components/analytics/TrackedLinks'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Locations', href: '/locations' },
  { label: 'AMC', href: '/amc' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [pestsOpen, setPestsOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobilePestsOpen, setMobilePestsOpen] = useState(false)

  const servicesRef = useRef<HTMLDivElement>(null)
  const pestsRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close desktop dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
      if (pestsRef.current && !pestsRef.current.contains(e.target as Node)) {
        setPestsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close open menus from the keyboard.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setServicesOpen(false)
      setPestsOpen(false)
      setDrawerOpen(false)
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Lock body scroll and keep focus inside the mobile drawer.
  useEffect(() => {
    if (!drawerOpen) return

    const previousOverflow = document.body.style.overflow
    const triggerButton = menuButtonRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !drawerRef.current) return

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handler)
      triggerButton?.focus()
    }
  }, [drawerOpen])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        {/* ── Top bar ── */}
        <div className="hidden md:block bg-primary">
          <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
            <span className="text-white text-xs">
              Serving Delhi NCR since {siteConfig.established} &nbsp;|&nbsp; {siteConfig.hours}
            </span>
            <TrackedCallLink
              href={siteConfig.phoneHref}
              source="header_top"
              aria-label="Call Bio Organic Pest Control"
              className="flex items-center gap-1.5 text-white text-xs hover:text-primary-light transition-colors"
            >
              <Phone size={12} aria-hidden="true" />
              {siteConfig.phoneFormatted}
            </TrackedCallLink>
          </div>
        </div>

        {/* ── Main nav ── */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-tight shrink-0">
              <span className="text-lg font-bold">
                <span className="text-primary">Bio Organic</span>
                <span className="text-gray-600"> Pest Control</span>
              </span>
              <span className="text-xs text-gray-400 tracking-wide">
                Est. {siteConfig.established} &middot; Govt. Licensed
              </span>
            </Link>

            {/* Desktop center nav */}
            <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5 text-sm font-medium text-gray-700">
              <Link href="/" className="px-3 py-2 rounded hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/about" className="px-3 py-2 rounded hover:text-primary transition-colors">
                About
              </Link>

              {/* Services dropdown */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => { setServicesOpen((v) => !v); setPestsOpen(false) }}
                  aria-expanded={servicesOpen}
                  aria-controls="desktop-services-menu"
                  className="flex items-center gap-1 px-3 py-2 rounded hover:text-primary transition-colors"
                >
                  Services
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {servicesOpen && (
                  <div id="desktop-services-menu" className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] bg-white border border-gray-100 rounded-xl shadow-xl p-5 z-50">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Our Services
                    </p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center gap-2 py-1.5 text-sm text-gray-700 hover:text-primary transition-colors group"
                        >
                          <ChevronRight size={12} className="text-gray-300 group-hover:text-primary transition-colors shrink-0" />
                          {s.shortTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pest Control dropdown */}
              <div ref={pestsRef} className="relative">
                <button
                  onClick={() => { setPestsOpen((v) => !v); setServicesOpen(false) }}
                  aria-expanded={pestsOpen}
                  aria-controls="desktop-pests-menu"
                  className="flex items-center gap-1 px-3 py-2 rounded hover:text-primary transition-colors"
                >
                  Pest Control
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${pestsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {pestsOpen && (
                  <div id="desktop-pests-menu" className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-xl p-4 z-50">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Pest Library
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {pests.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/pest-control/${p.slug}`}
                          onClick={() => setPestsOpen(false)}
                          className="flex items-center gap-2 py-1.5 text-sm text-gray-700 hover:text-primary transition-colors group"
                        >
                          <ChevronRight size={12} className="text-gray-300 group-hover:text-primary transition-colors shrink-0" />
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/locations" className="px-3 py-2 rounded hover:text-primary transition-colors">
                Locations
              </Link>
              <Link href="/amc" className="px-3 py-2 rounded hover:text-primary transition-colors">
                AMC
              </Link>
              <Link href="/blog" className="px-3 py-2 rounded hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="px-3 py-2 rounded hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Desktop right CTA */}
            <div className="hidden lg:flex flex-col items-end gap-0.5 shrink-0">
              <TrackedWhatsAppLink
                href={siteConfig.whatsappHref}
                source="header_desktop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors min-h-[44px]"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Chat on WhatsApp
              </TrackedWhatsAppLink>
              <TrackedCallLink
                href={siteConfig.phoneHref}
                source="header_desktop"
                aria-label="Call Bio Organic Pest Control"
                className="text-xs text-gray-500 hover:text-primary transition-colors"
              >
                {siteConfig.phoneFormatted}
              </TrackedCallLink>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={menuButtonRef}
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2.5 -mr-2 text-gray-600 hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer so page content clears fixed header */}
      <div className="h-16 md:h-24" />

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
          <Link href="/" onClick={() => setDrawerOpen(false)} className="flex flex-col leading-tight">
            <span className="text-base font-bold">
              <span className="text-primary">Bio Organic</span>
              <span className="text-gray-600"> Pest Control</span>
            </span>
            <span className="text-xs text-gray-400">Est. {siteConfig.established} · Govt. Licensed</span>
          </Link>
          <button
            ref={closeButtonRef}
            onClick={() => setDrawerOpen(false)}
            className="p-2.5 -mr-2 text-gray-500 hover:text-gray-900 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav role="navigation" aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-3 px-2">
          {navLinks
            .filter((l) => !['Services', 'Pest Control'].includes(l.label))
            .map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setDrawerOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-menu"
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
            >
              Services
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileServicesOpen && (
              <div id="mobile-services-menu" className="ml-4 mb-1 border-l-2 border-primary-light pl-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setDrawerOpen(false)}
                    className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Pest Control accordion */}
          <div>
            <button
              onClick={() => setMobilePestsOpen((v) => !v)}
              aria-expanded={mobilePestsOpen}
              aria-controls="mobile-pests-menu"
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
            >
              Pest Control
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mobilePestsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobilePestsOpen && (
              <div id="mobile-pests-menu" className="ml-4 mb-1 border-l-2 border-primary-light pl-3">
                {pests.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/pest-control/${p.slug}`}
                    onClick={() => setDrawerOpen(false)}
                    className="block py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Drawer footer CTAs */}
        <div className="shrink-0 p-4 border-t border-gray-100 flex flex-col gap-3">
          <TrackedWhatsAppLink
            href={siteConfig.whatsappHref}
            source="mobile_drawer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors min-h-[44px]"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp
          </TrackedWhatsAppLink>
          <TrackedCallLink
            href={siteConfig.phoneHref}
            source="mobile_drawer"
            aria-label="Call Bio Organic Pest Control"
            className="flex items-center justify-center gap-2 border border-primary text-primary font-medium py-3 rounded-xl hover:bg-primary-light transition-colors min-h-[44px]"
          >
            <Phone size={18} aria-hidden="true" />
            Call Now
          </TrackedCallLink>
        </div>
      </div>
    </>
  )
}
