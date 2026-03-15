import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from '../components/ui/Button'
import { GlassCard } from '../components/ui/GlassCard'
import { Background } from '../components/layout/Background'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message === 'Invalid login credentials' ? 'Email yoki parol noto\'g\'ri' : error.message)
    } else {
      toast.success('Xush kelibsiz!')
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
          <h1 className="text-3xl font-heading font-black text-text-main mb-2">Xush kelibsiz</h1>
          <p className="text-text-muted text-sm mb-10 text-balance">Davom etish uchun tizimga kiring</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
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
              Kirish
            </Button>
          </form>

          <p className="text-center text-sm text-text-muted mt-8">
            Akkauntingiz yo'qmi?{' '}
            <Link to="/register" className="text-primary-light font-bold hover:underline">Ro'yxatdan o'ting</Link>
          </p>
        </GlassCard>
      </div>
    </div>
  )
}
