import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ThemeChanger from '../ui/ThemeChanger'
import GlobalCursorGlow from '../common/GlobalCursorGlow'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global cursor-following glow — covers all pages */}
      <GlobalCursorGlow />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ThemeChanger />
    </div>
  )
}
