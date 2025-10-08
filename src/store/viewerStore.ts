import { create } from 'zustand'

interface ViewerState {
  zoom: number
  brightness: number
  contrast: number
  showHeatmap: boolean
  heatmapOpacity: number
  activeHeatmapFinding: string | null
  windowLevel: 'lung' | 'soft-tissue' | 'bone'
  
  // Actions
  setZoom: (zoom: number) => void
  setBrightness: (brightness: number) => void
  setContrast: (contrast: number) => void
  toggleHeatmap: () => void
  setHeatmapOpacity: (opacity: number) => void
  setActiveHeatmapFinding: (pathology: string | null) => void
  setWindowLevel: (level: ViewerState['windowLevel']) => void
  resetView: () => void
}

const DEFAULT_STATE = {
  zoom: 100,
  brightness: 100,
  contrast: 100,
  showHeatmap: false,
  heatmapOpacity: 50,
  activeHeatmapFinding: null,
  windowLevel: 'lung' as const,
}

export const useViewerStore = create<ViewerState>((set) => ({
  ...DEFAULT_STATE,

  setZoom: (zoom: number) => set({ zoom }),
  setBrightness: (brightness: number) => set({ brightness }),
  setContrast: (contrast: number) => set({ contrast }),
  toggleHeatmap: () => set((state) => ({ showHeatmap: !state.showHeatmap })),
  setHeatmapOpacity: (opacity: number) => set({ heatmapOpacity: opacity }),
  setActiveHeatmapFinding: (pathology: string | null) => 
    set({ activeHeatmapFinding: pathology, showHeatmap: pathology !== null }),
  setWindowLevel: (level) => {
    // Preset window/level values simulated with brightness/contrast
    const presets = {
      lung: { brightness: 100, contrast: 150 },
      'soft-tissue': { brightness: 100, contrast: 100 },
      bone: { brightness: 120, contrast: 180 },
    }
    set({ windowLevel: level, ...presets[level] })
  },
  resetView: () => set(DEFAULT_STATE),
}))