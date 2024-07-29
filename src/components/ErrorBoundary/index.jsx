import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { StyledPaper } from './styled'

export const ErrorBoundary = ({ error, withShadow = true }) => {
   return (
      <Box>
         <StyledPaper withShadow={withShadow}>
            <Typography variant="h5">Oops... Something went wrong</Typography>
            <div>{error}</div>
            <Button
               onClick={() => window.location.reload()}
               variant="contained"
            >
               Retry
            </Button>
         </StyledPaper>
      </Box>
   )
}
