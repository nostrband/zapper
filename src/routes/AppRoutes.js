import React, { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Root from '../pages/Main/Root'
import { Layout } from '../layout'

const About = lazy(() => import('../pages/About/About'))
const Zapper = lazy(() => import('../pages/Zapper'))

const router = createBrowserRouter([
   {
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <Zapper />,
         },
         {
            path: '/about',
            element: <About />,
         },
         {
            path: '/zap',
            element: <Zapper />,
         },
         {
            path: '*',
            element: <Root />,
         },
      ],
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
