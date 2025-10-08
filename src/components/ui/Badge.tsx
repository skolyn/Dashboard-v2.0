import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-elevated-surface text-text-secondary border-border-color',
    success: 'bg-success-green/10 text-success-green border-success-green/20',
    warning: 'bg-warning-amber/10 text-warning-amber border-warning-amber/20',
    danger: 'bg-critical-red/10 text-critical-red border-critical-red/20',
    info: 'bg-info-blue/10 text-info-blue border-info-blue/20',
  }
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}