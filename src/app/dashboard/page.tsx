'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import NavigationSidebar from '@/components/NavigationSidebar'
import { useAuthStore } from '@/store/authStore'
import { formatDateLong } from '@/lib/utils'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { 
  X, 
  ComputerTower, 
  Scan, 
  CircleWavyWarning 
} from 'phosphor-react'

export default function DashboardPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const currentDate = new Date()

  const stats = [
    { label: 'Pending Studies', value: '23', sublabel: 'studies' },
    { label: "Today's Analyzed", value: '47', sublabel: 'studies' },
    { label: 'Flagged for Review', value: '3', sublabel: 'critical' },
    { label: 'Average Report Time', value: '4.2', sublabel: 'min' },
  ]

  const modalities = [
    {
      id: 'xray',
      title: 'X-Ray Analysis',
      subtitle: 'Chest, Skeletal, Abdominal Radiography',
      badge: '14 Pathologies Detected',
      status: 'operational',
      icon: X,
      route: '/xray',
      active: true,
    },
    {
      id: 'ct',
      title: 'CT Imaging',
      subtitle: 'Brain, Chest, Abdomen, Angiography',
      badge: 'Coming Q1 2025',
      status: 'development',
      icon: ComputerTower,
      route: null,
      active: false,
    },
    {
      id: 'mri',
      title: 'MRI Studies',
      subtitle: 'Neuro, MSK, Body, Cardiac',
      badge: 'Coming Q2 2025',
      status: 'development',
      icon: Scan,
      route: null,
      active: false,
    },
    {
      id: 'ultrasound',
      title: 'Ultrasound',
      subtitle: 'Abdominal, Vascular, Obstetric, MSK',
      badge: 'Coming Q2 2025',
      status: 'development',
      icon: CircleWavyWarning,
      route: null,
      active: false,
    },
  ]

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-primary-bg">
        <NavigationSidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-h1 text-text-primary mb-2">
                Welcome back, {user?.name?.split(' ')[1] || 'Doctor'}
              </h1>
              <p className="text-body text-text-secondary">
                {formatDateLong(currentDate)} • {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <div className="text-h1 text-text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-body text-text-secondary mb-1">
                    {stat.label}
                  </div>
                  <div className="text-body-small text-text-tertiary">
                    {stat.sublabel}
                  </div>
                </Card>
              ))}
            </div>

            {/* Modality Selection */}
            <div className="mb-8">
              <h2 className="text-h2 text-text-primary mb-6">
                Imaging Modalities
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modalities.map((modality) => {
                  const Icon = modality.icon
                  
                  return (
                    <Card
                      key={modality.id}
                      hover={modality.active}
                      onClick={() => modality.active && modality.route && router.push(modality.route)}
                      className={`relative ${!modality.active && 'opacity-50 cursor-not-allowed'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${modality.active ? 'bg-skolyn-primary' : 'bg-elevated-surface'}`}>
                          <Icon 
                            size={32} 
                            weight="duotone"
                            className={modality.active ? 'text-text-primary' : 'text-text-tertiary'} 
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-h4 text-text-primary">
                              {modality.title}
                            </h3>
                            {modality.status === 'operational' ? (
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-success-green rounded-full animate-pulse" />
                                <span className="text-body-small text-success-green">Operational</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-warning-amber rounded-full" />
                                <span className="text-body-small text-warning-amber">In Development</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-body text-text-secondary mb-3">
                            {modality.subtitle}
                          </p>
                          
                          <Badge variant={modality.active ? 'success' : 'warning'}>
                            {modality.badge}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-elevated-surface border border-border-color rounded-lg p-6">
              <h3 className="text-h4 text-text-primary mb-4">Quick Start</h3>
              <p className="text-body text-text-secondary mb-4">
                Click on the <span className="font-semibold text-text-primary">X-Ray Analysis</span> card above to begin analyzing chest radiographs with AI-powered diagnostic assistance.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push('/xray')}
                  className="px-6 py-3 bg-skolyn-primary hover:bg-skolyn-light text-text-primary rounded-md transition-colors font-medium"
                >
                  Start X-Ray Analysis
                </button>
                <button className="px-6 py-3 bg-transparent border border-border-color hover:border-text-tertiary text-text-primary rounded-md transition-colors font-medium">
                  View Worklist
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}