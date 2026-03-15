import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Background } from '../components/layout/Background'
import { PricingSection } from '../components/sections/PricingSection'

export default function Pricing() {
  return (
    <div className="min-h-screen relative bg-bg">
      <Background />
      <Header />
      
      <main className="relative z-10 pt-32 pb-24">
        <div className="wrapper">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-black text-text-main mb-6">Tarif rejalarimiz</h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
              O'yin soatlaringizni rejalashtiring va o'zingizga mos virtual tangalar paketini tanlang. Obuna bir oy davomida amal qiladi.
            </p>
          </div>
          
          <PricingSection />

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center lg:text-left">
            <div>
              <h4 className="text-lg font-heading font-bold text-text-main mb-4">Tangalar nima?</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Virtual tangalar — bu Anorment tizimi ichidagi valyuta bo'lib, ular orqali barcha hamkor klublarda to'lovlarni amalga oshirasiz.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold text-text-main mb-4">Muddat qancha?</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Har bir sotib olingan paket 30 kalendar kuni davomida amal qiladi. Ishlatilmagan tangalar keyingi oyga o'tmaydi.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-heading font-bold text-text-main mb-4">Qaytarib berish?</h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Tangalar biror klubga sarflangandan so'ng qaytarib berilmaydi. Texnik xatoliklar bo'lganda qo'llab-quvvatlash xizmati yordam beradi.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
