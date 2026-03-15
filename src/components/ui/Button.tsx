import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
  loading?: boolean
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth,
  loading,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light shadow-[0_0_20px_rgba(37,99,235,0.3)]',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md',
    outline: 'bg-transparent border border-white/20 text-white hover:border-primary hover:text-primary-light',
    ghost: 'bg-transparent text-text-muted hover:text-text-main'
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </button>
  )
}
