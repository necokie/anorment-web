import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { Profile, Subscription } from '../types'

interface AuthState {
  user: User | null
  profile: Profile | null
  subscription: Subscription | null
  loading: boolean
  initialized: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: Profile | null) => void
  setSubscription: (subscription: Subscription | null) => void
  fetchProfile: (userId: string) => Promise<void>
  fetchSubscription: (userId: string) => Promise<void>
  signOut: () => Promise<void>
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  subscription: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setSubscription: (subscription) => set({ subscription }),

  fetchProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data && !error) {
      set({ profile: data as Profile })
    }
  },

  fetchSubscription: async (userId) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, plans(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (data && !error) {
      set({ subscription: data as Subscription })
    } else {
      set({ subscription: null })
    }
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null, profile: null, subscription: null })
  },

  initialize: () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({ user: session?.user ?? null, loading: false, initialized: true })
      if (session?.user) {
        get().fetchProfile(session.user.id)
        get().fetchSubscription(session.user.id)
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null, loading: false, initialized: true })
      if (session?.user) {
        get().fetchProfile(session.user.id)
        get().fetchSubscription(session.user.id)
      } else {
        set({ profile: null, subscription: null })
      }
    })
  },
}))
