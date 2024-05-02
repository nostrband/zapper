import { Box, Dialog, DialogContent, DialogTitle, styled } from '@mui/material'

export const StyledDialog = styled((props) => (
   <Dialog
      {...props}
      classes={{
         paper: 'paper',
      }}
      slotProps={{
         backdrop: {
            sx: {
               backdropFilter: 'blur(5px)',
            },
         },
      }}
      scroll="body"
   />
))(({ theme }) => {
   return {
      '& .paper': {
         margin: '1rem',
         borderRadius: '1.5rem',
         background:
            theme.palette.mode === 'light'
               ? theme.palette.background.default
               : `#090f34F2`,
         borderWidth: '1px',
         borderStyle: 'solid',
         borderColor: `${theme.palette.text.primary}1A`,
      },
   }
})

export const StyledDialogTitle = styled((props) => (
   <DialogTitle {...props} variant="h1" />
))(() => {
   return {
      textAlign: 'center',
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media screen and (max-width: 485px)': {
         padding: '1rem',
         fontSize: '1rem',
      },
   }
})

export const StyledDialogContent = styled((props) => (
   <DialogContent {...props} />
))(() => {
   return {
      padding: '1.5rem 3rem 3rem',
      display: 'flex',
      flexDirection: 'column',
      '@media screen and (max-width: 485px)': {
         padding: '1rem',
      },
   }
})

export const StyledCloseButtonWrapper = styled((props) => <Box {...props} />)(
   () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0.5rem 1rem',
      position: 'relative',
      '& > .close_btn': {
         position: 'absolute',
         transform: 'translateY(50%)',
      },
   })
)
