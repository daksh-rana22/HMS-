import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Loader from '../components/ui/Loader'

const Home = lazy(() => import('../pages/Home/Home'))
const Modules = lazy(() => import('../pages/Modules/Modules'))
const About = lazy(() => import('../pages/About/About'))
const Pricing = lazy(() => import('../pages/Pricing/Pricing'))
const Contact = lazy(() => import('../pages/Contact/Contact'))

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: '/modules', element: <Suspense fallback={<Loader />}><Modules /></Suspense> },
      { path: '/about', element: <Suspense fallback={<Loader />}><About /></Suspense> },
      { path: '/pricing', element: <Suspense fallback={<Loader />}><Pricing /></Suspense> },
      { path: '/contact', element: <Suspense fallback={<Loader />}><Contact /></Suspense> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
