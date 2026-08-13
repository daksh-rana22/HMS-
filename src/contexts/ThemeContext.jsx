import { createContext, useContext, useState, useEffect } from 'react'

export const HERO_FOOTER_THEMES = {
  default: {
    id: 'default',
    name: 'Clinical Teal & Emerald',
    description: 'Original Enterprise Medical Green',
    gradientBg: 'linear-gradient(135deg, #00685e 0%, #0284c7 50%, #059669 100%)',
    dotColor: '#00685e',
  },
  oceanic: {
    id: 'oceanic',
    name: 'Turquoise & Aquamarine',
    description: 'Vivid Teal, Electric Cerulean & Emerald',
    gradientBg: 'linear-gradient(135deg, #0D9488 0%, #0284C7 50%, #10B981 100%)',
    dotColor: '#0D9488',
  },
  thinker: {
    id: 'thinker',
    name: 'Jade Teal & Coral Rose',
    description: 'Vivid Jade Teal, Electric Coral & Porcelain',
    gradientBg: 'linear-gradient(135deg, #0F766E 0%, #F43F5E 100%)',
    dotColor: '#0F766E',
  },
  dreamy: {
    id: 'dreamy',
    name: 'Dreamy Skies',
    description: 'Electric Sky Blue & Lavender Violet',
    gradientBg: 'linear-gradient(135deg, #0284C7 0%, #6366F1 50%, #8B5CF6 100%)',
    dotColor: '#0284C7',
  },
  amberteal: {
    id: 'amberteal',
    name: 'Fiery Amber & Ocean Teal',
    description: 'Vivid Tangerine Orange & Ocean Teal',
    gradientBg: 'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #0D9488 100%)',
    dotColor: '#EA580C',
  },
  darkcrimson: {
    id: 'darkcrimson',
    name: 'Electric Amethyst',
    description: 'Vivid Amethyst Purple, Cyber Violet & Ice Lavender',
    gradientBg: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #EC4899 100%)',
    dotColor: '#8B5CF6',
  },
  embers: {
    id: 'embers',
    name: 'Twilight Embers',
    description: 'Deep Indigo, Vivid Magenta & Coral',
    gradientBg: 'linear-gradient(135deg, #4338CA 0%, #F43F5E 50%, #FB923C 100%)',
    dotColor: '#4338CA',
  },
  cerulean: {
    id: 'cerulean',
    name: 'Cerulean & Amber',
    description: 'Cerulean Ocean & Golden Amber',
    gradientBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 50%, #F59E0B 100%)',
    dotColor: '#0284C7',
  },
  burgundyteal: {
    id: 'burgundyteal',
    name: 'Burgundy & Teal',
    description: 'Royal Burgundy & Peacock Teal',
    gradientBg: 'linear-gradient(135deg, #881337 0%, #0F766E 60%, #D97706 100%)',
    dotColor: '#881337',
  },
  navygold: {
    id: 'navygold',
    name: 'Imperial Navy & Gold',
    description: 'Vivid Royal Indigo, Liquid Gold & Platinum',
    gradientBg: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #D97706 100%)',
    dotColor: '#1E3A8A',
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
