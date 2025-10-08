import { create } from 'zustand'
import { Study, Finding, mockStudies } from '@/lib/mock-data'

interface StudyState {
  studies: Study[]
  currentStudy: Study | null
  selectedView: number
  isAnalyzing: boolean
  analysisProgress: number
  comparisonMode: boolean
  priorStudy: Study | null
  searchQuery: string
  filterStatus: 'all' | 'pending' | 'in_progress' | 'completed' | 'critical'
  
  // Actions
  loadStudies: () => void
  selectStudy: (studyId: string) => void
  setSelectedView: (viewIndex: number) => void
  startAnalysis: () => Promise<void>
  toggleComparisonMode: () => void
  setSearchQuery: (query: string) => void
  setFilterStatus: (status: StudyState['filterStatus']) => void
  getFilteredStudies: () => Study[]
}

export const useStudyStore = create<StudyState>((set, get) => ({
  studies: [],
  currentStudy: null,
  selectedView: 0,
  isAnalyzing: false,
  analysisProgress: 0,
  comparisonMode: false,
  priorStudy: null,
  searchQuery: '',
  filterStatus: 'all',

  loadStudies: () => {
    set({ studies: mockStudies })
  },

  selectStudy: (studyId: string) => {
    const study = get().studies.find((s) => s.id === studyId)
    if (study) {
      set({ 
        currentStudy: study, 
        selectedView: 0,
        comparisonMode: false,
        priorStudy: null 
      })
    }
  },

  setSelectedView: (viewIndex: number) => {
    set({ selectedView: viewIndex })
  },

  startAnalysis: async () => {
    const { currentStudy, studies } = get()
    if (!currentStudy) return

    set({ isAnalyzing: true, analysisProgress: 0 })

    // Simulate AI analysis with progress updates
    const duration = 8000 // 8 seconds
    const steps = 40
    const stepDuration = duration / steps

    for (let i = 0; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, stepDuration))
      set({ analysisProgress: (i / steps) * 100 })
    }

    // Generate mock findings based on study status
    const { generateMockFindings } = await import('@/lib/mock-data')
    let findings: Finding[]
    
    if (currentStudy.status === 'critical') {
      findings = generateMockFindings('critical')
    } else if (currentStudy.id === 'ST001' || currentStudy.id === 'ST003') {
      findings = generateMockFindings('moderate')
    } else {
      findings = generateMockFindings('normal')
    }

    // Update study with findings
    const updatedStudy = { ...currentStudy, findings, status: 'completed' as const }
    const updatedStudies = studies.map((s) =>
      s.id === currentStudy.id ? updatedStudy : s
    )

    set({
      currentStudy: updatedStudy,
      studies: updatedStudies,
      isAnalyzing: false,
      analysisProgress: 100,
    })
  },

  toggleComparisonMode: () => {
    const { comparisonMode, currentStudy, studies } = get()
    
    if (!comparisonMode && currentStudy) {
      // Find a prior study for the same patient
      const priorStudy = studies.find(
        (s) => s.patientId === currentStudy.patientId && s.id !== currentStudy.id
      )
      set({ comparisonMode: true, priorStudy: priorStudy || null })
    } else {
      set({ comparisonMode: false, priorStudy: null })
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  setFilterStatus: (status) => {
    set({ filterStatus: status })
  },

  getFilteredStudies: () => {
    const { studies, searchQuery, filterStatus } = get()
    
    let filtered = studies

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((s) => s.status === filterStatus)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.patient.firstName.toLowerCase().includes(query) ||
          s.patient.lastName.toLowerCase().includes(query) ||
          s.patient.mrn.includes(query) ||
          s.accessionNumber.toLowerCase().includes(query)
      )
    }

    return filtered
  },
}))