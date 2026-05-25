import apiClient from './apiClient'

export async function updateProfile(payload) {
  const { data } = await apiClient.put('/profile', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}
