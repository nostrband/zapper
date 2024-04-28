import React, { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CircularProgress, Stack } from '@mui/material'
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
         fallback={
            <Stack
               alignItems="center"
               justifyContent="center"
               width="100%"
               height="100%"
            >
               <CircularProgress color="primary" />
            </Stack>
         }
      >
         <RouterProvider router={router} />
      </React.Suspense>
   )
}
