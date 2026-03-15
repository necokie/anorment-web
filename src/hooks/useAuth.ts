import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const user = useAuthStore((state) => state.user)
  const profile = useAuthStore((state) => state.profile)
  const subscription = useAuthStore((state) => state.subscription)
  const loading = useAuthStore((state) => state.loading)
  const initialized = useAuthStore((state) => state.initialized)
  const signOut = useAuthStore((state) => state.signOut)

  return {
    user,
    profile,
    subscription,
    loading,
    initialized,
    signOut,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin'
  }
}
