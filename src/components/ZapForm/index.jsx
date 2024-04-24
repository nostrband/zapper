import React from 'react'
import { Box, Stack } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { LogoWrapper, StyledForm, StyledTitle, SubmitButton } from './styled'
import { AppLogoIcon } from '../../assets/icons'
import { Tabs } from './components/Tabs'
import { AmountField } from './components/AmountField'
import { CommentField } from './components/CommentField'
import { getSubmitLabel } from './utils/helpers'

export const ZapForm = ({ onTypeChange, type, onSubmit, zapsLength = 0 }) => {
   const { register, handleSubmit, watch } = useFormContext()

   const amount = watch('amount') || 0
   const submitText = getSubmitLabel(amount, type, zapsLength)

   return (
      <Stack gap="1.5rem">
         <Box paddingTop="0.5rem">
            <LogoWrapper>
               <AppLogoIcon />
            </LogoWrapper>
         </Box>
         <StyledTitle>Send a payment</StyledTitle>

         <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Tabs value={type} onChange={onTypeChange} />

            <AmountField {...register('amount')} placeholder="0" />
            <CommentField {...register('comment')} placeholder="Comment" />

            <SubmitButton type="submit">{submitText}</SubmitButton>
         </StyledForm>
      </Stack>
   )
}
