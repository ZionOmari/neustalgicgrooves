const theme = {
  colors: {
    // Primary colors - Ocean Blue theme
    primary: '#0ea5e9', // Sky blue
    primaryDark: '#0284c7',
    primaryLight: '#38bdf8',
    
    // Secondary colors - Deep teal
    secondary: '#0f766e', // Dark teal
    secondaryDark: '#134e4a',
    secondaryLight: '#14b8a6',
    
    // Accent colors - Emerald green
    accent: '#10b981', // Emerald
    accentDark: '#059669',
    accentLight: '#34d399',
    
    // Neutral colors
    background: '#f8fafc', // Very light blue-gray
    white: '#ffffff',
    black: '#000000',
    text: '#1e293b', // Dark slate
    textDark: '#0f172a',
    textLight: '#64748b',
    
    // Blue-gray scale
    gray100: '#f1f5f9',
    gray200: '#e2e8f0',
    gray300: '#cbd5e1',
    gray400: '#94a3b8',
    gray500: '#64748b',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1e293b',
    gray900: '#0f172a',
    
    // Status colors - Blue/Green theme
    success: '#22c55e', // Green
    successLight: '#f0fdf4',
    error: '#0891b2', // Changed from red to cyan
    errorLight: '#ecfeff',
    warning: '#eab308', // Yellow (keeping as it's not red)
    warningLight: '#fefce8',
    info: '#3b82f6', // Blue
    infoLight: '#eff6ff',
    
    // Additional blue/green colors
    lightGray: '#e2e8f0',
    darkGray: '#475569',
    
    // Dance-specific colors
    rhythm: '#06b6d4', // Cyan for rhythm
    groove: '#10b981', // Emerald for groove
    energy: '#3b82f6', // Blue for energy
    flow: '#14b8a6', // Teal for flow
    
    // Black accents for that street style
    blackAccent: '#000000', // Pure black
    charcoal: '#1f2937', // Dark charcoal
    slate: '#374151', // Slate gray
    shadow: '#111827', // Deep shadow
  },
  
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    mono: "'Fira Code', 'Monaco', 'Consolas', monospace",
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '4rem',    // 64px
  },
  
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeights: {
    tight: 1.2,
    base: 1.5,
    relaxed: 1.75,
  },
  
  space: {
    px: '1px',
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },
  
  sizes: {
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  
  radii: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  
  shadows: {
    small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  borderRadius: '0.5rem',
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.6s ease',
  },
  
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

export default theme; 