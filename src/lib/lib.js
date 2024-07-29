import React from 'react'
import ReactDOM from 'react-dom/client'
import { ModalZapper } from './ModalZapper'
import '../assets/css/lib.css'
import { darkTheme, lightTheme } from '../modules/theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

function launchZapModal(props = {}) {
   const { mode = 'light' } = props

   const currentTheme = mode === 'dark' ? darkTheme : lightTheme

   const rootElement = document.createElement('div')
   rootElement.id = 'zapper-root'
   document.body.append(rootElement)

   const handleCloseModal = () => {
      const modalRoot = document.getElementById('zapper-modal')
      if (modalRoot) modalRoot.remove()
      rootElement.remove()
   }

   const root = ReactDOM.createRoot(rootElement)
   root.render(
      <ThemeProvider theme={currentTheme}>
         <CssBaseline />
         <ModalZapper onClose={handleCloseModal} zapperProps={props} />
      </ThemeProvider>
   )
}

export { launchZapModal, ModalZapper }
