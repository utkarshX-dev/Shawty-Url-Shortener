import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black text-white grid gap-4 lg:grid-cols-[240px_1fr]">
      <Sidebar />
      <div className="space-y-4">
        <Outlet />
      </div>
    </div>
  )
}
