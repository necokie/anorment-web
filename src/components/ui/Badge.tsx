import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  className?: string
}

export const Badge = ({ children, variant = 'primary', className = '' }: BadgeProps) => {
  const variants = {
    primary: 'bg-primary/10 text-primary-light border-primary/20',
    secondary: 'bg-white/5 text-text-muted border-white/10',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-solid ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
