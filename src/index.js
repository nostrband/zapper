import React from 'react'
import ReactDOM from 'react-dom/client'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import { IntlProvider } from './modules/intl/IntlProvider'
import './assets/css/index.css'
import reportWebVitals from './reportWebVitals'
import { AppRoutes } from './routes/AppRoutes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <IntlProvider>
      <ThemeProvider>
         <AppRoutes />
         <ToastContainer />
      </ThemeProvider>
   </IntlProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
