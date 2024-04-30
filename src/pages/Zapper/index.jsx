import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, IconButton, Stack } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { InfoButtonContainer, Container } from './styled'
import { InfoIcon } from '../../assets/icons'
import { ZapForm } from '../../components/ZapForm'
import { EventDetails } from './components/EventDetails'
import { useLoadZaps } from './hooks/useLoadZaps'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Recipients } from './components/Recipients'
import { ModalZap } from '../../components/Modal/ModalZap'
import { ZAP_STATUS } from '../../utils/constants/general'
import { Logs } from './components/Logs'
import { ModalAutoZap } from '../../components/Modal/ModalAutoZap'
import { ModalSuccess } from '../../components/Modal/ModalSuccess'

const Zapper = () => {
   const methods = useForm()
   const [searchParams] = useSearchParams()

   const [type, setType] = useState('zap')
   const enteredAmount = Number(methods.watch('amount')) || 0
   const enteredComment = methods.watch('comment')

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
   } = useLoadZaps(type, enteredAmount, enteredComment)

   useEffect(() => {
      const zapType = searchParams.get('type') || 'zap'
      setType(zapType)

      const amount = Number(searchParams.get('amount')) || 0
      methods.setValue('amount', amount)

      const comment = searchParams.get('comment') || ''
      methods.setValue('comment', comment)
   }, [searchParams])

   useEffect(() => {
      if (isLoaded) methods.setFocus('amount')
   }, [isLoaded])

   if (error) {
      return <ErrorBoundary error={error} />
   }

   const handleTabChange = (e, newType) => setType(newType)

   const handleSubmit = (values) => {
      if (!values.amount || !zaps.length) return
      sendNextZap()
   }

   const hasErrors = !!zaps.find((z) => z.status === ZAP_STATUS.ERROR)
   const isNewZap = !zaps.find((z) => z.status)

   return (
      <Box paddingBottom="1.5rem">
         <Container>
            <InfoButtonContainer>
               <IconButton className="info_btn">
                  <InfoIcon />
               </IconButton>
            </InfoButtonContainer>

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
      </Box>
   )
}

export default Zapper
