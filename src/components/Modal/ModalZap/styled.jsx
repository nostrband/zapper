/* eslint-disable no-unused-vars */
import {
   styled,
   InputBase,
   IconButton,
   Typography,
   Button,
   Stack,
   LinearProgress,
} from '@mui/material'
import { forwardRef } from 'react'

export const StyledAddressView = styled((props) => <Typography {...props} />)(
   () => ({
      fontWeight: 600,
      fontSize: '1.125rem',
      textAlign: 'center',
      '@media screen and (max-width: 485px)': {
         fontSize: '1rem',
      },
   })
)

export const StyledStatus = styled((props) => <Typography {...props} />)(
   ({ theme }) => ({
      fontWeight: 400,
      fontSize: '0.75rem',
      color: theme.palette.text.secondary,
   })
)

export const StyledInput = styled((props) => (
   <InputBase {...props} fullWidth readOnly classes={{ input: 'input' }} />
))(({ theme }) => ({
   borderWidth: '2px',
   borderStyle: 'solid',
   borderColor: `${theme.palette.text.primary}21`,
   borderRadius: '12px',
   height: '41px',
   '& .input': {
      padding: '0.75rem 1rem',
      color: theme.palette.text.primary,
   },
}))

export const StyledIconButton = styled((props) => <IconButton {...props} />)(
   ({ theme }) => ({
      background: `${theme.palette.text.primary}21`,
      color: theme.palette.text.primary,
      minWidth: '41px',
      height: '41px',
      borderRadius: '12px',
   })
)

export const StyledLinkButton = styled(Button)(({ theme }) => ({
   '&:is(&, :hover)': {
      color: '#fff',
   },
}))

export const StyledQRCodeContainer = styled(
   forwardRef((props, ref) => (
      <Stack {...props} ref={ref} alignItems="center" />
   ))
)(() => ({
   '& > #canvas': {
      width: '100% !important',
      aspectRatio: '1/1',
      height: 'auto !important',
   },
}))

export const StyledProgress = styled((props) => (
   <LinearProgress {...props} variant="determinate" />
))(() => ({
   width: '100%',
   borderRadius: '24px',
}))

export const StyledHint = styled((props) => (
   <Typography {...props} variant="caption" />
))(({ theme }) => ({
   textAlign: 'center',
   color: `${theme.palette.text.primary}B3`,
}))
