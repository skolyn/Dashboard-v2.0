import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-bg'
    
    const variants = {
      primary: 'bg-skolyn-primary hover:bg-skolyn-light text-text-primary focus:ring-skolyn-light',
      secondary: 'bg-elevated-surface hover:bg-hover-state text-text-primary border border-border-color focus:ring-skolyn-light',
      tertiary: 'bg-transparent hover:bg-hover-state text-text-secondary hover:text-text-primary focus:ring-skolyn-light',
      danger: 'bg-critical-red hover:bg-critical-red/90 text-white focus:ring-critical-red',
    }
    
    const sizes = {
      sm: 'h-8 px-3 text-body-small',
      md: 'h-10 px-4 text-body',
      lg: 'h-12 px-6 text-body-large',
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button