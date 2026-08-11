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
    gradientBg: 'linear-gradient(135deg, #FA991C 0%, #1C768F 100%)',
    dotColor: '#FA991C',
  },
  darkcrimson: {
    id: 'darkcrimson',
    name: 'Crimson Light',
    description: 'Hot Pink & Rose on Warm White',
    gradientBg: 'linear-gradient(135deg, #FDF4F6 0%, #EB1750 100%)',
    dotColor: '#EB1750',
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
