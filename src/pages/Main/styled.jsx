import { Stack, styled } from '@mui/material'

export const Container = styled(Stack)(() => ({
   width: '100%',
   gap: '6rem',
   '@media screen and (max-width: 485px)': {
      fontSize: '1.75rem',
      gap: '4rem',
   },
}))
