// Mock Patient and Study Data

export interface Patient {
  id: string
  firstName: string
  lastName: string
  mrn: string
  dob: string
  gender: 'M' | 'F'
}

export interface Study {
  id: string
  patientId: string
  patient: Patient
  studyDescription: string
  modality: 'XR' | 'CT' | 'MRI' | 'US'
  studyDate: string
  accessionNumber: string
  status: 'pending' | 'in_progress' | 'completed' | 'critical'
  priority: 'routine' | 'urgent' | 'stat'
  views: string[]
  imageUrls: string[]
  priorStudyId?: string
  findings?: Finding[]
  reportedBy?: string
  reportedAt?: string
}

export interface Finding {
  pathology: string
  confidence: number
  description: string
  clinicalContext: string
  quantitativeAssessment?: string
  temporalAnalysis?: string
  differentialDiagnoses?: string[]
  similarCases?: number
  heatmapCoordinates?: HeatmapRegion[]
}

export interface HeatmapRegion {
  x: number
  y: number
  width: number
  height: number
  intensity: number
}

export const PATHOLOGIES = [
  'Atelectasis',
  'Cardiomegaly',
  'Consolidation',
  'Edema',
  'Effusion',
  'Emphysema',
  'Fibrosis',
  'Hernia',
  'Infiltration',
  'Mass',
  'Nodule',
  'Pleural Thickening',
  'Pneumonia',
  'Pneumothorax',
]

export const mockPatients: Patient[] = [
  { id: 'P001', firstName: 'Michael', lastName: 'Anderson', mrn: '12847563', dob: '1962-08-15', gender: 'M' },
  { id: 'P002', firstName: 'Sarah', lastName: 'Johnson', mrn: '12847564', dob: '1978-03-22', gender: 'F' },
  { id: 'P003', firstName: 'Robert', lastName: 'Williams', mrn: '12847565', dob: '1955-11-08', gender: 'M' },
  { id: 'P004', firstName: 'Jennifer', lastName: 'Brown', mrn: '12847566', dob: '1985-06-30', gender: 'F' },
  { id: 'P005', firstName: 'David', lastName: 'Martinez', mrn: '12847567', dob: '1970-09-12', gender: 'M' },
  { id: 'P006', firstName: 'Lisa', lastName: 'Garcia', mrn: '12847568', dob: '1992-02-18', gender: 'F' },
  { id: 'P007', firstName: 'James', lastName: 'Davis', mrn: '12847569', dob: '1948-07-25', gender: 'M' },
  { id: 'P008', firstName: 'Maria', lastName: 'Rodriguez', mrn: '12847570', dob: '1967-12-03', gender: 'F' },
  { id: 'P009', firstName: 'Thomas', lastName: 'Wilson', mrn: '12847571', dob: '1980-04-16', gender: 'M' },
  { id: 'P010', firstName: 'Patricia', lastName: 'Moore', mrn: '12847572', dob: '1973-10-29', gender: 'F' },
]

export const mockStudies: Study[] = [
  {
    id: 'ST001',
    patientId: 'P001',
    patient: mockPatients[0],
    studyDescription: 'Chest X-Ray, 2 Views (PA + Lateral)',
    modality: 'XR',
    studyDate: '2025-10-08T08:30:00Z',
    accessionNumber: 'ACC2025100801',
    status: 'critical',
    priority: 'stat',
    views: ['PA (Frontal)', 'Lateral'],
    imageUrls: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 'ST002',
    patientId: 'P002',
    patient: mockPatients[1],
    studyDescription: 'Chest X-Ray, 1 View (PA)',
    modality: 'XR',
    studyDate: '2025-10-08T09:15:00Z',
    accessionNumber: 'ACC2025100802',
    status: 'pending',
    priority: 'routine',
    views: ['PA (Frontal)'],
    imageUrls: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 'ST003',
    patientId: 'P003',
    patient: mockPatients[2],
    studyDescription: 'Chest X-Ray, 2 Views (PA + Lateral)',
    modality: 'XR',
    studyDate: '2025-10-08T10:00:00Z',
    accessionNumber: 'ACC2025100803',
    status: 'in_progress',
    priority: 'urgent',
    views: ['PA (Frontal)', 'Lateral'],
    imageUrls: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 'ST004',
    patientId: 'P004',
    patient: mockPatients[3],
    studyDescription: 'Chest X-Ray, 1 View (PA)',
    modality: 'XR',
    studyDate: '2025-10-08T10:45:00Z',
    accessionNumber: 'ACC2025100804',
    status: 'pending',
    priority: 'routine',
    views: ['PA (Frontal)'],
    imageUrls: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 'ST005',
    patientId: 'P005',
    patient: mockPatients[4],
    studyDescription: 'Chest X-Ray, 2 Views (PA + Lateral)',
    modality: 'XR',
    studyDate: '2025-10-08T11:30:00Z',
    accessionNumber: 'ACC2025100805',
    status: 'completed',
    priority: 'routine',
    views: ['PA (Frontal)', 'Lateral'],
    imageUrls: [
      'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=600&fit=crop',
    ],
    reportedBy: 'Dr. Evelyn Reed',
    reportedAt: '2025-10-08T11:45:00Z',
  },
]

