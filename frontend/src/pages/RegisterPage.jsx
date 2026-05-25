import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import useAuth from '../hooks/useAuth'
import { toastError, toastSuccess } from '../utils/toast'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    username: '',
    email: '',
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
      const data = await register(form)
      toastSuccess(data.message || 'Account created')
      navigate('/dashboard')
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
        Register
      </h1>

      <p className="mt-1 text-sm text-gray-600">
        Create your <span className="font-cedar">Shawty</span> account
      </p>
    </div>

    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>

      <FormInput
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="yourname"
        required
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="name@example.com"
        required
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Create password"
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Register'}
      </Button>
    </form>

    {/* centered login */}
    <p className="mt-4 text-center text-sm text-gray-600">
      Already have an account?{' '}
      <Link className="font-medium text-black underline" to="/login">
        Login
      </Link>
    </p>
  </section>
)
}
