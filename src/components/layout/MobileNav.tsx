import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuthStore } from '../../store/authStore'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: { name: string, path: string }[]
}

export const MobileNav = ({ isOpen, onClose, links }: MobileNavProps) => {
  const { user, profile, signOut } = useAuthStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-2xl animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col h-full p-8">
        <div className="flex items-center justify-between mb-12">
          <Link to="/" onClick={onClose} className="text-primary font-heading font-black text-xl tracking-[3px] uppercase">
            ANOR<span className="text-text-main italic font-normal">MENT</span>
          </Link>
          <button onClick={onClose} className="p-2 text-text-main">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-8 flex-grow">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={onClose}
              className="text-4xl font-heading font-black text-text-main hover:text-primary transition-colors uppercase tracking-tighter"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link 
              to="/dashboard" 
              onClick={onClose}
              className="text-4xl font-heading font-black text-text-main hover:text-primary transition-colors uppercase tracking-tighter"
            >
              Profil
            </Link>
          )}
        </nav>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          {user ? (
            <div className="flex flex-col gap-2">
              <p className="text-text-muted mb-2">Salom, {profile?.full_name || 'User'}</p>
              <Button onClick={() => { signOut(); onClose(); }} fullWidth variant="outline">Chiqish</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to="/login" onClick={onClose}>
                <Button fullWidth variant="outline">Kirish</Button>
              </Link>
              <Link to="/register" onClick={onClose}>
                <Button fullWidth>Ro'yxatdan o'tish</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
