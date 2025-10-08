'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import WorklistPanel from '@/components/xray/WorklistPanel'
import UploadPanel from '@/components/xray/UploadPanel'
import ImageViewerPanel from '@/components/xray/ImageViewerPanel'
import AIAnalysisPanel from '@/components/xray/AIAnalysisPanel'
import { Upload as UploadIcon, ListChecks } from 'phosphor-react'
import { cn } from '@/lib/utils'

export default function XRayWorkspacePage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'worklist'>('upload')

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-primary-bg overflow-hidden">
        {/* Left Panel: Tabs for Upload/Worklist */}
        <div className="w-80 bg-secondary-bg border-r border-border-color flex flex-col">
          {/* Tabs Header */}
          <div className="flex border-b border-border-color">
            <button
              onClick={() => setActiveTab('upload')}
              className={cn(
                'flex-1 px-4 py-3 text-body font-medium transition-colors flex items-center justify-center gap-2',
                activeTab === 'upload'
                  ? 'bg-skolyn-primary text-text-primary border-b-2 border-skolyn-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-hover-state'
              )}
            >
              <UploadIcon size={18} weight={activeTab === 'upload' ? 'fill' : 'regular'} />
              Upload
            </button>
            <button
              onClick={() => setActiveTab('worklist')}
              className={cn(
                'flex-1 px-4 py-3 text-body font-medium transition-colors flex items-center justify-center gap-2',
                activeTab === 'worklist'
                  ? 'bg-skolyn-primary text-text-primary border-b-2 border-skolyn-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-hover-state'
              )}
            >
              <ListChecks size={18} weight={activeTab === 'worklist' ? 'fill' : 'regular'} />
              Worklist
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'upload' && <UploadPanel />}
            {activeTab === 'worklist' && <WorklistPanel />}
          </div>
        </div>

        {/* Center Panel: Image Viewer */}
        <ImageViewerPanel />

        {/* Right Panel: AI Analysis */}
        <AIAnalysisPanel />
      </div>
    </ProtectedRoute>
  )
}