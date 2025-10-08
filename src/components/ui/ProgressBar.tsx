import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  color?: 'primary' | 'success' | 'warning' | 'danger'
}

export default function ProgressBar({
  value,
  max = 100,
  className,
  showLabel = false,
  color = 'primary',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colors = {
    primary: 'bg-skolyn-primary',
    success: 'bg-success-green',
    warning: 'bg-warning-amber',
    danger: 'bg-critical-red',
  }
  
  return (
    <div className={cn('w-full', className)}>
      <div className="relative w-full h-2 bg-secondary-bg rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all duration-300 ease-out', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-body-small text-text-secondary text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}