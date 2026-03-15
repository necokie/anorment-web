import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Club, Category } from '../types'

export const useClubs = (categoryId?: number, search?: string) => {
  return useQuery({
    queryKey: ['clubs', categoryId, search],
    queryFn: async () => {
      let query = supabase
        .from('clubs')
        .select('*, categories(*)')
        .eq('is_active', true)

      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }

      if (search) {
        query = query.ilike('name', `%${search}%`)
      }

      const { data, error } = await query.order('rating', { ascending: false })
      if (error) throw error
      return data as Club[]
    }
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('id')
      if (error) throw error
      return data as Category[]
    }
  })
}

export const useClub = (id: number) => {
  return useQuery({
    queryKey: ['club', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clubs')
        .select('*, categories(*)')
        .eq('id', id)
        .single()
      if (error) throw error
      return data as Club
    }
  })
}
