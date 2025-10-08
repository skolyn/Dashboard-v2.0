import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-small text-text-secondary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-secondary-bg border border-border-color rounded-md text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-skolyn-light transition-colors',
            error && 'border-critical-red',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-body-small text-critical-red">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input