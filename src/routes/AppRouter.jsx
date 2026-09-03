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
const Contact = lazy(() => import('../pages/Contact/Contact'))
const ABDM = lazy(() => import('../pages/ABDM/ABDM'))
const Products = lazy(() => import('../pages/Products/Products'))
const Terms = lazy(() => import('../pages/Terms/Terms'))
const Privacy = lazy(() => import('../pages/Privacy/Privacy'))
const Refund = lazy(() => import('../pages/Refund/Refund'))

const router = createBrowserRouter([
  {
    element: <Layout />,
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
      { path: '/contact', element: <Suspense fallback={<Loader />}><Contact /></Suspense> },
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
