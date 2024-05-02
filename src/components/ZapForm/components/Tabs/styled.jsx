import { Tab, Tabs, styled } from '@mui/material'

export const StyledTabs = styled((props) => (
   <Tabs {...props} classes={{ flexContainer: 'flexer' }} scrollButtons />
))(() => ({
   '& .flexer': {
      justifyContent: 'center',
   },
   '& .MuiTabs-indicator': { display: 'none' },
}))

export const StyledTabItem = styled((props) => (
   <Tab
      {...props}
      classes={{
         selected: 'selected',
      }}
   />
))(({ theme }) => ({
   textTransform: 'initial',
   fontSize: '0.875rem',
   fontWeight: 600,
   minHeight: '29px',
   minWidth: 'fit-content',
   padding: '6px 16px',
   borderRadius: '10px',
   color: theme.palette.text.secondary,
   flex: 1,
   whiteSpace: 'nowrap',
   '&.selected': {
      color: theme.palette.text.primary,
      background: `${theme.palette.text.primary}1A`,
   },
}))
