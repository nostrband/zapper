import { Stack, styled } from '@mui/material'

export const Container = styled(Stack)(() => ({
   width: '100%',
   gap: '3rem',
   paddingTop: '1rem',
   '@media screen and (max-width: 485px)': {
      gap: '1.5rem',
   },
}))

export const SubContainer = styled(Stack)(() => ({
   width: '100%',
   gap: '6rem',
   marginBottom: '3rem',
   '@media screen and (max-width: 485px)': {
      gap: '3rem',
      marginBottom: '1.5rem',
   },
}))
