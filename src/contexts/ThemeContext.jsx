import { createContext, useContext, useState, useEffect } from 'react'

export const HERO_FOOTER_THEMES = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Original Medical Green',
    gradientBg: 'linear-gradient(135deg, #effcfe 0%, #afecde 100%)',
    dotColor: '#00685e',
  },
  oceanic: {
    id: 'oceanic',
    name: 'Oceanic Blue',
    description: 'Vibrant Enterprise Blue',
    gradientBg: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)',
    dotColor: '#1D61E7',
  },
  royal: {
    id: 'royal',
    name: 'Royal Indigo',
    description: 'Classy & Rich Royal Violet',
    gradientBg: 'linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)',
    dotColor: '#5850EC',
  },
  amber: {
    id: 'amber',
    name: 'Sunset Gold',
    description: 'Crisp Orange, Gold & Midnight Black',
    gradientBg: 'linear-gradient(135deg, #ffedd5 0%, #f97316 100%)',
    dotColor: '#EA580C',
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [heroTheme, setHeroTheme] = useState(() => {
    return localStorage.getItem('hms-hero-theme') || 'default'
  })

  useEffect(() => {
    localStorage.setItem('hms-hero-theme', heroTheme)
    document.documentElement.setAttribute('data-hero-theme', heroTheme)
    document.documentElement.setAttribute('data-theme', heroTheme)
  }, [heroTheme])

  return (
    <ThemeContext.Provider value={{ heroTheme, setHeroTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
