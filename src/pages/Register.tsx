import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { Background } from '../components/layout/Background'
import toast from 'react-hot-toast'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) return toast.error('Parol kamida 6 belgidan iborat bo\'lishi kerak')
    
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        }
      }
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!')
      navigate('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-bg overflow-hidden">
      <Background />
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="text-primary font-heading font-black text-2xl tracking-[3px] uppercase">
            ANOR<span className="text-text-main italic font-normal">MENT</span>
          </Link>
        </div>

        <GlassCard className="p-10" strong>
          <h1 className="text-3xl font-heading font-black text-text-main mb-2">Ro'yxatdan o'tish</h1>
          <p className="text-text-muted text-sm mb-10">Yangi akkaunt yarating va o'yinni boshlang</p>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 ml-1">To'liq ismingiz</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-text-main placeholder:text-text-muted focus:border-primary outline-none transition-all duration-300"
                placeholder="Azizbek Alimov"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 ml-1">Telefon raqamingiz</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-text-main placeholder:text-text-muted focus:border-primary outline-none transition-all duration-300"
                placeholder="+998 90 123 45 67"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 ml-1">Email manzili</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-text-main placeholder:text-text-muted focus:border-primary outline-none transition-all duration-300"
                placeholder="misol@anorment.uz"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 ml-1">Parol</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-text-main placeholder:text-text-muted focus:border-primary outline-none transition-all duration-300"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" fullWidth loading={loading} size="lg">
              Ro'yxatdan o'tish
            </Button>
          </form>

          <p className="text-center text-sm text-text-muted mt-8">
            Allaqachon akkauntingiz bormi?{' '}
            <Link to="/login" className="text-primary-light font-bold hover:underline">Kiring</Link>
          </p>
        </GlassCard>
      </div>
    </div>
  )
}
