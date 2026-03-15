import { Button } from '../ui/Button'

export const DownloadCTA = () => {
  return (
    <section className="py-24 px-4 sm:px-0">
      <div className="wrapper">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#1e3a8a] to-[#1e1b4b] border border-white/10 p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          {/* Background Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-light/20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-[1.1] tracking-tighter">
              Ilovani yuklab oling<br />
              va o'ynashni boshlang
            </h2>
            <p className="text-blue-100/70 text-lg mb-10 leading-relaxed">
              Bugun boshlash uchun eng yaxshi vaqt hisoblanadi. Samarqanddagi barcha gaming maskanlar hamyoningizda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="secondary"
                size="lg"
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-xl transition-all hover:-translate-y-1 group"
              >
                <div className="text-2xl opacity-80 group-hover:opacity-100">🍎</div>
                <div className="text-left">
                  <span className="block text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1">Yuklab olish</span>
                  <span className="block text-sm font-bold text-white leading-none">App Store</span>
                </div>
              </Button>
              
              <Button 
                variant="secondary"
                size="lg"
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-xl transition-all hover:-translate-y-1 group"
              >
                <div className="text-2xl opacity-80 group-hover:opacity-100">🤖</div>
                <div className="text-left">
                  <span className="block text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1">Yuklab olish</span>
                  <span className="block text-sm font-bold text-white leading-none">Google Play</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="relative z-10 hidden lg:block">
            <div className="w-64 h-[450px] bg-white/5 border border-white/20 rounded-[40px] p-4 backdrop-blur-3xl rotate-6 shadow-2xl relative">
              <div className="h-full w-full bg-bg rounded-[32px] overflow-hidden border border-white/5 p-4 flex flex-col justify-between">
                <div className="w-8 h-1 bg-white/10 rounded-full mx-auto mb-8"></div>
                <div className="flex-grow flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 mx-auto mb-4 border border-primary/30 flex items-center justify-center font-heading font-black text-primary-light">
                    AN
                  </div>
                  <div className="w-24 h-2 bg-white/5 rounded-full mx-auto mb-2"></div>
                  <div className="w-32 h-2 bg-white/5 rounded-full mx-auto mb-4"></div>
                </div>
                <div className="h-10 w-full bg-primary rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
