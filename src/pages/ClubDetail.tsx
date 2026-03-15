import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Background } from '../components/layout/Background'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useClub } from '../hooks/useClubs'
import { useClubBookings, useCreateBooking } from '../hooks/useBookings'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function ClubDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, subscription } = useAuth()
  const { data: club, isLoading } = useClub(parseInt(id!))
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  
  const { data: bookedSlots } = useClubBookings(parseInt(id!), selectedDate)
  const createBooking = useCreateBooking()

  if (isLoading || !club) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const timeSlots = []
  const startHour = parseInt(club.open_time.split(':')[0])
  const endHour = parseInt(club.close_time.split(':')[0])

  for (let h = startHour; h < endHour; h++) {
    timeSlots.push(`${h.toString().padStart(2, '0')}:00`)
  }

  const handleBooking = async () => {
    if (!user) {
      toast.error('Guruhni band qilish uchun avval tizimga kiring')
      return navigate('/login')
    }

    if (!subscription || subscription.coins_remaining < club.coin_per_hour) {
      toast.error('Hisobingizda yetarli tanga yo\'q. Iltimos obunangizni yangilang.')
      return navigate('/pricing')
    }

    if (!selectedSlot) return

    createBooking.mutate({
      user_id: user.id,
      club_id: club.id,
      booking_date: selectedDate,
      time_slot: selectedSlot,
      coins_spent: club.coin_per_hour
    })
  }

  return (
    <div className="min-h-screen relative bg-bg">
      <Background />
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        <div className="wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            <div>
              {/* Club Info */}
              <div className="mb-10">
                <Badge className="mb-4">{club.categories?.name}</Badge>
                <h1 className="text-4xl md:text-6xl font-heading font-black text-text-main mb-6 leading-none tracking-tight">
                  {club.name}
                </h1>
                <div className="flex flex-wrap gap-6 mb-10">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">⭐</span>
                    <span className="text-sm font-bold text-text-main">{club.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="opacity-40">📍</span>
                    <span className="text-sm text-text-muted">{club.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="opacity-40">🕒</span>
                    <span className="text-sm text-text-muted">{club.open_time} - {club.close_time}</span>
                  </div>
                </div>

                <div className="relative h-96 rounded-3xl overflow-hidden glass mb-10">
                  <img 
                    src={club.image_url || `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&q=80`}
                    className="w-full h-full object-cover"
                    alt={club.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent"></div>
                </div>

                <h3 className="text-xl font-heading font-bold text-text-main mb-4">Tavsif</h3>
                <p className="text-text-muted leading-relaxed mb-10">
                  {club.description || 'Bu klub haqida ma\'lumotlar tez kunda qo\'shiladi. Hozirda qulay va professional xizmatlardan foydalanishingiz mumkin.'}
                </p>
              </div>
            </div>

            <div>
              <aside className="sticky top-32">
                <GlassCard className="p-8" strong>
                  <h3 className="text-xl font-heading font-bold text-text-main mb-6">Joy band qilish</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Sanani tanlang</label>
                      <input 
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-main outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Vaqtni tanlang</label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => {
                          const isBooked = bookedSlots?.includes(slot)
                          const isSelected = selectedSlot === slot
                          
                          return (
                            <button
                              key={slot}
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot)}
                              className={`
                                py-3 rounded-xl text-xs font-bold transition-all
                                ${isBooked ? 'bg-white/5 text-text-muted/20 opacity-40 cursor-not-allowed' : 
                                  isSelected ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 
                                  'bg-white/5 text-text-muted border border-white/10 hover:border-primary/50'}
                              `}
                            >
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-text-muted text-sm italic">Xizmat narxi</span>
                        <div className="text-right">
                          <span className="text-2xl font-heading font-black text-text-main">{club.coin_per_hour}</span>
                          <span className="text-xs font-bold text-text-muted ml-2 tracking-widest uppercase">Tanga</span>
                        </div>
                      </div>

                      <Button 
                        fullWidth 
                        size="lg" 
                        disabled={!selectedSlot}
                        loading={createBooking.isPending}
                        onClick={handleBooking}
                      >
                        Vaqtni band qilish
                      </Button>
                      
                      {!user && (
                        <p className="text-[10px] text-center text-text-muted mt-4 uppercase tracking-wider leading-relaxed">
                          Band qilish uchun avval login qiling
                        </p>
                      )}
                      
                      {user && subscription && subscription.coins_remaining < club.coin_per_hour && (
                        <p className="text-[10px] text-center text-rose-400 mt-4 uppercase tracking-wider leading-relaxed">
                          Hisobingizda yetarli tanga yo'q
                        </p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </aside>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
