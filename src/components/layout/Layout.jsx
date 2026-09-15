import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ThemeChanger from '../ui/ThemeChanger'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  const isLoginPage = pathname.startsWith('/login')

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
      <ThemeChanger />
    </div>
  )
}


