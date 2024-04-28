import { Button, styled } from '@mui/material'
import { ArrowDownIcon } from '../../../../assets/icons'

export const StyledExpandButton = styled((props) => (
   <Button variant="text" {...props} endIcon={<ArrowDownIcon />} />
))(({ theme }) => ({
   color: `${theme.palette.text.primary}B3`,
   fontSize: '0.75rem',
   padding: '0 0.25rem',
   boxShadow: 'none',
   '& .MuiButton-endIcon': {
      marginRight: 0,
   },
   '&:hover': {
      background: 'transparent',
      boxShadow: 'none',
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
