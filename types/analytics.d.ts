type AnalyticsPrimitive = string | number | boolean | null | undefined
type AnalyticsParams = Record<string, AnalyticsPrimitive>

type GtagFunction = (
  ...args:
    | ['js', Date]
    | ['config', string, AnalyticsParams?]
    | ['event', string, AnalyticsParams?]
) => void

type FbqFunction = (
  ...args:
    | ['init', string]
    | ['track', string, AnalyticsParams?]
) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFunction
    fbq?: FbqFunction
    _fbq?: unknown
  }
}

export {}
