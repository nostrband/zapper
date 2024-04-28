import { AvatarGroup, Box, Typography, styled } from '@mui/material'
import { SupportBackground } from '../../../../../assets/icons'

export const Container = styled(Box)(({ theme }) => ({
   position: 'relative',
   padding: '0.5rem',
   borderRadius: '24px',
   border: `1px solid ${theme.palette.text.primary}1A`,
   minHeight: '285px',
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '1.5rem',
   '@media screen and (max-width: 485px)': {
      gap: '1rem',
   },
   backgroundImage: `url(${SupportBackground})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'center',
   backgroundSize: 'contain',
}))

export const Title = styled((props) => (
   <Typography {...props} component="h3" />
))(() => ({
   fontSize: '1.5rem',
   fontWeight: 600,
   '@media screen and (max-width: 485px)': {
      fontSize: '1rem',
   },
}))

export const StyledAvatarGroup = styled((props) => (
   <AvatarGroup {...props} classes={{ root: 'group' }} />
))(({ theme }) => ({
   alignItems: 'center',
   '&.group > .MuiAvatar-root': {
      marginLeft: '-16px',
      width: 48,
      height: 48,
      border: `1px solid ${theme.palette.text.primary}`,
      '@media screen and (max-width: 485px)': {
         width: 40,
         height: 40,
         marginLeft: '-12px',
      },
   },
   '&.group > .MuiAvatar-colorDefault': {
      marginLeft: '-14px',
      background: `${theme.palette.text.primary}0D`,
      color: theme.palette.text.secondary,
      border: 'none',
      fontSize: '0.875rem',
      '@media screen and (max-width: 485px)': {
         marginLeft: '-12px',
      },
   },
}))
