import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from '../pages/Main/Root'
import About from '../pages/About/About'
import Zapper from '../pages/Zapper/Zapper'

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
	return <RouterProvider router={router} />
}
