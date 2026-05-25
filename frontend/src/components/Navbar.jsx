import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaUserCircle } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'
import Button from './Button'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-black/95 backdrop-blur text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-3xl font-semibold italic tracking-wide text-white font-cedar">
          Shawty
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-gray-200 md:flex">
          <NavLink to="/" className="hover:text-white">Home</NavLink>
          {isAuthenticated ? <NavLink to="/dashboard" className="hover:text-white">Dashboard</NavLink> : null}
          {isAuthenticated ? <NavLink to="/profile" className="hover:text-white">Profile</NavLink> : null}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white text-white transition hover:bg-white/10"
            aria-label="Open profile"
          >
            {user && user.photoUrl ? (
              <img src={user.photoUrl} alt={user.username || 'profile'} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <span className="inline-flex"><FaUserCircle className="h-6 w-6" /></span>
            )}
          </button>

          {isAuthenticated ? (
            <Button
              variant="secondary"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              Logout
            </Button>
          ) : (
            <Button variant="primary" onClick={() => navigate('/login')}>
              Login
              <span className="inline-flex"><FaArrowRight /></span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
