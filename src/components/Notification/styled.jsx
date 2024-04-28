/* eslint-disable no-unused-vars */
import { Alert, Box, IconButton, styled } from '@mui/material'
import { forwardRef } from 'react'

export const StyledAlert = styled(
   forwardRef((props, ref) => <Alert {...props} ref={ref} icon={false} />)
)(({ theme }) => ({
   width: '100%',
   maxHeight: 72,
   padding: '1rem',
   background:
      theme.palette.mode === 'dark'
         ? '#292E4E'
         : theme.palette.background.paper,
   borderRadius: 12,
   maxWidth: '409px',
   margin: '0 0.5rem',
   boxShadow: theme.shadows['10'],
   '& .MuiAlert-message': {
      display: 'flex',
      minWidth: '100%',
      justifyContent: 'space-between',
      overflow: 'hidden',
      padding: 0,
   },
}))

export const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   gap: '1rem',
   width: '100%',
   '& > .MuiTypography-root': {
      flex: 1,
      width: '100%',
      wordBreak: 'break-word',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontWeight: 500,
   },
}))

export const IconWrapper = styled((props) => {
   const exclude = new Set(['type'])
   const omitProps = Object.fromEntries(
      Object.entries(props).filter((e) => !exclude.has(e[0]))
   )
   return <Box {...omitProps} />
})(({ type = 'success' }) => ({
   padding: '0.5rem',
   borderRadius: '12px',
   background: type === 'success' ? '#047857' : '#B91C1C',
}))

export const StyledIconButton = styled(IconButton)({
   borderRadius: '10px',
})
