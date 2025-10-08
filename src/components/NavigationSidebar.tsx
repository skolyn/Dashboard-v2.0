'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { 
  SquaresFour, 
  ListChecks, 
  ChartBar, 
  Gear, 
  SignOut,
  User 
} from 'phosphor-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: SquaresFour },
  { href: '/worklist', label: 'Worklist', icon: ListChecks },
  { href: '/analytics', label: 'Analytics', icon: ChartBar },
  { href: '/settings', label: 'Settings', icon: Gear },
]

export default function NavigationSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <aside className="w-60 h-screen bg-secondary-bg border-r border-border-color flex flex-col">
      {/* Logo & Organization */}
      <div className="p-6 border-b border-border-color">
        <div className="text-2xl font-bold text-text-primary mb-2">SKOLYN</div>
        <div className="text-body-small text-text-secondary">
          {user?.organization || 'Medical Center'}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-md text-body transition-colors group',
                isActive
                  ? 'bg-skolyn-primary text-text-primary'
                  : 'text-text-secondary hover:bg-hover-state hover:text-text-primary'
              )}
            >
              <Icon 
                size={20} 
                weight={isActive ? 'fill' : 'regular'}
                className={cn(
                  'transition-colors',
                  isActive ? 'text-text-primary' : 'text-text-tertiary group-hover:text-text-primary'
                )}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-border-color">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 bg-skolyn-primary rounded-full flex items-center justify-center">
            <User size={20} weight="fill" className="text-text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-body font-medium text-text-primary truncate">
              {user?.name || 'User'}
            </div>
            <div className="text-body-small text-text-tertiary truncate">
              {user?.role || 'Role'}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-md text-body text-text-secondary hover:bg-hover-state hover:text-critical-red transition-colors w-full"
        >
          <SignOut size={20} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  )
}