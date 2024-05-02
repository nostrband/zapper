import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { IntlProvider } from './modules/intl/IntlProvider'
import reportWebVitals from './reportWebVitals'
import { AppRoutes } from './routes/AppRoutes'
import ColorModeContextProvider from './store/ColorMode.Context'
import ThemeProvider from './modules/theme/ThemeProvider'
import './assets/css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
   <IntlProvider>
      <ColorModeContextProvider>
         <ThemeProvider>
            <AppRoutes />
            <Toaster />
         </ThemeProvider>
      </ColorModeContextProvider>
   </IntlProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
