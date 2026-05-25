import apiClient from './apiClient'

export async function loginUser(payload) {
  const { data } = await apiClient.post('/login', payload)
  return data
}

export async function registerUser(payload) {
  const { data } = await apiClient.post('/register', payload)
  return data
}

export async function deleteAccount() {
  const { data } = await apiClient.delete('/delete')
  return data
}
