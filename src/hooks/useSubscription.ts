import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import type { Plan } from '../types'
import toast from 'react-hot-toast'

export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const { data, error } = await supabase.from('plans').select('*').order('price')
      if (error) throw error
      return data as Plan[]
    }
  })
}

export const usePurchasePlan = () => {
  const queryClient = useQueryClient()
  const { fetchProfile, fetchSubscription } = useAuthStore()

  return useMutation({
    mutationFn: async ({ userId, plan }: { userId: string, plan: Plan }) => {
      // 1. Create subscription
      const expiresAt = new Date()
      expiresAt.setMonth(expiresAt.getMonth() + 1)

      const { error: subError } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_id: plan.id,
          coins_remaining: plan.coins,
          expires_at: expiresAt.toISOString(),
          status: 'active'
        })
      
      if (subError) throw subError

      // 2. Update profile coins
      const { data: profile } = await supabase
        .from('profiles')
        .select('coins')
        .eq('id', userId)
        .single()
      
      await supabase
        .from('profiles')
        .update({ coins: (profile?.coins || 0) + plan.coins })
        .eq('id', userId)

      return true
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', variables.userId] })
      fetchProfile(variables.userId)
      fetchSubscription(variables.userId)
      toast.success('Obuna muvaffaqiyatli faollashtirildi!')
    },
    onError: (error: any) => {
      toast.error(`To'lovda xatolik: ${error.message}`)
    }
  })
}
