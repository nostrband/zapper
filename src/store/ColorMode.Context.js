import React, { useEffect, useMemo } from 'react'
import { useMediaQuery } from '@mui/material'
import { useLocalStorage } from '@uidotdev/usehooks'

export const ColorModeContext = React.createContext({
   toggleColorMode: () => {},
   mode: 'light',
})

const ColorModeContextProvider = ({ children }) => {
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
   const systemMode = prefersDarkMode ? 'dark' : 'light'

   const [mode, setMode] = useLocalStorage('colorMode', systemMode)

   useEffect(() => {
      // switch nostr-login too
      document.dispatchEvent(
         new CustomEvent('nlDarkMode', { detail: mode === 'dark' })
      )
   }, [mode])

   const contextValues = useMemo(
      () => ({
         toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
         },
         mode,
      }),
      [mode]
   )

   return (
      <ColorModeContext.Provider value={contextValues}>
         {children}
      </ColorModeContext.Provider>
   )
}

export default ColorModeContextProvider
