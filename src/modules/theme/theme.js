import { createTheme } from '@mui/material'

const commonTheme = createTheme({
   typography: {
      fontFamily: ['InterVariable', 'sans-serif'].join(','),
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: ({ theme, color }) => {
               const commonStyles = {
                  textTransform: 'initial',
                  fontWeight: 600,
                  paddingTop: '0.875rem',
                  paddingBottom: '0.875rem',
                  borderRadius: '12px',
                  boxShadow: `0px 3px 2px 0px #ffffff1A inset`,
                  '&:hover': {
                     boxShadow: `0px 6px 4px 0px #ffffff1A inset`,
                  },
                  maxHeight: '48px',
               }

               if (color === 'secondary') {
                  return {
                     ...commonStyles,
                     borderWidth: '1px',
                     borderStyle: 'solid',
                     borderColor: ` ${theme.palette.text.primary}12`,
                  }
               }
               return commonStyles
            },
         },
         defaultProps: {
            variant: 'contained',
         },
      },
      MuiInputBase: {
         styleOverrides: {
            root: {
               maxHeight: '48px',
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
         main: '#2563EB',
         dark: '#1E40AF',
      },
      secondary: {
         main: '#33415521',
         dark: '#33415554',
         contrastText: '#334155',
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
         main: '#2563EB',
         dark: '#1E40AF',
      },
      secondary: {
         main: '#FFFFFF21',
         dark: '#FFFFFF54',
         contrastText: '#ffffff',
      },
   },
})

export { lightTheme, darkTheme }
