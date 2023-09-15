import React, { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Root from '../pages/Main/Root'

const About = lazy(() => import('../pages/About/About'))
const Zapper = lazy(() => import('../pages/Zapper/Zapper'))

const router = createBrowserRouter([
   {
      path: '/',
      element: <Root />,
   },
   {
      path: '/about',
      element: <About />,
   },
   {
      path: '/zap',
      element: <Zapper />,
   },
])

export const AppRoutes = () => {
   return (
      <React.Suspense
         fallback={<Spinner animation="border" variant="violet" />}
      >
         <RouterProvider router={router} />
      </React.Suspense>
   )
}
