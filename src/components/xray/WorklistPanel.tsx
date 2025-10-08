'use client'

import { useEffect } from 'react'
import { useStudyStore } from '@/store/studyStore'
import { formatDate, calculateAge } from '@/lib/utils'
import { MagnifyingGlass, FunnelSimple, Clock, CheckCircle, WarningCircle, Heartbeat } from 'phosphor-react'
import { cn } from '@/lib/utils'

export default function WorklistPanel() {
  const {
    loadStudies,
    selectStudy,
    currentStudy,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    getFilteredStudies,
  } = useStudyStore()

  useEffect(() => {
    loadStudies()
  }, [loadStudies])

  const filteredStudies = getFilteredStudies()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} weight="fill" className="text-warning-amber" />
      case 'in_progress':
        return <Heartbeat size={16} weight="fill" className="text-info-blue" />
      case 'completed':
        return <CheckCircle size={16} weight="fill" className="text-success-green" />
      case 'critical':
        return <WarningCircle size={16} weight="fill" className="text-critical-red" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending AI Analysis'
      case 'in_progress':
        return 'AI Analysis Complete - Ready for Review'
      case 'completed':
        return 'Report Signed'
      case 'critical':
        return 'Critical Finding Detected'
      default:
        return status
    }
  }

  const getPriorityBadge = (priority: string) => {
    if (priority === 'stat') {
      return (
        <span className="px-2 py-0.5 bg-critical-red/20 text-critical-red text-caption font-semibold rounded">
          STAT
        </span>
      )
    }
    if (priority === 'urgent') {
      return (
        <span className="px-2 py-0.5 bg-warning-amber/20 text-warning-amber text-caption font-semibold rounded">
          URGENT
        </span>
      )
    }
    return null
  }

  return (
    <div className="w-80 h-full bg-secondary-bg border-r border-border-color flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-color">
        <h2 className="text-h4 text-text-primary mb-4">Worklist</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <MagnifyingGlass 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" 
          />
          <input
            type="text"
            placeholder="Search Patient ID, Name, Accession #"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-elevated-surface border border-border-color rounded-md text-body-small text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-skolyn-light"
          />
        </div>

        {/* Filter & Sort */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FunnelSimple 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" 
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full pl-9 pr-3 py-2 bg-elevated-surface border border-border-color rounded-md text-body-small text-text-primary focus:outline-none focus:border-skolyn-light appearance-none cursor-pointer"
            >
              <option value="all">All Studies</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Study List */}
      <div className="flex-1 overflow-y-auto">
        {filteredStudies.length === 0 ? (
          <div className="p-4 text-center text-body-small text-text-tertiary">
            No studies found
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {filteredStudies.map((study) => {
              const isSelected = currentStudy?.id === study.id
              const patient = study.patient
              const age = calculateAge(patient.dob)
              
              return (
                <button
                  key={study.id}
                  onClick={() => selectStudy(study.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-colors',
                    isSelected
                      ? 'bg-skolyn-primary/20 border-skolyn-primary'
                      : 'bg-elevated-surface border-border-color hover:bg-hover-state'
                  )}
                >
                  {/* Status & Priority */}
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(study.status)}
                    <span className="text-caption text-text-tertiary flex-1">
                      {getStatusText(study.status)}
                    </span>
                    {getPriorityBadge(study.priority)}
                  </div>

                  {/* Patient Name */}
                  <div className="text-body font-semibold text-text-primary mb-1">
                    {patient.lastName.toUpperCase()}, {patient.firstName}
                  </div>

                  {/* Patient Details */}
                  <div className="text-body-small text-text-secondary space-y-0.5">
                    <div>MRN: {patient.mrn} | DOB: {patient.dob}</div>
                    <div>{age} years old • {patient.gender === 'M' ? 'Male' : 'Female'}</div>
                  </div>

                  {/* Study Details */}
                  <div className="text-body-small text-text-primary mt-2 mb-1">
                    {study.studyDescription}
                  </div>
                  <div className="text-caption text-text-tertiary">
                    {formatDate(study.studyDate)}
                  </div>
                  <div className="text-caption text-text-tertiary">
                    Acc#: {study.accessionNumber}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border-color">
        <div className="text-body-small text-text-secondary">
          Showing <span className="text-text-primary font-semibold">{filteredStudies.length}</span> studies
        </div>
      </div>
    </div>
  )
}