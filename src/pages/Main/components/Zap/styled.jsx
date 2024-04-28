import { Box, Button, styled } from '@mui/material'
import { EyeIcon, ZapperBackground } from '../../../../assets/icons'

export const Container = styled(Box)(({ theme }) => ({
   position: 'relative',
   padding: '2rem 2.5rem',
   borderRadius: '24px',
   border: `1px solid ${theme.palette.text.primary}1A`,
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '0.5rem',
   backgroundImage: `url(${ZapperBackground})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'bottom',
   backgroundSize: 'contain',
   '@media screen and (max-width: 485px)': {
      padding: '1rem 1.5rem',
   },
}))

export const StyledPreviewButton = styled((props) => (
   <Button {...props} startIcon={<EyeIcon />} variant="text">
      Preview
   </Button>
))(({ theme }) => ({
   alignSelf: 'flex-end',
   color: theme.palette.text.secondary,
   fontWeight: 500,
   fontSize: '0.75rem',
   borderRadius: '31px',
   border: `1px solid ${theme.palette.text.primary}1A`,
   padding: '4px 8px',
   '& .MuiButton-icon': {
      marginLeft: 0,
   },
   '&:is(&, :hover)': {
      boxShadow: 'none',
   },
}))
