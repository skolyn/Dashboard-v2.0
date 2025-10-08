# Skolyn AI Diagnostics Platform

**Phase 1: Visual Perfection MVP**

## 🎯 Overview

Skolyn is a revolutionary, clinical-grade medical imaging analysis platform that redefines how radiologists interact with AI-assisted diagnostics. This Phase 1 implementation delivers a fully functional UI/UX with mock AI analysis, designed for immediate demonstration and validation with clinical professionals.

## ✨ Features

### Complete User Journey
- **Authentication System**: Mock login with validation (email + password ≥8 chars)
- **Dashboard**: Stats overview, modality selection (X-Ray operational, others "Coming Soon")
- **X-Ray Workspace**: Professional 3-panel layout for chest radiograph analysis

### Three-Panel X-Ray Workspace
1. **Worklist Panel**: Search, filter, and select patient studies
2. **Image Viewer**: Zoom, pan, brightness/contrast controls, comparison mode
3. **AI Analysis Panel**: 
   - Mock AI analysis with 8-second realistic processing
   - 14 pathology classifications
   - Explainable AI heatmap overlays
   - Expandable findings with clinical context

### Mock Data Features
- 10 realistic patient records
- 5 chest X-ray studies with varying findings (normal, moderate, critical)
- Simulated AI confidence scores
- Temporal analysis comparisons
- Differential diagnoses

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Icons**: Phosphor Icons
- **Animations**: Framer Motion (not yet implemented but available)

## 📦 Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
yarn start
```

## 🔑 Login Credentials

**Mock Authentication** - Any valid email with password ≥8 characters will work:
- Email: `doctor@hospital.com`
- Password: `password123` (or any 8+ char password)

## 🎨 Design System

### Colors
- **Primary Background**: `#0A0A0A` (True Black)
- **Skolyn Primary**: `#030F4F` (Brand Blue)
- **Clinical Teal**: `#00A99D` (Success/Positive)
- **Critical Red**: `#DC2626` (Urgent findings)
- **Warning Amber**: `#F59E0B` (Moderate findings)

### Typography
- **Font**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (technical data)

## 🗺️ Route Structure

```
/                   → Redirects to /login
/login              → Authentication page
/dashboard          → Main dashboard with modality selection
/xray               → X-Ray analysis workspace (3-panel layout)
/worklist           → Coming soon
/analytics          → Coming soon
/settings           → Coming soon
```

## 🏗️ Project Structure

```
/app
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── xray/page.tsx
│   │   └── ...
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── xray/               # X-Ray workspace components
│   │   ├── NavigationSidebar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── store/                  # Zustand state management
│   │   ├── authStore.ts
│   │   ├── studyStore.ts
│   │   └── viewerStore.ts
│   └── lib/                    # Utilities and mock data
│       ├── utils.ts
│       └── mock-data.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🔄 Phase 2: Real Integration (Future)

When ready to add real functionality:

```javascript
const config = {
  USE_REAL_AI: true,           // Google Gemini Vision API
  USE_REAL_DICOM: true,        // Cornerstone.js integration
  USE_REAL_AUTH: true,         // NextAuth.js
  USE_REAL_DATABASE: true      // MongoDB
}
```

## 📸 Screenshots

*Coming soon - Use the app to see the beautiful UI!*

## 🎯 Key Interactions

1. **Login** → Enter any email + 8-char password
2. **Dashboard** → Click "X-Ray Analysis" card
3. **Select Study** → Click any patient from worklist
4. **Run Analysis** → Click "Run AI Analysis" button (8-second animation)
5. **View Findings** → Expandable findings with confidence scores
6. **Toggle Heatmap** → Click "Show AI Focus Area" on any finding
7. **Compare Mode** → Toggle "Compare with Prior" to see side-by-side

## 🐛 Known Limitations (Phase 1)

- No real AI analysis (mock data only)
- No actual DICOM processing (using regular images)
- No backend server (pure frontend)
- No real authentication (localStorage-based)
- No database (in-memory mock data)

## 📝 License

© 2025 Skolyn LLC - All Rights Reserved

---

**Built with ❤️ for the future of AI-assisted radiology**
