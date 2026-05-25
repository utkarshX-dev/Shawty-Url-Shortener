export const SESSION_KEY = 'shawty-user'

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem(SESSION_KEY)
}
