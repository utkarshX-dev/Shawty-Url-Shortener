import { useState } from 'react'
import { deleteAccount, loginUser, registerUser } from '../services/authService'
import { getStoredUser, clearStoredUser, setStoredUser } from '../utils/storage'
import AuthContext from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())

  const login = async (payload) => {
    const data = await loginUser(payload)
    setUser(data.user)
    setStoredUser(data.user)
    return data
  }

  const register = async (payload) => {
    const data = await registerUser(payload)
    setUser(data.user)
    setStoredUser(data.user)
    return data
  }

  const logout = () => {
    setUser(null)
    clearStoredUser()
  }

  const applyUserUpdate = (nextUser) => {
    setUser(nextUser)
    setStoredUser(nextUser)
  }

  const removeAccount = async () => {
    const data = await deleteAccount()
    logout()
    return data
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    applyUserUpdate,
    removeAccount,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

