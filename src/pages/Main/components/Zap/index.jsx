import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ZapForm } from '../../../../components/ZapForm'
import { Container, StyledPreviewButton } from './styled'

export const Zap = () => {
   const methods = useForm()
   return (
      <Container>
         <StyledPreviewButton />
         <FormProvider {...methods}>
            <ZapForm zaps={[]} />
         </FormProvider>
      </Container>
   )
}
