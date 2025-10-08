'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import WorklistPanel from '@/components/xray/WorklistPanel'
import ImageViewerPanel from '@/components/xray/ImageViewerPanel'
import AIAnalysisPanel from '@/components/xray/AIAnalysisPanel'

export default function XRayWorkspacePage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-primary-bg overflow-hidden">
        {/* Panel 1: Worklist Sidebar */}
        <WorklistPanel />

        {/* Panel 2: Image Viewer */}
        <ImageViewerPanel />

        {/* Panel 3: AI Analysis */}
        <AIAnalysisPanel />
      </div>
    </ProtectedRoute>
  )
}