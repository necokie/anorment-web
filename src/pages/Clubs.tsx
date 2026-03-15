import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Background } from '../components/layout/Background'
import { GlassCard } from '../components/ui/GlassCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { useClubs, useCategories } from '../hooks/useClubs'

export default function Clubs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category') ? parseInt(searchParams.get('category')!) : undefined
  const [search, setSearch] = useState('')
  
  const { data: categories } = useCategories()
  const { data: clubs, isLoading } = useClubs(categoryId, search)

  const handleCategoryChange = (id?: number) => {
    if (id) {
      setSearchParams({ category: id.toString() })
    } else {
      setSearchParams({})
    }
  }

  return (
    <div className="min-h-screen relative bg-bg">
      <Background />
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        <div className="wrapper">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-text-main mb-8">Klublarni kashf eting</h1>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Search */}
              <div className="relative w-full md:max-w-md">
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Klub nomini qidiring..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-text-main placeholder:text-text-muted focus:border-primary outline-none transition-all"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-50">🔍</div>
              </div>
              
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full">
                <button 
                  onClick={() => handleCategoryChange()}
                  className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${!categoryId ? 'bg-primary text-white' : 'bg-white/5 text-text-muted border border-white/10 hover:bg-white/10'}`}
                >
                  Barchasi
                </button>
                {categories?.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${categoryId === cat.id ? 'bg-primary text-white' : 'bg-white/5 text-text-muted border border-white/10 hover:bg-white/10'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <GlassCard key={i} className="h-64 animate-pulse" />
              ))}
            </div>
          ) : clubs?.length === 0 ? (
            <EmptyState 
              title="Klublar topilmadi" 
              description="Siz qidirayotgan kategoriya yoki nom bo'yicha hech qanday natija chiqib kelmadi." 
              actionLabel="Barcha klublarni ko'rish"
              onAction={() => handleCategoryChange()}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs?.map((club) => (
                <GlassCard key={club.id} className="group overflow-hidden flex flex-col" hover>
                  <div className="relative h-48 bg-white/5 overflow-hidden">
                    <img 
                      src={club.image_url || `https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={club.name}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="primary" className="bg-bg/60 backdrop-blur-md">
                        {club.categories?.name}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-heading font-bold text-text-main group-hover:text-primary-light transition-colors">{club.name}</h3>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        ⭐ {club.rating}
                      </div>
                    </div>
                    
                    <p className="text-text-muted text-xs mb-6 line-clamp-2">
                      {club.address} · Samarqand
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted uppercase tracking-widest">Narxi</span>
                        <span className="text-lg font-heading font-black text-text-main">{club.coin_per_hour} <span className="text-xs font-bold opacity-30">tanga/soat</span></span>
                      </div>
                      <Link to={`/clubs/${club.id}`}>
                        <Button variant="secondary" size="sm">Batafsil</Button>
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
