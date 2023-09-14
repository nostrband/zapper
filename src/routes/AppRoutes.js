import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from '../pages/Main/Root'
import About from '../pages/About/About'
import Zapper from '../pages/Zapper/Zapper'
import { Spinner } from 'react-bootstrap'

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
			fallback={<Spinner animation='border' variant='violet' />}
		>
			<RouterProvider router={router} />
		</React.Suspense>
	)
}
