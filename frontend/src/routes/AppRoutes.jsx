import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import DashboardPage from '../pages/DashboardPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import MetricsPage from '../pages/MetricsPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProfilePage from '../pages/ProfilePage'
import UpdateProfilePage from '../pages/UpdateProfilePage'
import PrivacyPolicy from '../pages/Policy'
import RegisterPage from '../pages/RegisterPage'
import UrlsPage from '../pages/UrlsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="metrics" element={<MetricsPage />} />
            <Route path="urls" element={<UrlsPage />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<UpdateProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
