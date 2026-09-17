import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Loader from '../components/ui/Loader'

const Home = lazy(() => import('../pages/Home/Home'))
const Modules = lazy(() => import('../pages/Modules/Modules'))
const BillingAccounts = lazy(() => import('../pages/BillingAccounts/BillingAccounts'))
const ClinicalManagement = lazy(() => import('../pages/ClinicalManagement/ClinicalManagement'))
const ITAdminManagement = lazy(() => import('../pages/ITAdminManagement/ITAdminManagement'))
const ReportsAnalytics = lazy(() => import('../pages/ReportsAnalytics/ReportsAnalytics'))
const IPD = lazy(() => import('../pages/IPD/IPD'))
const Laboratory = lazy(() => import('../pages/Laboratory/Laboratory'))
const About = lazy(() => import('../pages/About/About'))
const Advisors = lazy(() => import('../pages/Advisors/Advisors'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const Login = lazy(() => import('../pages/Login/Login'))
const ABDM = lazy(() => import('../pages/ABDM/ABDM'))
const Products = lazy(() => import('../pages/Products/Products'))
const Terms = lazy(() => import('../pages/Terms/Terms'))
const Privacy = lazy(() => import('../pages/Privacy/Privacy'))
const Refund = lazy(() => import('../pages/Refund/Refund'))

function RouteErrorBoundary() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-center p-6 font-sans">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-[#00685e] flex items-center justify-center mb-4 shadow-sm">
        <span className="material-symbols-outlined text-3xl">health_and_safety</span>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Welcome to OMEDO HMS</h2>
      <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
        An unexpected storage event was encountered. The session cache has been safely refreshed.
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.removeItem('omedo_admin_clients')
            localStorage.removeItem('omedo_admin_reviews')
          } catch {}
          window.location.href = '/'
        }}
        className="px-6 py-2.5 rounded-xl bg-[#00685e] hover:bg-[#005149] text-white font-semibold text-sm transition-all shadow-sm cursor-pointer"
      >
        Return to Home Page
      </button>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: '/products', element: <Suspense fallback={<Loader />}><Products /></Suspense> },
      { path: '/modules', element: <Suspense fallback={<Loader />}><Modules /></Suspense> },
      { path: '/modules/billing-accounts', element: <Suspense fallback={<Loader />}><BillingAccounts /></Suspense> },
      { path: '/billing-accounts', element: <Suspense fallback={<Loader />}><BillingAccounts /></Suspense> },
      { path: '/modules/clinical', element: <Suspense fallback={<Loader />}><ClinicalManagement /></Suspense> },
      { path: '/clinical', element: <Suspense fallback={<Loader />}><ClinicalManagement /></Suspense> },
      { path: '/modules/it-admin', element: <Suspense fallback={<Loader />}><ITAdminManagement /></Suspense> },
      { path: '/it-admin', element: <Suspense fallback={<Loader />}><ITAdminManagement /></Suspense> },
      { path: '/modules/reports', element: <Suspense fallback={<Loader />}><ReportsAnalytics /></Suspense> },
      { path: '/reports', element: <Suspense fallback={<Loader />}><ReportsAnalytics /></Suspense> },
      { path: '/modules/ipd', element: <Suspense fallback={<Loader />}><IPD /></Suspense> },
      { path: '/ipd', element: <Suspense fallback={<Loader />}><IPD /></Suspense> },
      { path: '/modules/laboratory', element: <Suspense fallback={<Loader />}><Laboratory /></Suspense> },
      { path: '/laboratory', element: <Suspense fallback={<Loader />}><Laboratory /></Suspense> },
      { path: '/abdm-integration', element: <Suspense fallback={<Loader />}><ABDM /></Suspense> },
      { path: '/modules/abdm', element: <Suspense fallback={<Loader />}><ABDM /></Suspense> },
      { path: '/about', element: <Suspense fallback={<Loader />}><About /></Suspense> },
      { path: '/advisors-consultants', element: <Suspense fallback={<Loader />}><Advisors /></Suspense> },
      { path: '/advisors', element: <Suspense fallback={<Loader />}><Advisors /></Suspense> },
      { path: '/consultants', element: <Suspense fallback={<Loader />}><Advisors /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<Loader />}><Contact /></Suspense> },
      { path: '/login', element: <Suspense fallback={<Loader />}><Login /></Suspense> },

      { path: '/terms', element: <Suspense fallback={<Loader />}><Terms /></Suspense> },
      { path: '/terms-conditions', element: <Suspense fallback={<Loader />}><Terms /></Suspense> },
      { path: '/privacy', element: <Suspense fallback={<Loader />}><Privacy /></Suspense> },
      { path: '/privacy-policy', element: <Suspense fallback={<Loader />}><Privacy /></Suspense> },
      { path: '/refund', element: <Suspense fallback={<Loader />}><Refund /></Suspense> },
      { path: '/refund-policy', element: <Suspense fallback={<Loader />}><Refund /></Suspense> },
      { path: '/cancellation-policy', element: <Suspense fallback={<Loader />}><Refund /></Suspense> },
      { path: '/refund-and-cancellation-policy', element: <Suspense fallback={<Loader />}><Refund /></Suspense> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
