'use client'

import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import {
  trackWhatsAppClick,
  trackCallClick,
} from '@/components/analytics/AnalyticsEvents'

type WhatsAppProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  source: string
}

export function TrackedWhatsAppLink({
  href,
  source,
  onClick,
  ...props
}: WhatsAppProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return

    trackWhatsAppClick(source)
  }

  return (
    <a href={href} onClick={handleClick} {...props} />
  )
}

type CallProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  source: string
}

export function TrackedCallLink({ href, source, onClick, ...props }: CallProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return

    trackCallClick(source)
  }

  return (
    <a href={href} onClick={handleClick} {...props} />
  )
}
