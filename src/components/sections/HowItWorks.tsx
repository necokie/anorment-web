import { GlassCard } from '../ui/GlassCard'

export const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'Obuna oling',
      description: 'O\'zingizga mos tarifni tanlang va hisobingizni virtual tangalar bilan to\'ldiring.'
    },
    {
      id: '02',
      title: 'Klub tanlang',
      description: 'Xaritadan o\'zingizga yaqin joyni toping va kerakli vaqtni belgilang.'
    },
    {
      id: '03',
      title: 'QR orqali kiring',
      description: 'Klub ma\'muriyatiga kodingizni ko\'rsating va hisobingizdan tanga yechiladi.'
    }
  ]

  return (
    <section className="py-24" id="how-it-works">
      <div className="wrapper">
        <div className="mb-16">
          <span className="text-primary-light text-[10px] font-bold tracking-[4px] uppercase block mb-4">Qanday ishlaydi</span>
          <h2 className="text-4xl font-heading font-black text-text-main mb-6 tracking-tight">3 ta oddiy qadam</h2>
          <p className="text-text-muted text-base max-w-xl leading-relaxed">
            Tizimga ulanish bir necha daqiqa vaqt oladi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <GlassCard key={step.id} className="p-10 relative overflow-hidden group" hover>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
              
              <div className="relative z-10">
                <span className="text-primary-light font-heading font-black text-xs tracking-[4px] block mb-8 leading-none">{step.id}</span>
                <h3 className="text-xl font-heading font-black text-text-main mb-4">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
