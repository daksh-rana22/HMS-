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
const Pricing = lazy(() => import('../pages/Pricing/Pricing'))
const Contact = lazy(() => import('../pages/Contact/Contact'))

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
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
      { path: '/about', element: <Suspense fallback={<Loader />}><About /></Suspense> },
      { path: '/pricing', element: <Suspense fallback={<Loader />}><Pricing /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<Loader />}><Contact /></Suspense> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
