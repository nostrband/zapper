import { Stack } from '@mui/material'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Container } from './styled'
import { Support } from './components/Support'
import { Zap } from './components/Zap'

function Root() {
   return (
      <Stack gap="1rem">
         <Hero />
         <Container>
            <Zap />
            <Features />
            <Support />
         </Container>
      </Stack>
   )
}

export default Root
