const SHORT_BASE_URL = (import.meta.env.VITE_SHORT_BASE_URL ?? window.location.origin).replace(/\/$/, '')

export function normalizeShortUrl(shortUrl) {
  if (!shortUrl) return ''

  const value = String(shortUrl)
  const code = value.includes('://')
    ? value.split('/').filter(Boolean).at(-1)
    : value.split('/').filter(Boolean).at(-1)

  if (!code) return value

  return `${SHORT_BASE_URL}/${code}`
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
