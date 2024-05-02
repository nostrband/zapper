import { Paper, styled } from '@mui/material'

export const StyledPaper = styled((props) => <Paper {...props} />)(
   ({ theme }) => ({
      borderRadius: '10px',
      padding: '2rem 1rem',
      maxWidth: '40rem',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      background:
         theme.palette.mode === 'light'
            ? theme.palette.background.default
            : `${theme.palette.background.default}B3`,
   })
)
