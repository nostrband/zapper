import { createTheme } from '@mui/material'

const commonTheme = createTheme({
   typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: 'initial',
            },
         },
      },
   },
})

const lightTheme = createTheme({
   ...commonTheme,
   palette: {
      mode: 'light',
      text: {
         primary: '#334155',
         secondary: '#33415580',
      },
      background: {
         default: '#ffffff',
      },
      primary: {
         main: '#3462E5',
      },
   },
})

const darkTheme = createTheme({
   ...commonTheme,
   palette: {
      mode: 'dark',
      text: {
         primary: '#FFFFFF',
         secondary: '#FFFFFF80',
      },
      background: {
         default: '#020617',
      },
      primary: {
         main: '#3462E5',
      },
   },
})

export { lightTheme, darkTheme }
