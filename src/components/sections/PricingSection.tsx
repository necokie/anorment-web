import { Link } from 'react-router-dom'
import { GlassCard } from '../ui/GlassCard'
import { Badge } from '../ui/Badge'
import { usePlans } from '../../hooks/useSubscription'

export const PricingSection = () => {
  const { data: plans, isLoading } = usePlans()

  const fallbackPlans = [
    { id: 1, name: 'START PLAN', coins: 1500, price: 75000, is_popular: false, features: ['Barcha klublarga kirish', 'Standart narxlar', 'Cheklangan bron'] },
    { id: 2, name: 'PRO PLAN', coins: 3500, price: 150000, is_popular: true, features: ['Barcha klublarga kirish', 'Chegirmali narxlar', 'Cheksiz bron', 'VIP xonalar'] },
    { id: 3, name: 'VIP PLAN', coins: 6500, price: 250000, is_popular: false, features: ['Barcha klublarga kirish', 'Maksimal chegirmalar', 'Cheksiz bron', 'Do\'stlar uchun mehmon kartasi'] },
  ]

  const displayPlans = plans || fallbackPlans

  return (
    <section className="py-24 bg-white/[0.01] border-t border-white/5">
      <div className="wrapper">
        <div className="mb-16 text-center lg:text-left">
          <span className="text-primary-light text-[10px] font-bold tracking-[4px] uppercase block mb-4">Tariflar</span>
          <h2 className="text-4xl font-heading font-black text-text-main mb-6 tracking-tight">Virtual tangalar xaridi</h2>
          <p className="text-text-muted text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            O'yin soatlaringizga qarab mos hajmni tanlang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <GlassCard key={i} className="h-[400px] animate-pulse">
                <div />
              </GlassCard>
            ))
          ) : (
            displayPlans.map((plan) => (
              <GlassCard 
                key={plan.id} 
                className={`p-10 flex flex-col ${plan.is_popular ? 'bg-primary/10 border-primary/40' : ''}`}
                strong={plan.is_popular}
                hover
              >
                {plan.is_popular && (
                  <Badge className="mb-6 self-start bg-primary text-white border-transparent">Eng mashhur</Badge>
                )}
                
                <h3 className="text-lg font-heading font-bold text-text-main mb-2 uppercase tracking-widest">{plan.name}</h3>
                
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-heading font-black text-primary-light">{plan.coins.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-text-muted uppercase tracking-[3px] mb-8">virtual tanga</div>
                
                <ul className="flex flex-col gap-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-text-muted border-b border-white/5 pb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-light/50"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/pricing" className="w-full">
                  <div className={`
                    inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 px-6 py-3 text-sm w-full
                    ${plan.is_popular ? 'bg-primary text-white hover:bg-primary-light shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md'}
                  `}>
                    Sotib olish — {plan.price.toLocaleString()} so'm
                  </div>
                </Link>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
