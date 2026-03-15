import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Background } from '../components/layout/Background'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { useBookings } from '../hooks/useBookings'
import QRCode from 'react-qr-code'

export default function Dashboard() {
  const { user, profile, subscription, signOut } = useAuth()
  const { data: bookings, isLoading: bookingsLoading } = useBookings(user?.id)
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'profile'>('overview')

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen relative bg-bg">
      <Background />
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        <div className="wrapper">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-72 space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary text-white' : 'text-text-muted hover:bg-white/5'}`}
              >
                Asosiy ma'lumotlar
              </button>
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'bookings' ? 'bg-primary text-white' : 'text-text-muted hover:bg-white/5'}`}
              >
                Mening bandlovlarim
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-primary text-white' : 'text-text-muted hover:bg-white/5'}`}
              >
                Profil sozlamalari
              </button>
              <div className="pt-8 px-6">
                <button onClick={() => signOut()} className="text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-widest">
                  Chiqish
                </button>
              </div>
            </aside>

            {/* Content area */}
            <div className="flex-grow">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row gap-6">
                    <GlassCard className="flex-grow p-8" strong>
                      <h4 className="text-[10px] text-text-muted uppercase tracking-[3px] mb-2 font-bold">Xush kelibsiz</h4>
                      <h2 className="text-3xl font-heading font-black text-text-main mb-6">{profile?.full_name || 'Foydalanuvchi'}</h2>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                          <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-1">Qolgan tangalar</span>
                          <span className="text-3xl font-heading font-black text-primary-light">{profile?.coins || 0}</span>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                          <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-1">Obuna holati</span>
                          <span className={`${subscription ? 'text-emerald-400' : 'text-rose-400'} text-xs font-black uppercase tracking-widest`}>
                            {subscription ? 'Faol' : 'Yo\'q'}
                          </span>
                        </div>
                      </div>
                    </GlassCard>

                    <GlassCard className="lg:w-80 p-8 flex flex-col items-center justify-center text-center" strong>
                      <div className="bg-white p-4 rounded-2xl mb-4">
                        <QRCode 
                          value={user.id} 
                          size={140} 
                          fgColor="#080c14"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-text-main uppercase tracking-widest">Shaxsiy QR Kod</h4>
                      <p className="text-[10px] text-text-muted mt-2 max-w-[150px]">
                        Klubga kirayotganingizda ushbu kodni ko'rsating
                      </p>
                    </GlassCard>
                  </div>

                  <GlassCard className="p-8">
                    <h3 className="text-xl font-heading font-bold text-text-main mb-6">Oxirgi bandlovlar</h3>
                    {bookingsLoading ? (
                      <LoadingSpinner />
                    ) : bookings && bookings.length > 0 ? (
                      <div className="space-y-4">
                        {bookings.slice(0, 3).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light font-bold">
                                {booking.clubs?.name?.[0]}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-text-main">{booking.clubs?.name}</h4>
                                <p className="text-[10px] text-text-muted uppercase tracking-widest">{booking.booking_date} · {booking.time_slot}</p>
                              </div>
                            </div>
                            <div className="text-right text-xs">
                              <span className="font-bold text-text-main">-{booking.coins_spent}</span>
                              <span className="text-text-muted opacity-50 ml-1 uppercase">tanga</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-sm text-text-muted">Hozircha hech qanday bandlovlar mavjud emas.</p>
                      </div>
                    )}
                  </GlassCard>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-heading font-bold text-text-main mb-8">Barcha bandlovlar</h3>
                    {bookingsLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Klub</th>
                              <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Sana & Vaqt</th>
                              <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest italic">Narxi</th>
                              <th className="pb-4 text-[10px] font-bold text-text-muted uppercase tracking-widest italic text-right">Holat</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {bookings?.map((booking) => (
                              <tr key={booking.id} className="hover:bg-white/[0.02]">
                                <td className="py-6 font-bold text-sm text-text-main">{booking.clubs?.name}</td>
                                <td className="py-6 text-xs text-text-muted">
                                  {booking.booking_date} <span className="opacity-20 mx-2">|</span> {booking.time_slot}
                                </td>
                                <td className="py-6 text-sm font-black text-primary-light">{booking.coins_spent}</td>
                                <td className="py-6 text-right">
                                  <Badge variant={booking.status === 'confirmed' ? 'primary' : 'secondary'}>
                                    {booking.status === 'confirmed' ? 'Tasdiqlangan' : booking.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </GlassCard>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <GlassCard className="p-10 max-w-xl">
                    <h3 className="text-xl font-heading font-bold text-text-main mb-8">Profil ma'lumotlari</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">To'liq ism</label>
                        <input 
                          type="text" 
                          disabled
                          value={profile?.full_name || ''}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-main opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3">Telefon</label>
                        <input 
                          type="text" 
                          disabled
                          value={profile?.phone || ''}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-main opacity-50"
                        />
                      </div>
                      <div className="pt-6">
                        <p className="text-xs text-text-muted italic">
                          Profil ma'lumotlarini o'zgartirish uchun mijozlarni qo'llab-quvvatlash xizmati bilan bog'laning.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
