import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  glass?: boolean
}

export function Card({ children, hover = true, glass = false, className = '', ...props }: CardProps) {
  const base = 'rounded-[18px] border border-white/5 transition-all duration-300'
  const bg = glass
    ? 'bg-[rgba(26,26,46,0.8)] backdrop-blur-[10px]'
    : 'bg-[var(--bg3)]'
  const hoverClass = hover ? 'hover:-translate-y-1.5' : ''

  return (
    <div className={`${base} ${bg} ${hoverClass} ${className}`} {...props}>
      {children}
    </div>
  )
}
