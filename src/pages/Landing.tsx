import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Background } from '../components/layout/Background'
import { Hero } from '../components/sections/Hero'
import { Stats } from '../components/sections/Stats'
import { Benefits } from '../components/sections/Benefits'
import { ClubCategories } from '../components/sections/ClubCategories'
import { HowItWorks } from '../components/sections/HowItWorks'
import { PricingSection } from '../components/sections/PricingSection'
import { DownloadCTA } from '../components/sections/DownloadCTA'

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Background />
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Benefits />
        <ClubCategories />
        <HowItWorks />
        <PricingSection />
        <DownloadCTA />
      </main>
      
      <Footer />
    </div>
  )
}
