import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { useEffect, type ReactNode } from 'react'
import { useAuthStore } from './store/authStore'
import { useAuth } from './hooks/useAuth'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Clubs from './pages/Clubs'
import ClubDetail from './pages/ClubDetail'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading, initialized } = useAuth()
  if (!initialized || loading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, profile, loading, initialized } = useAuth()
  if (!initialized || loading) return null
  if (!user || profile?.role !== 'admin') return <Navigate to="/" replace />
  return <>{children}</>
}

function AppContent() {
  const initializeAuth = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <BrowserRouter>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: 'rgba(5, 10, 20, 0.95)',
            color: '#f1f5f9',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            fontSize: '14px',
            padding: '16px 24px',
          }
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
