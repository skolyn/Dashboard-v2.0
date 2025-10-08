/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Foundation Colors
        'primary-bg': '#0A0A0A',
        'secondary-bg': '#121212',
        'elevated-surface': '#1E1E1E',
        'border-color': '#2A2A2A',
        'hover-state': '#252525',
        
        // Typography Colors
        'text-primary': '#FAFAFA',
        'text-secondary': '#B0B0B0',
        'text-tertiary': '#707070',
        'text-disabled': '#404040',
        
        // Brand Colors
        'skolyn-primary': '#030F4F',
        'skolyn-light': '#1E3A8A',
        'clinical-teal': '#00A99D',
        
        // Semantic Colors
        'critical-red': '#DC2626',
        'warning-amber': '#F59E0B',
        'success-green': '#059669',
        'info-blue': '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.5px' }],
        'h2': ['24px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.3px' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '-0.2px' }],
        'h4': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-large': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-small': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['11px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
}