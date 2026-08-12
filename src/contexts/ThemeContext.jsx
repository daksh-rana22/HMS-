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
  thinker: {
    id: 'thinker',
    name: 'Thinker Light',
    description: 'Teal, Rose & Warm Neutrals',
    gradientBg: 'linear-gradient(135deg, #e8f3f3 0%, #DA7B93 100%)',
    dotColor: '#376E6F',
  },
  dreamy: {
    id: 'dreamy',
    name: 'Dreamy Skies',
    description: 'Sky Blue, Lavender & Deep Slate',
    gradientBg: 'linear-gradient(135deg, #A0D2EB 0%, #D0BDF4 100%)',
    dotColor: '#A0D2EB',
  },
  amberteal: {
    id: 'amberteal',
    name: 'Amber Teal',
    description: 'Warm Orange, Deep Teal & Navy',
    gradientBg: 'linear-gradient(135deg, #C96B12 0%, #E07F28 50%, #1C768F 100%)',
    dotColor: '#C96B12',
  },
  darkcrimson: {
    id: 'darkcrimson',
    name: 'Crimson Light',
    description: 'Hot Pink & Rose on Warm White',
    gradientBg: 'linear-gradient(135deg, #FDF4F6 0%, #EB1750 100%)',
    dotColor: '#EB1750',
  },
  embers: {
    id: 'embers',
    name: 'Embers',
    description: 'Deep Indigo, Mauve, Coral & Peach',
    gradientBg: 'linear-gradient(135deg, #41436A 0%, #984063 40%, #F64668 75%, #FE9677 100%)',
    dotColor: '#FE9677',
  },
  cerulean: {
    id: 'cerulean',
    name: 'Cerulean',
    description: 'Cerulean Blue & Mustard on Soft Sky',
    gradientBg: 'linear-gradient(135deg, #EEF6FB 0%, #CCE4F2 35%, #217CA3 70%, #E29930 100%)',
    dotColor: '#217CA3',
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
