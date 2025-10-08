'use client'

import { useState, useCallback } from 'react'
import { useStudyStore } from '@/store/studyStore'
import { Upload, File, CheckCircle, Warning, X } from 'phosphor-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

interface UploadedFile {
  id: string
  file: File
  url: string
  status: 'uploading' | 'analyzing' | 'complete' | 'error'
  uploadedAt: Date
  error?: string
}

export default function UploadPanel() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const { studies, selectStudy } = useStudyStore()

  const generateStudyFromUpload = (file: File, url: string): any => {
    return {
      id: `UPLOAD-${Date.now()}`,
      patientId: 'UPLOAD',
      patient: {
        id: 'UPLOAD',
        firstName: 'Uploaded',
        lastName: 'Study',
        mrn: `UPL${Date.now().toString().slice(-6)}`,
        dob: new Date().toISOString().split('T')[0],
        gender: 'M' as const,
      },
      studyDescription: 'Chest X-Ray, Uploaded Study',
      modality: 'XR' as const,
      studyDate: new Date().toISOString(),
      accessionNumber: `ACC${Date.now()}`,
      status: 'pending' as const,
      priority: 'routine' as const,
      views: ['Uploaded View'],
      imageUrls: [url],
    }
  }

  const processFile = useCallback(async (file: File) => {
    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      const errorFile: UploadedFile = {
        id: `file-${Date.now()}`,
        file,
        url: '',
        status: 'error',
        uploadedAt: new Date(),
        error: 'Invalid file type. Only PNG and JPG files are accepted.',
      }
      setUploadedFiles(prev => [errorFile, ...prev])
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      const errorFile: UploadedFile = {
        id: `file-${Date.now()}`,
        file,
        url: '',
        status: 'error',
        uploadedAt: new Date(),
        error: 'File size exceeds 10MB limit.',
      }
      setUploadedFiles(prev => [errorFile, ...prev])
      return
    }

    // Create blob URL
    const url = URL.createObjectURL(file)
    const uploadId = `file-${Date.now()}`

    // Add to uploaded files list
    const uploadedFile: UploadedFile = {
      id: uploadId,
      file,
      url,
      status: 'uploading',
      uploadedAt: new Date(),
    }
    setUploadedFiles(prev => [uploadedFile, ...prev])

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update to analyzing
    setUploadedFiles(prev =>
      prev.map(f => (f.id === uploadId ? { ...f, status: 'analyzing' as const } : f))
    )

    // Generate study and add to store
    const study = generateStudyFromUpload(file, url)
    useStudyStore.setState(state => ({
      studies: [study, ...state.studies],
    }))

    // Select the study to trigger analysis
    selectStudy(study.id)

    // Simulate analysis (8 seconds)
    await new Promise(resolve => setTimeout(resolve, 8000))

    // Update to complete
    setUploadedFiles(prev =>
      prev.map(f => (f.id === uploadId ? { ...f, status: 'complete' as const } : f))
    )
  }, [selectStudy])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    files.forEach(file => processFile(file))
  }, [processFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      files.forEach(file => processFile(file))
    }
  }, [processFile])

  const removeFile = useCallback((id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file?.url) {
        URL.revokeObjectURL(file.url)
      }
      return prev.filter(f => f.id !== id)
    })
  }, [])

  return (
    <div className="flex-1 bg-primary-bg overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Upload Area */}
        <div className="mb-8">
          <h2 className="text-h2 text-text-primary mb-6">Upload New Study</h2>
          
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'border-2 border-dashed rounded-lg p-12 text-center transition-colors',
              dragActive
                ? 'border-skolyn-primary bg-skolyn-primary/10'
                : 'border-border-color hover:border-text-tertiary bg-secondary-bg'
            )}
          >
            <div className="flex flex-col items-center">
              <Upload
                size={64}
                weight="thin"
                className={cn(
                  'mb-4',
                  dragActive ? 'text-skolyn-primary' : 'text-text-tertiary'
                )}
              />
              
              <h3 className="text-h4 text-text-primary mb-2">
                {dragActive ? 'Drop files here' : 'Upload Chest X-Ray Images'}
              </h3>
              
              <p className="text-body text-text-secondary mb-6">
                Drag and drop your files here, or click to browse
              </p>

              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="px-6 py-3 bg-skolyn-primary hover:bg-skolyn-light text-text-primary rounded-md transition-colors font-medium">
                  Select Files
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>

              <div className="mt-6 text-body-small text-text-tertiary space-y-1">
                <div>Accepted formats: PNG, JPG, JPEG</div>
                <div>Maximum file size: 10MB per file</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload History */}
        {uploadedFiles.length > 0 && (
          <div>
            <h3 className="text-h3 text-text-primary mb-4">Upload History (Current Session)</h3>
            
            <div className="space-y-3">
              {uploadedFiles.map(file => (
                <div
                  key={file.id}
                  className="bg-elevated-surface border border-border-color rounded-lg p-4 flex items-center gap-4"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <File size={32} className="text-text-tertiary" />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-body font-medium text-text-primary truncate">
                      {file.file.name}
                    </div>
                    <div className="text-body-small text-text-secondary">
                      {(file.file.size / 1024 / 1024).toFixed(2)} MB{' • '}{formatDate(file.uploadedAt)}
                    </div>
                    {file.error && (
                      <div className="text-body-small text-critical-red mt-1">
                        {file.error}
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3">
                    {file.status === 'uploading' && (
                      <div className="flex items-center gap-2 text-info-blue">
                        <div className="w-4 h-4 border-2 border-info-blue border-t-transparent rounded-full animate-spin" />
                        <span className="text-body-small">Uploading...</span>
                      </div>
                    )}
                    {file.status === 'analyzing' && (
                      <div className="flex items-center gap-2 text-warning-amber">
                        <div className="w-4 h-4 border-2 border-warning-amber border-t-transparent rounded-full animate-spin" />
                        <span className="text-body-small">Analyzing...</span>
                      </div>
                    )}
                    {file.status === 'complete' && (
                      <div className="flex items-center gap-2 text-success-green">
                        <CheckCircle size={20} weight="fill" />
                        <span className="text-body-small">Complete</span>
                      </div>
                    )}
                    {file.status === 'error' && (
                      <div className="flex items-center gap-2 text-critical-red">
                        <Warning size={20} weight="fill" />
                        <span className="text-body-small">Error</span>
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 hover:bg-hover-state rounded transition-colors"
                      title="Remove"
                    >
                      <X size={20} className="text-text-tertiary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-elevated-surface border border-border-color rounded-lg p-6">
          <h4 className="text-body font-semibold text-text-primary mb-3">Upload Guidelines</h4>
          <ul className="space-y-2 text-body-small text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-text-tertiary">—</span>
              <span>Upload high-quality chest X-ray images in PNG or JPG format</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-tertiary">—</span>
              <span>Ensure images are properly oriented (PA or Lateral views)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-tertiary">—</span>
              <span>AI analysis will automatically begin after upload completes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-tertiary">—</span>
              <span>Analysis typically takes 8-12 seconds per study</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-text-tertiary">—</span>
              <span>Uploaded studies are available for the current session only</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
