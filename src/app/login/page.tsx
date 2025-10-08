'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeSlash } from 'phosphor-react'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const success = await login(email, password)
    
    if (success) {
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Please try again.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg px-4">
      <div className="w-full max-w-[440px] bg-elevated-surface rounded-lg p-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="text-3xl font-bold text-text-primary tracking-tight">
            SKOLYN
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-h2 text-text-primary text-center mb-2">
          Welcome to Skolyn
        </h1>
        <p className="text-body text-text-secondary text-center mb-8">
          AI-Powered Diagnostic Intelligence
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-body-small text-text-secondary mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@hospital.com"
              required
              className="w-full px-4 py-3 bg-secondary-bg border border-border-color rounded-md text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-skolyn-light transition-colors"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-body-small text-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full px-4 py-3 bg-secondary-bg border border-border-color rounded-md text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-skolyn-light transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 bg-secondary-bg border border-border-color rounded text-skolyn-primary focus:ring-2 focus:ring-skolyn-light"
            />
            <label htmlFor="remember" className="ml-2 text-body-small text-text-secondary">
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-body-small text-critical-red bg-critical-red/10 px-4 py-2 rounded-md">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-skolyn-primary hover:bg-skolyn-light text-text-primary font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-body-small text-clinical-teal hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-color"></div>
            </div>
            <div className="relative flex justify-center text-body-small">
              <span className="px-4 bg-elevated-surface text-text-tertiary">OR</span>
            </div>
          </div>

          {/* SSO Button */}
          <button
            type="button"
            className="w-full h-12 bg-transparent border border-border-color hover:border-text-tertiary text-text-primary font-medium rounded-md transition-colors"
          >
            Log In with Hospital SSO
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-caption text-text-tertiary">
          © 2024 Skolyn AB • <a href="#" className="hover:text-text-secondary">Privacy Policy</a> • <a href="#" className="hover:text-text-secondary">Terms of Service</a>
        </div>
      </div>
    </div>
  )
}