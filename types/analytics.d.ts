type AnalyticsPrimitive = string | number | boolean | null | undefined
type AnalyticsParams = Record<string, AnalyticsPrimitive>

type GtagFunction = (
  ...args:
    | ['js', Date]
    | ['config', string, AnalyticsParams?]
    | ['set', string, AnalyticsParams]
    | ['consent', 'default' | 'update', Record<string, string>]
    | ['event', string, AnalyticsParams?]
) => void

type FbqEventOptions = { eventID?: string }

type FbqFunction = {
  (command: 'init', pixelId: string): void
  (command: 'track', event: string, params?: AnalyticsParams, options?: FbqEventOptions): void
  (command: 'trackCustom', event: string, params?: AnalyticsParams, options?: FbqEventOptions): void
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFunction
    fbq?: FbqFunction
    _fbq?: unknown
  }
}

export {}
