import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Background } from '../components/layout/Background'
import { GlassCard } from '../components/ui/GlassCard'
import { Button } from '../components/ui/Button'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useClubs } from '../hooks/useClubs'
import { useBookings } from '../hooks/useBookings'
import { Html5QrcodeScanner } from 'html5-qrcode'
import toast from 'react-hot-toast'

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'stats' | 'clubs' | 'bookings' | 'scanner'>('stats')
  const { data: clubs, isLoading: clubsLoading } = useClubs()
  const { data: bookings, isLoading: bookingsLoading } = useBookings()
  const [isScannerOpen, setIsScannerOpen] = useState(false)

  const startScanner = () => {
    setIsScannerOpen(true)
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false)
      scanner.render((decodedText) => {
        toast.success(`QR Kod tasdiqlandi: ${decodedText}`)
        scanner.clear()
        setIsScannerOpen(false)
      }, () => {
        // quiet error
      })
    }, 100)
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
              <h2 className="px-6 py-4 text-[10px] font-black text-primary uppercase tracking-[4px] mb-2">Admin Panel</h2>
              <button 
                onClick={() => setActiveTab('stats')}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'stats' ? 'bg-primary text-white' : 'text-text-muted hover:bg-white/5'}`}
              >
                Statistika
              </button>
              <button 
                onClick={() => setActiveTab('clubs')}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'clubs' ? 'bg-primary text-white' : 'text-text-muted hover:bg-white/5'}`}
              >
                Klublar boshqaruvi
              </button>
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'bookings' ? 'bg-primary text-white' : 'text-text-muted hover:bg-white/5'}`}
              >
                Bandlovlar
              </button>
              <button 
                onClick={() => setActiveTab('scanner')}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'scanner' ? 'bg-primary text-white' : 'text-text-muted hover:bg-white/5'}`}
              >
                QR Skayner
              </button>
            </aside>

            {/* Content area */}
            <div className="flex-grow">
              {activeTab === 'stats' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <GlassCard className="p-8" strong>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-2">Jami tushum</span>
                    <span className="text-3xl font-heading font-black text-emerald-400">12,450,000 <span className="text-xs">so'm</span></span>
                  </GlassCard>
                  <GlassCard className="p-8" strong>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-2">Faol foydalanuvchilar</span>
                    <span className="text-3xl font-heading font-black text-primary-light">1,240</span>
                  </GlassCard>
                  <GlassCard className="p-8" strong>
                    <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-2">Jami bandlovlar</span>
                    <span className="text-3xl font-heading font-black text-indigo-400">458</span>
                  </GlassCard>
                </div>
              )}

              {activeTab === 'clubs' && (
                <GlassCard className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-heading font-bold text-text-main">Klublar ro'yxati</h3>
                    <Button size="sm">Yangi klub</Button>
                  </div>
                  {clubsLoading ? <LoadingSpinner /> : (
                    <div className="space-y-4">
                      {clubs?.map(club => (
                        <div key={club.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 overflow-hidden">
                              <img src={club.image_url || ''} className="w-full h-full object-cover" alt={club.name} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-text-main">{club.name}</h4>
                              <p className="text-[10px] text-text-muted uppercase tracking-widest">{club.categories?.name} · {club.rating} ⭐</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Tahrirlash</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassCard>
              )}

              {activeTab === 'bookings' && (
                <GlassCard className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-xl font-heading font-bold text-text-main mb-8">Barcha bandlovlar</h3>
                  {bookingsLoading ? <LoadingSpinner /> : (
                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5 opacity-40">
                            <th className="pb-4 uppercase tracking-widest text-[9px] font-black">Mijoz</th>
                            <th className="pb-4 uppercase tracking-widest text-[9px] font-black">Klub</th>
                            <th className="pb-4 uppercase tracking-widest text-[9px] font-black">Sana</th>
                            <th className="pb-4 uppercase tracking-widest text-[9px] font-black">Vaqt</th>
                            <th className="pb-4 uppercase tracking-widest text-[9px] font-black text-right">Holat</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {bookings?.map(booking => (
                            <tr key={booking.id} className="hover:bg-white/[0.01]">
                              <td className="py-4 text-text-main font-bold">UID: {booking.user_id.slice(0, 8)}</td>
                              <td className="py-4 text-text-muted">{booking.clubs?.name}</td>
                              <td className="py-4 text-text-muted">{booking.booking_date}</td>
                              <td className="py-4 text-text-muted">{booking.time_slot}</td>
                              <td className="py-4 text-right italic font-bold text-primary-light uppercase tracking-widest">OK</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </GlassCard>
              )}

              {activeTab === 'scanner' && (
                <GlassCard className="p-12 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500" strong>
                  <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary-light text-4xl mb-8">
                    📸
                  </div>
                  <h3 className="text-2xl font-heading font-black text-text-main mb-4">QR Kod Skayneri</h3>
                  <p className="text-text-muted text-sm max-w-sm mb-10 leading-relaxed">
                    Mijozning telefonidagi QR kodni skanerlang va uning bandlovi holatini tasdiqlang.
                  </p>
                  
                  {isScannerOpen ? (
                    <div id="reader" className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/10"></div>
                  ) : (
                    <Button size="lg" onClick={startScanner}>Skaynerni yoqish</Button>
                  )}
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
