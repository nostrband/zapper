import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDebounce } from '@uidotdev/usehooks'
import { CircularProgress, Stack, styled } from '@mui/material'
import { TYPE_ANON_ZAP, TYPE_ZAP } from '../../modules/nostr'
import { useLoadZaps } from './useLoadZaps'
import { ErrorBoundary } from '../../components/ErrorBoundary'
import { ZAP_STATUS } from '../../utils/constants/general'
import { Container } from './styled'
import { ZapForm } from '../../components/ZapForm'
import { EventDetails } from '../../components/EventDetails'
import { Recipients } from '../../components/Recipients'
import { Logs } from '../../components/Logs'
import { ModalZap } from '../../components/Modal/ModalZap'
import { ModalAutoZap } from '../../components/Modal/ModalAutoZap'
import { ModalSuccess } from '../../components/Modal/ModalSuccess'

export const ModalZapperContent = ({
   typeParam,
   amountParam,
   commentParam,
   id,
   autoSend,
}) => {
   console.log(
      { typeParam, amountParam, commentParam, id, autoSend },
      { Container, styled },
      'HISH params'
   )

   const methods = useForm()

   const [type, setType] = useState(TYPE_ANON_ZAP)
   const enteredAmount = Number(methods.watch('amount')) || 0
   const debouncedAmount = useDebounce(enteredAmount, 400)
   const enteredComment = methods.watch('comment')
   const debouncedComment = useDebounce(enteredComment, 200)

   useEffect(() => {
      document.addEventListener('nlAuth', async (e) => {
         const authed = e.detail.type !== 'logout'
         setType(authed ? TYPE_ZAP : TYPE_ANON_ZAP)
      })
   }, [])

   const {
      isLoading,
      isLoaded,
      error,
      zaps,
      target,
      sendNextZap,
      cancelCurrentZap,
      doneCurrentZap,
      currentZap,
      logs,
      autoSendTimer,
      cancelAutoSend,
      showDone,
      handleHideSuccessModal,
      restartFailedZaps,
      restartZap,
   } = useLoadZaps({
      amount: debouncedAmount,
      comment: debouncedComment,
      id,
      autoSend,
      type,
   })

   useEffect(() => {
      const zapType = typeParam || TYPE_ANON_ZAP
      setType(zapType)

      const amount = Number(amountParam) || 0
      methods.setValue('amount', amount)

      const comment = commentParam || ''
      methods.setValue('comment', comment)
   }, [typeParam, amountParam, commentParam])

   useEffect(() => {
      if (isLoaded) methods.setFocus('amount')
   }, [isLoaded])

   if (error) {
      return <ErrorBoundary error={error} withShadow={false} />
   }

   const handleTabChange = (e, newType) => setType(newType)

   const handleSubmit = (values) => {
      if (!values.amount || !zaps.length) return
      sendNextZap()
   }

   const hasErrors = !!zaps.find((z) => z.status === ZAP_STATUS.ERROR)
   const isNewZap = !zaps.find((z) => z.status)

   return (
      <Container>
         {isLoading && (
            <Stack alignItems="center" justifyContent="center" height="100%">
               <CircularProgress />
            </Stack>
         )}

         {!isLoading && (
            <>
               <Stack gap="0.75rem">
                  <FormProvider {...methods}>
                     <ZapForm
                        type={type}
                        onTypeChange={handleTabChange}
                        onSubmit={handleSubmit}
                        zaps={zaps}
                        currentZap={currentZap}
                        onRetrySend={restartFailedZaps}
                        isLoaded={isLoaded}
                     />
                  </FormProvider>
               </Stack>

               <EventDetails target={target} />

               <Recipients
                  recipients={zaps}
                  isNewZap={isNewZap}
                  onRestartZap={restartZap}
               />

               <Logs logs={logs} />
            </>
         )}
         {/* for emitSend */}
         <div
            id="send"
            role="button"
            onClick={sendNextZap}
            style={{ display: 'none' }}
         />

         {currentZap && (
            <ModalZap
               open={Boolean(currentZap)}
               currentZap={currentZap}
               onClose={cancelCurrentZap}
               onDone={doneCurrentZap}
               zaps={zaps}
            />
         )}
         <ModalAutoZap
            seconds={autoSendTimer}
            onClose={cancelAutoSend}
            open={autoSendTimer > 0}
         />
         <ModalSuccess
            open={showDone}
            onClose={handleHideSuccessModal}
            hasErrors={hasErrors}
         />
      </Container>
   )
}
