import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import type { Booking } from '../types'
import toast from 'react-hot-toast'

export const useBookings = (userId?: string) => {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: async () => {
      if (!userId) return []
      const { data, error } = await supabase
        .from('bookings')
        .select('*, clubs(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as Booking[]
    },
    enabled: !!userId
  })
}

export const useClubBookings = (clubId: number, date: string) => {
  return useQuery({
    queryKey: ['club-bookings', clubId, date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('time_slot')
        .eq('club_id', clubId)
        .eq('booking_date', date)
        .eq('status', 'confirmed')
      if (error) throw error
      return data.map(b => b.time_slot)
    }
  })
}

export const useCreateBooking = () => {
  const queryClient = useQueryClient()
  const { fetchProfile, fetchSubscription } = useAuthStore()

  return useMutation({
    mutationFn: async (booking: Omit<Booking, 'id' | 'created_at' | 'qr_token' | 'status'>) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single()
      
      if (error) throw error

      // Deduct coins from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('coins')
        .eq('id', booking.user_id)
        .single()
      
      if (profile) {
        await supabase
          .from('profiles')
          .update({ coins: profile.coins - booking.coins_spent })
          .eq('id', booking.user_id)
      }

      // Update remaining coins in subscription
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('id, coins_remaining')
        .eq('user_id', booking.user_id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      
      if (sub) {
        await supabase
          .from('subscriptions')
          .update({ coins_remaining: sub.coins_remaining - booking.coins_spent })
          .eq('id', sub.id)
      }

      return data as Booking
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] })
      queryClient.invalidateQueries({ queryKey: ['club-bookings'] })
      fetchProfile(variables.user_id)
      fetchSubscription(variables.user_id)
      toast.success('Muvaffaqiyatli band qilindi!')
    },
    onError: (error: any) => {
      toast.error(`Xatolik: ${error.message}`)
    }
  })
}
