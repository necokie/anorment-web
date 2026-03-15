import type { ReactNode, MouseEventHandler } from 'react'

interface GlassCardProps {
  children?: ReactNode
  className?: string
  strong?: boolean
  hover?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const GlassCard = ({ children, className = '', strong = false, hover = false, onClick }: GlassCardProps) => {
  return (
    <div 
      onClick={onClick}
      className={`
        ${strong ? 'glass-strong' : 'glass'} 
        rounded-[18px] 
        ${hover ? 'hover:-translate-y-1 hover:border-primary/50 transition-all duration-300' : ''} 
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
