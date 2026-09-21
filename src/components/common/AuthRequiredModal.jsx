import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutAdmin } from '../../services/auth.service'

/**
 * Card Popup Modal displayed when an API returns 401 or "Authorization header is missing" (Error 1004)
 */
export default function AuthRequiredModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [authErrorDetails, setAuthErrorDetails] = useState({
    message: 'Authorization header is missing or session has expired.',
    errorCode: 1004,
    path: '/it/api/v1/omedo/demo-requests',
  })

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleUnauthorized = (e) => {
      const detail = e.detail || {}
      setAuthErrorDetails({
        message: detail.message || 'Authorization header is missing. Please log in again to continue.',
        errorCode: detail.errorCode || 1004,
        path: detail.path || detail.endpoint || '/it/api/v1/omedo/demo-requests',
      })
      setIsOpen(true)
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)
    window.addEventListener('omedo:session_expired', handleUnauthorized)

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
      window.removeEventListener('omedo:session_expired', handleUnauthorized)
    }
  }, [])

  const handleLoginRedirect = () => {
    logoutAdmin()
    setIsOpen(false)
    if (location.pathname !== '/login') {
      navigate('/login')
    } else {
      // Trigger a page state reset if already on /login
      window.dispatchEvent(new Event('auth:logout_reset'))
    }
  }

  const handleDismiss = () => {
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Card Pop-up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10 p-6 sm:p-7 text-center"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Accent Pill */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
              <span className="material-symbols-outlined text-3xl font-bold">
                lock_clock
              </span>
            </div>

            {/* Error Code Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Error {authErrorDetails.errorCode}: Authorization Required</span>
            </div>

            {/* Heading */}
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              Please Log In Again
            </h3>

            {/* Explanatory Message */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {authErrorDetails.message || 'The authorization header is missing or your session token has expired. Please sign in again with your admin credentials to access this service.'}
            </p>

            {/* Target Path Endpoint Badge */}
            {authErrorDetails.path && (
              <div className="mb-6 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 font-mono text-left truncate flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-slate-400 shrink-0">api</span>
                <span className="truncate">{authErrorDetails.path}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleDismiss}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleLoginRedirect}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                style={{ backgroundColor: 'var(--t-primary, #00685e)' }}
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span>Log In Now</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
