import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuthStore } from '../../store/authStore'
import { MobileNav } from './MobileNav'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, profile, signOut } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Klublar', path: '/clubs' },
    { name: 'Tariflar', path: '/pricing' },
    { name: 'Qanday ishlaydi', path: '/#how-it-works' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-border py-4' : 'bg-transparent py-6'}`}>
      <div className="wrapper flex items-center justify-between">
        <Link to="/" className="text-primary font-heading font-black text-xl tracking-[3px] uppercase">
          ANOR<span className="text-text-main italic font-normal">MENT</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-sm font-medium text-text-main hover:text-primary transition-colors">
                {profile?.full_name || 'Profil'}
              </Link>
              <Button onClick={() => signOut()} variant="outline" size="sm">
                Chiqish
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors">
                Kirish
              </Link>
              <Link to="/register">
                <Button size="sm">Boshlash</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col gap-1.5 p-2" 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span className="w-6 h-0.5 bg-text-main"></span>
          <span className="w-6 h-0.5 bg-text-main"></span>
          <span className="w-4 h-0.5 bg-text-main self-end"></span>
        </button>
      </div>

      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks}
      />
    </header>
  )
}
