import { AvatarGroup, Box, Skeleton, Typography, styled } from '@mui/material'
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
      minHeight: '237px',
   },
   backgroundImage: `url(${SupportBackground})`,
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'bottom center',
   backgroundSize: 'contain',
}))

export const Title = styled((props) => (
   <Typography {...props} component="h3" />
))(() => ({
   fontSize: '1.5rem',
   fontWeight: 600,
   fontFamily: 'InterDisplay',
   '@media screen and (max-width: 485px)': {
      fontSize: '1.25rem',
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
      border: `1px solid ${theme.palette.text.secondary}`,
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

export const StyledSkeleton = styled((props) => (
   <Skeleton {...props} variant="circular" />
))(({ theme }) => ({
   width: 48,
   height: 48,
   border: `1px solid ${theme.palette.text.secondary}`,
   marginLeft: '-16px',
   '@media screen and (max-width: 485px)': {
      width: 40,
      height: 40,
      marginLeft: '-12px',
   },
}))
