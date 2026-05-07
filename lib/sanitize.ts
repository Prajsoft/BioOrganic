const UNSAFE_ELEMENTS =
  /<\s*(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi
const UNSAFE_STANDALONE_ELEMENTS =
  /<\s*\/?\s*(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)[^>]*>/gi
const EVENT_HANDLER_ATTRIBUTES = /\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi
const UNSAFE_URL_ATTRIBUTES =
  /\s+(href|src|xlink:href)\s*=\s*("[\s]*javascript:[^"]*"|'[\s]*javascript:[^']*'|[^\s>]*javascript:[^\s>]*)/gi
const UNSAFE_DATA_ATTRIBUTES =
  /\s+(href|src|xlink:href)\s*=\s*("[\s]*data:text\/html[^"]*"|'[\s]*data:text\/html[^']*'|[^\s>]*data:text\/html[^\s>]*)/gi

export function sanitizeWordPressHtml(html: string) {
  return html
    .replace(UNSAFE_ELEMENTS, '')
    .replace(UNSAFE_STANDALONE_ELEMENTS, '')
    .replace(EVENT_HANDLER_ATTRIBUTES, '')
    .replace(UNSAFE_URL_ATTRIBUTES, ' $1="#"')
    .replace(UNSAFE_DATA_ATTRIBUTES, ' $1="#"')
}

export function htmlToPlainText(html: string) {
  return sanitizeWordPressHtml(html)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}
