'use client'

import { useState } from 'react'
import { useStudyStore } from '@/store/studyStore'
import { useViewerStore } from '@/store/viewerStore'
import Image from 'next/image'
import {
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsOut,
  ArrowsIn,
  ArrowCounterClockwise,
  Sliders,
  Eye,
  SplitVertical,
} from 'phosphor-react'
import { cn } from '@/lib/utils'

export default function ImageViewerPanel() {
  const { currentStudy, selectedView, setSelectedView, comparisonMode, priorStudy, toggleComparisonMode } = useStudyStore()
  const {
    zoom,
    brightness,
    contrast,
    showHeatmap,
    heatmapOpacity,
    activeHeatmapFinding,
    windowLevel,
    setZoom,
    setBrightness,
    setContrast,
    setWindowLevel,
    resetView,
  } = useViewerStore()

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  if (!currentStudy) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-center">
          <Eye size={64} className="text-text-tertiary mx-auto mb-4" />
          <p className="text-body text-text-secondary">
            Select a study from the worklist to begin
          </p>
        </div>
      </div>
    )
  }

  const currentImage = currentStudy.imageUrls[selectedView] || currentStudy.imageUrls[0]
  const priorImage = priorStudy?.imageUrls[selectedView] || priorStudy?.imageUrls[0]

  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
    transform: `scale(${zoom / 100})`,
  }

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 200))
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50))
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)

  return (
    <div className={cn('flex-1 bg-black flex flex-col', isFullscreen && 'fixed inset-0 z-50')}>
      {/* Top Toolbar */}
      <div className="bg-secondary-bg border-b border-border-color p-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* View Tabs */}
          {currentStudy.views.length > 1 && (
            <div className="flex gap-1 bg-elevated-surface rounded-md p-1">
              {currentStudy.views.map((view, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedView(index)}
                  className={cn(
                    'px-4 py-1.5 rounded text-body-small transition-colors',
                    selectedView === index
                      ? 'bg-skolyn-primary text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {view}
                </button>
              ))}
            </div>
          )}

          {/* Window/Level Presets */}
          <div className="flex gap-1 bg-elevated-surface rounded-md p-1">
            <button
              onClick={() => setWindowLevel('lung')}
              className={cn(
                'px-3 py-1.5 rounded text-body-small transition-colors',
                windowLevel === 'lung'
                  ? 'bg-skolyn-primary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              Lung
            </button>
            <button
              onClick={() => setWindowLevel('soft-tissue')}
              className={cn(
                'px-3 py-1.5 rounded text-body-small transition-colors',
                windowLevel === 'soft-tissue'
                  ? 'bg-skolyn-primary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              Soft Tissue
            </button>
            <button
              onClick={() => setWindowLevel('bone')}
              className={cn(
                'px-3 py-1.5 rounded text-body-small transition-colors',
                windowLevel === 'bone'
                  ? 'bg-skolyn-primary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              Bone
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Comparison Toggle */}
          <button
            onClick={toggleComparisonMode}
            className={cn(
              'px-4 py-2 rounded-md text-body-small transition-colors flex items-center gap-2',
              comparisonMode
                ? 'bg-skolyn-primary text-text-primary'
                : 'bg-elevated-surface text-text-secondary hover:bg-hover-state'
            )}
          >
            <SplitVertical size={18} />
            Compare with Prior
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-elevated-surface hover:bg-hover-state text-text-secondary rounded-md transition-colors"
          >
            {isFullscreen ? <ArrowsIn size={20} /> : <ArrowsOut size={20} />}
          </button>
        </div>
      </div>

      {/* Image Display Area */}
      <div 
        className="flex-1 relative overflow-hidden"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {comparisonMode && priorImage ? (
          // Split View
          <div className="flex h-full">
            <div className="flex-1 flex items-center justify-center border-r border-border-color relative">
              <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-body-small text-text-primary z-10">
                Current Study
              </div>
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src={currentImage}
                  alt="Current study"
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain transition-all duration-200"
                  style={imageStyle}
                />
                {showHeatmap && activeHeatmapFinding && (
                  <HeatmapOverlay opacity={heatmapOpacity} />
                )}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center relative">
              <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-body-small text-text-primary z-10">
                Prior Study
              </div>
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src={priorImage}
                  alt="Prior study"
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain transition-all duration-200"
                  style={imageStyle}
                />
              </div>
            </div>
          </div>
        ) : (
          // Single View
          <div className="w-full h-full flex items-center justify-center p-8 relative">
            <Image
              src={currentImage}
              alt="Medical image"
              width={1200}
              height={900}
              className="max-w-full max-h-full object-contain transition-all duration-200"
              style={imageStyle}
              priority
            />
            {showHeatmap && activeHeatmapFinding && (
              <HeatmapOverlay opacity={heatmapOpacity} />
            )}
          </div>
        )}

        {/* Floating Controls */}
        {showControls && (
          <div className="absolute bottom-6 right-6 bg-secondary-bg/95 backdrop-blur-sm border border-border-color rounded-lg p-3 space-y-3">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-elevated-surface hover:bg-hover-state text-text-secondary rounded transition-colors"
                title="Zoom Out"
              >
                <MagnifyingGlassMinus size={18} />
              </button>
              <span className="text-body-small text-text-primary w-12 text-center">
                {zoom}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-elevated-surface hover:bg-hover-state text-text-secondary rounded transition-colors"
                title="Zoom In"
              >
                <MagnifyingGlassPlus size={18} />
              </button>
            </div>

            {/* Brightness */}
            <div className="space-y-1">
              <label className="text-caption text-text-tertiary flex items-center gap-2">
                <Sliders size={14} />
                Brightness: {brightness}%
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Contrast */}
            <div className="space-y-1">
              <label className="text-caption text-text-tertiary flex items-center gap-2">
                <Sliders size={14} />
                Contrast: {contrast}%
              </label>
              <input
                type="range"
                min="50"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Reset */}
            <button
              onClick={resetView}
              className="w-full flex items-center justify-center gap-2 p-2 bg-elevated-surface hover:bg-hover-state text-text-secondary rounded transition-colors text-body-small"
            >
              <ArrowCounterClockwise size={16} />
              Reset View
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Mock Heatmap Overlay Component
function HeatmapOverlay({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: opacity / 100 }}
    >
      <div className="absolute top-[30%] right-[35%] w-32 h-40 bg-critical-red/50 rounded-full blur-3xl" />
      <div className="absolute top-[45%] right-[45%] w-24 h-32 bg-warning-amber/40 rounded-full blur-2xl" />
    </div>
  )
}