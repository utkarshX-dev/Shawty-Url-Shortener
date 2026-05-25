import apiClient from './apiClient'

export async function shortenUrl(payload) {
  const { data } = await apiClient.post('/shorten', payload)
  return data
}

export async function createCustomAlias(payload) {
  const { data } = await apiClient.post('/custom', payload)
  return data
}

export async function getUserUrls() {
  const { data } = await apiClient.get('/urls')
  return data
}

export async function deleteUserUrl(urlId) {
  const { data } = await apiClient.delete(`/url/${urlId}`)
  return data
}

export async function getDashboardMetrics() {
  const { data } = await apiClient.get('/metrics')
  return data
}

export async function getPublicShortUrl(shortUrl) {
  const { data } = await apiClient.get(`/url/${shortUrl}`)
  return data
}
