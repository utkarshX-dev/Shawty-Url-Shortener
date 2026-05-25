import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import useAuth from '../hooks/useAuth'
import { toastError, toastSuccess } from '../utils/toast'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [form, setForm] = useState({
    emailOrUsername: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const value = form.emailOrUsername.trim()
      const payload = value.includes('@')
        ? { email: value, password: form.password }
        : { username: value, password: form.password }

      const data = await login(payload)
      toastSuccess(data.message || 'Login successful')

      const from = location.state?.from?.pathname
      navigate(from || '/dashboard')
    } catch (error) {
      toastError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
  <section className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  
  {/* centered heading */}
  <div className="flex flex-col items-center justify-center text-center">
    <h1 className="text-2xl font-semibold text-black">
      Login
    </h1>

    <p className="mt-1 text-sm text-gray-600">
      Please login to continue to your <span className="font-cedar">Shawty</span> account
    </p>
  </div>

  <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
    <FormInput
      label="Email or Username"
      name="emailOrUsername"
      value={form.emailOrUsername}
      onChange={handleChange}
      placeholder="name@example.com or username"
      required
    />

    <FormInput
      label="Password"
      name="password"
      type="password"
      value={form.password}
      onChange={handleChange}
      placeholder="Enter password"
      required
    />

    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </Button>
  </form>

  {/* centered create account */}
  <p className="mt-4 text-center text-sm text-gray-600">
    New user?{' '}
    <Link className="font-medium text-black underline" to="/register">
      Create account
    </Link>
  </p>
</section>
  )
}
