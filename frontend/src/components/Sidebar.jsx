import { NavLink } from 'react-router-dom'
import { FaChartBar, FaHome, FaLink, FaUserCog } from 'react-icons/fa'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: FaHome },
  { to: '/dashboard/metrics', label: 'Metrics', icon: FaChartBar },
  { to: '/dashboard/urls', label: 'URLs', icon: FaLink },
  { to: '/profile', label: 'Profile', icon: FaUserCog },
]

export default function Sidebar() {
  return (
    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
      <nav className="grid gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'
              }`
            }
          >
            <span className="inline-flex"><Icon /></span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
