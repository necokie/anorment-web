import { useNavigate } from 'react-router-dom'
import { GlassCard } from '../ui/GlassCard'
import { useCategories } from '../../hooks/useClubs'
import type { Category } from '../../types'

type DisplayCategory = (Category | { name: string; slug: string; count: number; id?: number })

export const ClubCategories = () => {
  const { data: categories, isLoading } = useCategories()
  const navigate = useNavigate()

  const fallbackCategories: DisplayCategory[] = [
    { name: 'PC Gaming', slug: 'pc', count: 12, id: 1 },
    { name: 'PS5 Zone', slug: 'ps5', count: 5, id: 2 },
    { name: 'Bilyard', slug: 'bilyard', count: 8, id: 3 },
  ]

  const displayCategories = categories || fallbackCategories

  return (
    <section className="py-24 bg-white/[0.01] border-y border-white/5">
      <div className="wrapper">
        <div className="mb-16">
          <span className="text-primary-light text-[10px] font-bold tracking-[4px] uppercase block mb-4">Klublar katalogi</span>
          <h2 className="text-4xl font-heading font-black text-text-main mb-6 tracking-tight">Asosiy xizmatlar</h2>
          <p className="text-text-muted text-base max-w-xl leading-relaxed">
            Tangalaringizni o'zingiz xohlagan maqsadga sarflang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <GlassCard key={i} className="h-24 animate-pulse">
                <div />
              </GlassCard>
            ))
          ) : (
            displayCategories.map((cat: any) => (
              <GlassCard 
                key={cat.id || cat.slug} 
                className="p-6 flex items-center justify-between group"
                hover
                onClick={() => navigate(`/clubs?category=${cat.id}`)}
              >
                <div>
                  <h3 className="text-lg font-heading font-bold text-text-main group-hover:text-primary-light transition-colors">{cat.name}</h3>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest mt-1 block">{cat.count || 0} ta klub</span>
                </div>
                <div className="text-primary-light font-bold text-xs tracking-wider opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  TANLASH →
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
