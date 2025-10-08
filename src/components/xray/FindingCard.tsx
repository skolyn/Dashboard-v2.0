'use client'

import { Finding } from '@/lib/mock-data'
import { getConfidenceColor, getConfidenceBgColor, getConfidenceLabel } from '@/lib/utils'
import { useViewerStore } from '@/store/viewerStore'
import * as Accordion from '@radix-ui/react-accordion'
import { Eye, CaretDown } from 'phosphor-react'
import { cn } from '@/lib/utils'

interface FindingCardProps {
  finding: Finding
  defaultOpen?: boolean
}

export default function FindingCard({ finding, defaultOpen = false }: FindingCardProps) {
  const { setActiveHeatmapFinding, activeHeatmapFinding } = useViewerStore()
  
  const isHeatmapActive = activeHeatmapFinding === finding.pathology
  
  const handleToggleHeatmap = () => {
    if (isHeatmapActive) {
      setActiveHeatmapFinding(null)
    } else {
      setActiveHeatmapFinding(finding.pathology)
    }
  }

  return (
    <Accordion.Item
      value={finding.pathology}
      className={cn(
        'border rounded-lg transition-colors',
        finding.confidence >= 70
          ? 'border-critical-red/30 bg-critical-red/5'
          : finding.confidence >= 50
          ? 'border-warning-amber/30 bg-warning-amber/5'
          : 'border-border-color bg-elevated-surface'
      )}
    >
      <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-hover-state/50 transition-colors rounded-t-lg group">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-body font-semibold text-text-primary">
              {finding.pathology}
            </h4>
            <CaretDown
              size={18}
              className="text-text-tertiary group-data-[state=open]:rotate-180 transition-transform"
            />
          </div>
          
          {/* Confidence Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="relative h-2 bg-secondary-bg rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all',
                    finding.confidence >= 70
                      ? 'bg-critical-red'
                      : finding.confidence >= 50
                      ? 'bg-warning-amber'
                      : 'bg-text-tertiary'
                  )}
                  style={{ width: `${finding.confidence}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('text-body font-semibold', getConfidenceColor(finding.confidence))}>
                {finding.confidence}%
              </span>
              <span className={cn('text-caption', getConfidenceColor(finding.confidence))}>
                {getConfidenceLabel(finding.confidence)}
              </span>
            </div>
          </div>
        </div>
      </Accordion.Trigger>

      <Accordion.Content className="px-4 pb-4 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="pt-2 space-y-4">
          {/* Show AI Focus Button */}
          {finding.heatmapCoordinates && finding.heatmapCoordinates.length > 0 && (
            <button
              onClick={handleToggleHeatmap}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-body-small font-medium transition-colors',
                isHeatmapActive
                  ? 'bg-skolyn-primary text-text-primary'
                  : 'bg-elevated-surface text-text-secondary hover:bg-hover-state'
              )}
            >
              <Eye size={18} weight={isHeatmapActive ? 'fill' : 'regular'} />
              {isHeatmapActive ? 'Hide AI Focus Area' : 'Show AI Focus Area on Image'}
            </button>
          )}

          {/* Clinical Context */}
          <div>
            <h5 className="text-body-small font-semibold text-text-primary mb-1">
              Clinical Context:
            </h5>
            <p className="text-body-small text-text-secondary leading-relaxed">
              {finding.clinicalContext}
            </p>
          </div>

          {/* Quantitative Assessment */}
          {finding.quantitativeAssessment && (
            <div>
              <h5 className="text-body-small font-semibold text-text-primary mb-1">
                Quantitative Assessment:
              </h5>
              <div className="text-body-small text-text-secondary whitespace-pre-line leading-relaxed">
                {finding.quantitativeAssessment}
              </div>
            </div>
          )}

          {/* Temporal Analysis */}
          {finding.temporalAnalysis && (
            <div className="bg-info-blue/10 border border-info-blue/20 rounded-lg p-3">
              <h5 className="text-body-small font-semibold text-info-blue mb-1">
                Temporal Analysis:
              </h5>
              <div className="text-body-small text-text-secondary whitespace-pre-line leading-relaxed">
                {finding.temporalAnalysis}
              </div>
            </div>
          )}

          {/* Differential Diagnoses */}
          {finding.differentialDiagnoses && finding.differentialDiagnoses.length > 0 && (
            <div>
              <h5 className="text-body-small font-semibold text-text-primary mb-2">
                Differential Diagnoses:
              </h5>
              <ul className="space-y-1">
                {finding.differentialDiagnoses.map((diagnosis, index) => (
                  <li key={index} className="text-body-small text-text-secondary flex items-start gap-2">
                    <span className="text-text-tertiary">•</span>
                    {diagnosis}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Similar Cases */}
          {finding.similarCases && (
            <div className="pt-2 border-t border-border-color">
              <a
                href="#"
                className="text-body-small text-clinical-teal hover:underline flex items-center gap-1"
              >
                View {finding.similarCases} Similar Cases in Database →
              </a>
            </div>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}