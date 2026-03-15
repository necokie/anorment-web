export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  role: 'user' | 'admin'
  coins: number
  created_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Club {
  id: number
  name: string
  category_id: number
  city: string
  address: string | null
  description: string | null
  image_url: string | null
  rating: number
  coin_per_hour: number
  open_time: string
  close_time: string
  is_active: boolean
  categories?: Category
}

export interface Plan {
  id: number
  name: string
  coins: number
  price: number
  is_popular: boolean
  features: string[]
}

export interface Subscription {
  id: number
  user_id: string
  plan_id: number
  coins_remaining: number
  expires_at: string
  status: 'active' | 'expired'
  created_at: string
  plans?: Plan
}

export interface Booking {
  id: number
  user_id: string
  club_id: number
  booking_date: string
  time_slot: string
  coins_spent: number
  status: 'confirmed' | 'completed' | 'cancelled'
  qr_token: string
  created_at: string
  clubs?: Club
}
