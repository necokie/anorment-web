import { GlassCard } from '../ui/GlassCard'

export const Benefits = () => {
  const benefits = [
    {
      id: '01',
      title: 'Vaqtni tejash',
      description: 'Navbatda turmang va oldindan joyingizni aniq band qilib boring.',
      icon: 'Vaqt'
    },
    {
      id: '02',
      title: 'Oson kirish',
      description: 'Klubga borgach telefoningizdagi QR kodni ko\'rsating va o\'yinni boshlang.',
      icon: 'QR'
    },
    {
      id: '03',
      title: 'Yagona hisob',
      description: 'Barcha xarajatlar va o\'yin tarixingiz bitta ilovada to\'liq saqlanadi.',
      icon: 'Hisob'
    }
  ]

  return (
    <section className="py-24">
      <div className="wrapper">
        <div className="mb-16">
          <span className="text-primary-light text-[10px] font-bold tracking-[4px] uppercase block mb-4">Nima uchun Anorment?</span>
          <h2 className="text-4xl font-heading font-black text-text-main mb-6 tracking-tight">O'yin jarayonini osonlashtiring</h2>
          <p className="text-text-muted text-base max-w-xl leading-relaxed">
            Klubma klub narx so'rab yurishni to'xtating va yagona hisobdan foydalaning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((ben) => (
            <GlassCard key={ben.id} className="p-10 flex flex-col group" hover>
              <div className="flex items-center justify-between mb-8">
                <span className="text-primary-light font-heading font-black text-xs tracking-[4px]">{ben.id}</span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light font-bold text-xs group-hover:scale-110 transition-transform">
                  {ben.icon}
                </div>
              </div>
              <h3 className="text-xl font-heading font-black text-text-main mb-4">{ben.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {ben.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
