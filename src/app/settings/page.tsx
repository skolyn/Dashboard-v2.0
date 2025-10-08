'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import NavigationSidebar from '@/components/NavigationSidebar'

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-primary-bg">
        <NavigationSidebar />
        <main className="flex-1 overflow-auto p-8">
          <h1 className="text-h1 text-text-primary">Settings</h1>
          <p className="text-body text-text-secondary mt-2">Coming soon...</p>
        </main>
      </div>
    </ProtectedRoute>
  )
}