export function generateMockFindings(severity: 'normal' | 'moderate' | 'critical'): Finding[] {
  if (severity === 'normal') {
    return []
  }

  if (severity === 'moderate') {
    return [
      {
        pathology: 'Pleural Effusion',
        confidence: 89,
        description: 'Accumulation of fluid in the pleural space between the lung and chest wall.',
        clinicalContext: 'Pleural effusion represents excess fluid in the pleural cavity, which can result from various etiologies including cardiac, infectious, malignant, or inflammatory processes.',
        quantitativeAssessment: '• Estimated volume: Moderate (300-500ml)\n• Distribution: Right hemithorax, basilar\n• Blunting of costophrenic angle: Present',
        temporalAnalysis: 'Compared to study from 2025-09-15:\n↑ Effusion volume increased ~15%\n⚠ Recommend follow-up imaging',
        differentialDiagnoses: [
          'Congestive heart failure',
          'Pneumonia with parapneumonic effusion',
          'Malignancy',
        ],
        similarCases: 247,
        heatmapCoordinates: [
          { x: 60, y: 60, width: 25, height: 30, intensity: 0.89 },
        ],
      },
      {
        pathology: 'Cardiomegaly',
        confidence: 76,
        description: 'Enlarged cardiac silhouette suggesting possible cardiac pathology.',
        clinicalContext: 'Cardiomegaly on chest radiograph is defined by a cardiothoracic ratio greater than 0.50 on PA view. This finding warrants clinical correlation and may require echocardiographic evaluation.',
        quantitativeAssessment: '• Cardiothoracic Ratio: 0.58\n  Normal range: <0.50\n  Interpretation: Enlarged cardiac silhouette',
        differentialDiagnoses: [
          'Dilated cardiomyopathy',
          'Valvular heart disease',
          'Pericardial effusion',
        ],
        similarCases: 512,
        heatmapCoordinates: [
          { x: 40, y: 45, width: 20, height: 25, intensity: 0.76 },
        ],
      },
      {
        pathology: 'Infiltration',
        confidence: 62,
        description: 'Patchy opacities suggesting possible inflammatory or infectious process.',
        clinicalContext: 'Pulmonary infiltrates represent filling of alveolar spaces with fluid, cells, or other material. Clinical correlation with patient symptoms is essential.',
        quantitativeAssessment: '• Location: Left lower lobe\n• Pattern: Patchy, non-segmental\n• Density: Moderate',
        differentialDiagnoses: [
          'Community-acquired pneumonia',
          'Aspiration',
          'Atypical infection',
        ],
        similarCases: 389,
        heatmapCoordinates: [
          { x: 30, y: 55, width: 15, height: 20, intensity: 0.62 },
        ],
      },
    ]
  }

  // Critical findings
  return [
    {
      pathology: 'Pneumothorax',
      confidence: 94,
      description: 'Presence of air in the pleural space indicating pneumothorax.',
      clinicalContext: 'Pneumothorax represents air in the pleural cavity, causing lung collapse. Large or tension pneumothorax requires immediate intervention. URGENT CLINICAL CORRELATION REQUIRED.',
      quantitativeAssessment: '• Size: Moderate (20-30% lung volume)\n• Location: Right apical region\n• Tension features: Not evident\n• Mediastinal shift: None observed',
      temporalAnalysis: 'No prior studies available for comparison.\n🚨 NEW FINDING - Recommend immediate clinical assessment',
      differentialDiagnoses: [
        'Spontaneous pneumothorax',
        'Traumatic pneumothorax',
        'Iatrogenic (post-procedure)',
      ],
      similarCases: 156,
      heatmapCoordinates: [
        { x: 70, y: 20, width: 18, height: 25, intensity: 0.94 },
      ],
    },
    {
      pathology: 'Consolidation',
      confidence: 81,
      description: 'Dense opacification suggesting alveolar consolidation.',
      clinicalContext: 'Consolidation indicates complete filling of alveolar air spaces, most commonly due to pneumonia but can represent other pathologies.',
      quantitativeAssessment: '• Location: Right middle lobe\n• Distribution: Lobar pattern\n• Air bronchograms: Present',
      differentialDiagnoses: [
        'Bacterial pneumonia',
        'Pulmonary hemorrhage',
        'Pulmonary edema',
      ],
      similarCases: 423,
      heatmapCoordinates: [
        { x: 55, y: 45, width: 20, height: 22, intensity: 0.81 },
      ],
    },
  ]
}