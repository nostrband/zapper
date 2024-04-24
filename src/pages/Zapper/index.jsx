/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CircularProgress, IconButton, Stack } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { InfoButtonContainer, Container, StyledHint } from './styled'
import { InfoIcon } from '../../assets/icons'
import { ZapForm } from '../../components/ZapForm'
import { getHeadingByTab } from './utils/helpers'
import { EventDetails } from './components/EventDetails'
import { useLoadZaps } from './hooks/useLoadZaps'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Recipients } from './components/Recipients'

const Zapper = () => {
   const [searchParams] = useSearchParams()
   const methods = useForm()
   const [type, setType] = useState('zap') // zap type

   // params
   const [id, setId] = useState('')
   const [wasAutoSend, setWasAutoSend] = useState(false)

   const { isLoading, error, zaps, target } = useLoadZaps(id)

   // read params from query string
   useEffect(() => {
      const id = searchParams.get('id')
      setId(id)

      const zapType = searchParams.get('type') || 'zap'
      setType(zapType)

      const amount = Number(searchParams.get('amount')) || 0
      methods.setValue('amount', amount)

      const comment = searchParams.get('comment') || ''
      methods.setValue('comment', comment)

      const autoSend = searchParams.get('auto_send') === 'true'
      if (autoSend) setWasAutoSend(true)
   }, [searchParams])

   if (error) {
      return <ErrorBoundary error={error} />
   }

   const handleTabChange = (e, newType) => setType(newType)

   const hint = getHeadingByTab(type)

   const handleSubmit = (values) => {
      // eslint-disable-next-line
      console.log(values)
   }

   return (
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
                        zapsLength={zaps.length}
                        onSubmit={handleSubmit}
                     />
                  </FormProvider>
                  <StyledHint>{hint}</StyledHint>
               </Stack>

               <EventDetails target={target} />

               <Recipients recipients={zaps} />
            </>
         )}
      </Container>
   )
}

export default Zapper
