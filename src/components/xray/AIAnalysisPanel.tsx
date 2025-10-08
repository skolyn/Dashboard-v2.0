'use client'

import { useStudyStore } from '@/store/studyStore'
import { Brain, SpinnerGap, CheckCircle, WarningCircle, XCircle } from 'phosphor-react'
import ProgressBar from '@/components/ui/ProgressBar'
import Button from '@/components/ui/Button'
import FindingCard from './FindingCard'
import * as Accordion from '@radix-ui/react-accordion'

export default function AIAnalysisPanel() {
  const { currentStudy, isAnalyzing, analysisProgress, startAnalysis } = useStudyStore()

  if (!currentStudy) {
    return (
      <div className="w-[480px] bg-secondary-bg border-l border-border-color p-6 flex items-center justify-center">
        <div className="text-center text-text-tertiary">
          <Brain size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-body-small">Select a study to view analysis</p>
        </div>
      </div>
    )
  }

  // STATE 1: Pre-Analysis
  if (!currentStudy.findings && !isAnalyzing) {
    return (
      <div className="w-[480px] bg-secondary-bg border-l border-border-color flex flex-col">
        <div className="p-6 border-b border-border-color">
          <h2 className="text-h4 text-text-primary">AI Analysis</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 bg-skolyn-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain size={48} weight="duotone" className="text-skolyn-primary" />
            </div>
            
            <h3 className="text-h3 text-text-primary mb-2">Ready to Analyze</h3>
            <p className="text-body text-text-secondary mb-6">
              Study has been loaded. Click below to run Skolyn AI analysis.
            </p>
            
            <Button
              onClick={startAnalysis}
              variant="primary"
              size="lg"
              className="w-full mb-3"
            >
              Run AI Analysis
            </Button>
            
            <p className="text-body-small text-text-tertiary">
              Estimated time: 8-12 seconds
            </p>
            
            <div className="mt-6 p-4 bg-elevated-surface rounded-lg text-left">
              <p className="text-body-small text-text-secondary">
                <span className="font-semibold text-text-primary">Model:</span> Skolyn CXR-v3.2
              </p>
              <p className="text-body-small text-text-secondary mt-1">
                <span className="font-semibold text-text-primary">Architecture:</span> ChexNet (DenseNet-121)
              </p>
              <p className="text-body-small text-text-secondary mt-1">
                <span className="font-semibold text-text-primary">Pathologies:</span> 14 classes
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // STATE 2: Processing
  if (isAnalyzing) {
    return (
      <div className="w-[480px] bg-secondary-bg border-l border-border-color flex flex-col">
        <div className="p-6 border-b border-border-color">
          <h2 className="text-h4 text-text-primary">AI Analysis</h2>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-sm w-full">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <SpinnerGap 
                size={96} 
                weight="bold" 
                className="text-skolyn-primary animate-spin absolute inset-0" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-h4 text-text-primary">{Math.round(analysisProgress)}%</span>
              </div>
            </div>
            
            <h3 className="text-h3 text-text-primary mb-2">Analyzing Chest X-Ray...</h3>
            <p className="text-body text-text-secondary mb-6">
              Processing View {currentStudy.views.length > 1 ? '1 of 2' : '1 of 1'}: {currentStudy.views[0]}
            </p>
            
            <ProgressBar 
              value={analysisProgress} 
              max={100} 
              color="primary"
              className="mb-3"
            />
            
            <p className="text-body-small text-text-tertiary mb-6">
              Model: Skolyn CXR-v3.2 (ChexNet Architecture)
            </p>
            
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-body-small text-text-secondary">
                <CheckCircle size={16} weight="fill" className="text-success-green" />
                Image preprocessing complete
              </div>
              <div className="flex items-center gap-2 text-body-small text-text-secondary">
                <CheckCircle size={16} weight="fill" className="text-success-green" />
                Feature extraction in progress
              </div>
              <div className="flex items-center gap-2 text-body-small text-text-secondary">
                {analysisProgress > 70 ? (
                  <CheckCircle size={16} weight="fill" className="text-success-green" />
                ) : (
                  <SpinnerGap size={16} className="animate-spin text-info-blue" />
                )}
                Pathology classification
              </div>
              <div className="flex items-center gap-2 text-body-small text-text-secondary">
                {analysisProgress > 90 ? (
                  <CheckCircle size={16} weight="fill" className="text-success-green" />
                ) : (
                  <div className="w-4 h-4 border-2 border-border-color rounded-full" />
                )}
                Generating explainable AI heatmaps
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // STATE 3: Results Display
  const findings = currentStudy.findings || []
  const highConfidenceFindings = findings.filter((f) => f.confidence >= 30)
  const lowConfidenceFindings = findings.filter((f) => f.confidence < 30)
  const hasFindings = highConfidenceFindings.length > 0
  const hasCriticalFindings = findings.some((f) => f.confidence >= 85)

  return (
    <div className="w-[480px] bg-secondary-bg border-l border-border-color flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border-color">
        <h2 className="text-h4 text-text-primary">AI Analysis Results</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Summary Banner */}
        <div className="p-6">
          {!hasFindings ? (
            <div className="bg-success-green/10 border-l-4 border-success-green p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <CheckCircle size={24} weight="fill" className="text-success-green flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-body font-semibold text-success-green mb-1">
                    NORMAL STUDY
                  </h3>
                  <p className="text-body-small text-text-secondary">
                    No significant pathological findings detected across all 14 pathology classes.
                  </p>
                  <p className="text-body-small text-text-tertiary mt-2">
                    Overall Confidence: 94%
                  </p>
                </div>
              </div>
            </div>
          ) : hasCriticalFindings ? (
            <div className="bg-critical-red/10 border-l-4 border-critical-red p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <WarningCircle size={24} weight="fill" className="text-critical-red flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-body font-semibold text-critical-red mb-1">
                    CRITICAL FINDING
                  </h3>
                  <p className="text-body-small text-text-secondary">
                    Potential {findings.find((f) => f.confidence >= 85)?.pathology} detected with high confidence.
                  </p>
                  <p className="text-body-small text-critical-red font-semibold mt-2">
                    IMMEDIATE REVIEW RECOMMENDED
                  </p>
                  <p className="text-caption text-text-tertiary mt-1">
                    Alert sent to attending physician at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-warning-amber/10 border-l-4 border-warning-amber p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <WarningCircle size={24} weight="fill" className="text-warning-amber flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-body font-semibold text-warning-amber mb-1">
                    FINDINGS DETECTED
                  </h3>
                  <p className="text-body-small text-text-secondary">
                    AI has identified {highConfidenceFindings.length} potential {highConfidenceFindings.length === 1 ? 'pathology' : 'pathologies'} requiring review.
                  </p>
                  <p className="text-body-small text-text-tertiary mt-2">
                    Highest confidence: {findings[0]?.pathology} ({findings[0]?.confidence}%)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Findings */}
        {hasFindings && (
          <div className="px-6 pb-6">
            <h3 className="text-body font-semibold text-text-primary mb-4">
              Detailed Findings ({highConfidenceFindings.length})
            </h3>
            
            <Accordion.Root type="multiple" className="space-y-3">
              {highConfidenceFindings.map((finding, index) => (
                <FindingCard key={index} finding={finding} defaultOpen={finding.confidence >= 70} />
              ))}
            </Accordion.Root>

            {/* Low Confidence Findings */}
            {lowConfidenceFindings.length > 0 && (
              <div className="mt-6">
                <Accordion.Root type="single" collapsible>
                  <Accordion.Item value="low-confidence" className="border border-border-color rounded-lg">
                    <Accordion.Trigger className="flex items-center justify-between w-full p-4 text-left hover:bg-hover-state transition-colors rounded-lg">
                      <div>
                        <span className="text-body text-text-secondary">
                          ▶ Other Evaluated Pathologies ({lowConfidenceFindings.length} findings {'<'}30%)
                        </span>
                      </div>
                    </Accordion.Trigger>
                    <Accordion.Content className="px-4 pb-4">
                      <div className="space-y-2 pt-2">
                        {lowConfidenceFindings.map((finding, index) => (
                          <div key={index} className="text-body-small text-text-tertiary">
                            {finding.pathology} ({finding.confidence}%)
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </Accordion.Root>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-border-color space-y-3">
        <Button variant="primary" size="lg" className="w-full">
          Generate Structured Report
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="md" className="w-full">
            Request Second Opinion
          </Button>
          <Button variant="secondary" size="md" className="w-full">
            Export as PDF
          </Button>
        </div>
        <Button variant="tertiary" size="sm" className="w-full">
          Flag for Teaching File
        </Button>
      </div>
    </div>
  )
}