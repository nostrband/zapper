import React, { useEffect, useState } from 'react'
import { Stack, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import {
   Button as BCButton,
   init as BCInit,
} from '@getalby/bitcoin-connect-react'
import { StyledForm, StyledHint, StyledTitle, SubmitButton } from './styled'
import { Tabs } from './components/Tabs'
import { AmountField } from './components/AmountField'
import { CommentField } from './components/CommentField'
import {
   getNumericValue,
   getStatusLabel,
   getSubmitLabel,
} from './utils/helpers'
import { formatCurrency } from '../../utils/helpers/general'
import { ModalPickComment } from '../Modal/ModalPickComment'
import { ModalPickAmount } from '../Modal/ModalPickAmount'
import { ZAP_STATUS } from '../../utils/constants/general'
import { TYPE_SEND_SATS, setWebLNEnabled } from '../../modules/nostr'
import { getHeadingByTab } from '../../pages/Zapper/utils/helpers'

BCInit({
   appName: 'Zapper',
})

export const ZapForm = ({
   onTypeChange,
   type,
   onSubmit,
   zaps,
   currentZap,
   onRetrySend,
}) => {
   const { register, handleSubmit, watch, control, setValue } = useFormContext()

   const zapsLength = zaps.length

   // controls
   const [showAmountPicker, setShowAmountPicker] = useState(false)
   const [showCommentPicker, setShowCommentPicker] = useState(false)
   const [hadWebLN, setHadWebLN] = useState(!!window.webln)
   const [webLN, setWebLN] = useState(!!window.webln)

   const amount = watch('amount')
   const comment = watch('comment')

   const submitText = getSubmitLabel(amount, type, zapsLength)

   const handleAmountChange = (value, onChange) => {
      const lastDigit = value[value.length - 1]
      if (lastDigit === undefined) return onChange('')

      const isNumeric = /^\d*$/.test(lastDigit)
      if (!isNumeric) return undefined

      return onChange(getNumericValue(value))
   }

   const handleKeyDown = (event) => {
      const value = getNumericValue(amount)
      if (event.key === 'ArrowUp') {
         setValue('amount', value + 1)
      } else if (event.key === 'ArrowDown') {
         setValue('amount', value <= 0 ? 0 : value - 1)
      }
   }

   const handleWebLN = (provider) => {
      setWebLN(!!provider)
      window.webln = provider
      setWebLNEnabled(!!provider)
   }

   const handleWebLNDisconnect = () => {
      setWebLN(false)
      setWebLNEnabled(false)
      window.webln = undefined
   }

   useEffect(() => {
      document.addEventListener('webln:connected', () => {
         setHadWebLN(true)
         setWebLN(!!window.webln)
      })
   })

   const showCommentField = type !== TYPE_SEND_SATS
   const allDone = !zaps.find((z) => z.status !== ZAP_STATUS.DONE)
   const isNewZap = !zaps.find((z) => z.status)
   const hint = getHeadingByTab(type)

   return (
      <>
         <Stack gap="1.5rem">
            <StyledTitle>Send a payment</StyledTitle>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
               <Tabs value={type} onChange={onTypeChange} />

               <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => {
                     const value = formatCurrency(field.value)
                     return (
                        <AmountField
                           {...field}
                           value={value}
                           onChange={(e) =>
                              handleAmountChange(e.target.value, field.onChange)
                           }
                           onKeyDown={handleKeyDown}
                           placeholder="0"
                           autoComplete="off"
                           onIconClick={() => setShowAmountPicker(true)}
                        />
                     )
                  }}
               />
               {showCommentField && (
                  <CommentField
                     onIconClick={() => setShowCommentPicker(true)}
                     {...register('comment')}
                     placeholder="Comment"
                  />
               )}
               {isNewZap && (
                  <>
                     {(webLN || !hadWebLN) && (
                        <center>
                           <BCButton
                              onConnected={handleWebLN}
                              onDisconnected={handleWebLNDisconnect}
                           />
                           {!webLN && (
                              <StyledHint>or proceed with QR codes</StyledHint>
                           )}
                        </center>
                     )}
                     <SubmitButton
                        type="submit"
                        disabled={!amount || !zapsLength}
                     >
                        {submitText}
                     </SubmitButton>
                     <StyledHint>{hint}</StyledHint>
                  </>
               )}
               {!isNewZap && (
                  <Stack gap="0.5rem">
                     <Typography
                        textAlign="center"
                        variant="h5"
                        fontWeight={600}
                     >
                        {getStatusLabel(zaps)}
                     </Typography>
                     {!allDone && !currentZap && (
                        <SubmitButton type="button" onClick={onRetrySend}>
                           Retry unsent zaps
                        </SubmitButton>
                     )}
                  </Stack>
               )}
            </StyledForm>
         </Stack>

         {/* Modals */}
         <ModalPickComment
            open={showCommentPicker}
            onClose={() => setShowCommentPicker(false)}
            pickedComment={comment}
            onPickComment={(newComment) => setValue('comment', newComment)}
         />
         <ModalPickAmount
            open={showAmountPicker}
            onClose={() => setShowAmountPicker(false)}
            pickedAmount={amount}
            onPickAmount={(newAmount) => setValue('amount', newAmount)}
         />
      </>
   )
}
