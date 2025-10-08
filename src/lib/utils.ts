import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateLong(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function calculateAge(dob: string): number {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 70) return 'text-critical-red'
  if (confidence >= 30) return 'text-warning-amber'
  return 'text-text-tertiary'
}

export function getConfidenceBgColor(confidence: number): string {
  if (confidence >= 70) return 'bg-critical-red/10'
  if (confidence >= 30) return 'bg-warning-amber/10'
  return 'bg-elevated-surface'
}

export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 70) return 'High'
  if (confidence >= 50) return 'Moderate'
  if (confidence >= 30) return 'Low'
  return 'Minimal'
}