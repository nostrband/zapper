import { Button, Typography, styled } from '@mui/material'
import { ArrowDownIcon } from '../../../../assets/icons'

export const StyledExpandButton = styled((props) => (
   <Button {...props} endIcon={<ArrowDownIcon />} />
))(({ theme }) => ({
   color: `${theme.palette.text.primary}B3`,
   fontSize: '0.75rem',
   padding: '0 0.25rem',
   '& .MuiButton-endIcon': {
      marginRight: 0,
   },
}))

export const StyledPre = styled('pre')(({ theme }) => ({
   overflowY: 'scroll',
   height: '300px',
   background: `${theme.palette.text.primary}0D`,
   padding: '0.5rem 1rem',
   borderRadius: '10px',
   fontSize: '0.75rem',
}))

export const StyledDateView = styled((props) => (
   <Typography {...props} variant="caption" />
))(({ theme }) => ({
   color: theme.palette.text.secondary,
}))
