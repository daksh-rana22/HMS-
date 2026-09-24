import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AuthRequiredModal from '../common/AuthRequiredModal'

export default function Layout() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!search && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, search])

  const isLoginPage = pathname.startsWith('/login')

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
      <AuthRequiredModal />
    </div>
  )
}


