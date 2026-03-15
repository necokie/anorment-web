import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-bg/50 backdrop-blur-md">
      <div className="wrapper py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <Link to="/" className="text-primary font-heading font-black text-2xl tracking-[3px] uppercase">
            ANOR<span className="text-text-main italic font-normal">MENT</span>
          </Link>
          
          <div className="flex gap-8">
            <Link to="/clubs" className="text-sm text-text-muted hover:text-text-main transition-colors">Klublar</Link>
            <Link to="/pricing" className="text-sm text-text-muted hover:text-text-main transition-colors">Tariflar</Link>
            <Link to="/privacy" className="text-sm text-text-muted hover:text-text-main transition-colors">Maxfiylik</Link>
            <Link to="/terms" className="text-sm text-text-muted hover:text-text-main transition-colors">Shartlar</Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-text-muted">
            © 2026 Anorment Entertainment · Barcha huquqlar himoyalangan.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-text-muted">Samarqand, O'zbekiston</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
