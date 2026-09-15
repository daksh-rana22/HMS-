import { createContext, useContext, useState, useEffect } from 'react'

export const HERO_FOOTER_THEMES = {
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
  const [heroTheme, setHeroTheme] = useState('navygold')

  useEffect(() => {
    try {
      localStorage.setItem('hms-hero-theme', 'navygold')
    } catch (e) {}
    document.documentElement.setAttribute('data-hero-theme', 'navygold')
    document.documentElement.setAttribute('data-theme', 'navygold')
  }, [])

  return (
    <ThemeContext.Provider value={{ heroTheme: 'navygold', setHeroTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return { heroTheme: 'navygold', setHeroTheme: () => {} }
  }
  return ctx
}
