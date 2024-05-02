import { ThemeProvider as ThemeMuiProvider, CssBaseline } from '@mui/material'
import { useContext } from 'react'
import { darkTheme, lightTheme } from './theme'
import { ColorModeContext } from '../../store/ColorMode.Context'

const ThemeProvider = ({ children }) => {
   const { mode } = useContext(ColorModeContext)
   const currentTheme = mode === 'dark' ? darkTheme : lightTheme

   return (
      <ThemeMuiProvider theme={currentTheme}>
         <CssBaseline />
         {children}
      </ThemeMuiProvider>
   )
}

export default ThemeProvider
