// Design System Constants - Aquapro Cleaning brand design tokens
// Single source of truth for all design values
// Color scheme: Blue (single primary color palette for consistency)

export const colors = {
  // Primary Blue - Single consistent palette
  // 600 = Main actions, 700 = Hover, 500 = CTA emphasis, 50/100 = Backgrounds
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',   // CTA / emphasis
    600: '#2563eb',   // Main action color
    700: '#1d4ed8',   // Hover
    800: '#1e40af',   // Active
    900: '#1e3a8a',
    950: '#172554',
  },
  // Neutrals - "expensive" grays
  neutral: {
    50: '#f8fafc',   // Soft bg
    100: '#f1f5f9',  // Hover bg
    200: '#e2e8f0',  // Border
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',  // Muted text
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',  // Main text
    950: '#020617',
  },
  // Semantic colors
  success: '#16a34a',
  warning: '#ca8a04',
  error: '#dc2626',
  errorHover: '#b91c1c',
} as const;

export const typography = {
  sizes: {
    sm: 'text-sm',      // 14px - small text, labels
    base: 'text-base',  // 16px - body text
    lg: 'text-lg',      // 18px - large body, subheadings
    xl: 'text-xl md:text-2xl lg:text-3xl', // Responsive headings
  },
  weights: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
} as const;

export const spacing = {
  section: 'py-16 md:py-24 lg:py-32',
  sectionCompact: 'py-12 md:py-16 lg:py-20',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
} as const;

export const transitions = {
  base: 'transition-colors duration-200 ease-out',
  slow: 'transition-colors duration-300 ease-out',
  shadow: 'transition-shadow duration-200 ease-out',
  all: 'transition-all duration-200 ease-out',
} as const;

export const shadows = {
  sm: 'shadow-sm',
  base: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

// Brand-specific design tokens
export const brand = {
  // Primary action color
  primaryColor: 'blue',
  // Gradient for hero sections
  gradient: 'bg-gradient-to-br from-primary-500 to-primary-700',
  gradientText: 'bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent',
  // Background patterns
  heroBackground: 'bg-gradient-to-b from-primary-50/50 to-white',
  ctaBackground: 'bg-primary-600',
} as const;
