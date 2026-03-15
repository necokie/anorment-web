import { Button } from '../ui/Button'
import { GlassCard } from '../ui/GlassCard'
import { Link } from 'react-router-dom'

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="wrapper grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 items-center">
        <div className="relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            <span className="text-[10px] font-bold tracking-wider text-text-muted uppercase">Samarqand shahri uchun faol</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black leading-[0.95] tracking-tight text-text-main mb-6">
            Bitta obuna<br />
            <span className="opacity-30">barcha o'yin</span><br />
            <span className="bg-gradient-to-r from-primary-light to-indigo-400 bg-clip-text text-transparent">maskanlari</span>
          </h1>
          
          <p className="text-text-muted text-lg max-w-lg mb-10 mx-auto lg:mx-0 leading-relaxed">
            Yagona virtual tanga tizimi orqali PC, PS5 va Bilyard klublariga kiring va qulay vaqtni band qiling.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">Ro'yxatdan o'tish</Button>
            </Link>
            <Link to="/clubs" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">Klublarni ko'rish</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="p-6 aspect-square flex flex-col justify-end" hover>
            <div className="text-primary-light font-bold text-xs mb-2 tracking-widest uppercase">PC</div>
            <div className="text-4xl font-heading font-black text-text-main">12+</div>
            <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Gaming markazlar</div>
          </GlassCard>
          
          <div className="bg-primary/20 border border-primary/30 rounded-[18px] p-6 aspect-square flex flex-col justify-end transition-transform hover:-translate-y-1 duration-300">
            <div className="text-blue-200 font-bold text-xs mb-2 tracking-widest uppercase">PS5</div>
            <div className="text-4xl font-heading font-black text-white">5+</div>
            <div className="text-[10px] text-blue-200/60 mt-1 uppercase tracking-wider">PlayStation zallari</div>
          </div>
          
          <GlassCard className="p-6 aspect-square flex flex-col justify-end" hover>
            <div className="text-primary-light font-bold text-xs mb-2 tracking-widest uppercase">Bilyard</div>
            <div className="text-4xl font-heading font-black text-text-main">8+</div>
            <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Professional stollar</div>
          </GlassCard>
          
          <GlassCard className="p-6 aspect-square flex flex-col justify-end" hover>
            <div className="text-primary-light font-bold text-xs mb-2 tracking-widest uppercase">Tangalar</div>
            <div className="text-4xl font-heading font-black text-text-main">10K+</div>
            <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Har kuni sarflanadi</div>
          </GlassCard>
          
          <GlassCard className="col-span-2 p-6 flex items-center gap-6" hover>
            <div className="text-primary-light font-bold text-xs tracking-widest uppercase rotate-180 [writing-mode:vertical-lr]">Baholar</div>
            <div>
              <div className="text-3xl font-heading font-black text-text-main">4.9 / 5.0</div>
              <div className="text-[10px] text-text-muted mt-1 uppercase tracking-wider">Ilova foydalanuvchilari bahosi</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
