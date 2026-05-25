const SHORT_BASE_URL = import.meta.env.VITE_SHORT_BASE_URL ?? 'http://localhost:3000'

export function normalizeShortUrl(shortUrl) {
  if (!shortUrl) return ''
  if (/^https?:\/\//i.test(shortUrl)) return shortUrl

  const code = String(shortUrl).split('/').filter(Boolean).at(-1)
  return `${SHORT_BASE_URL.replace(/\/$/, '')}/${code}`
}

export function formatDate(date) {
  if (!date) return 'N/A'
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function truncate(text, max = 60) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max)}...` : text
}
