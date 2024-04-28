import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { NewZap } from './components/NewZap'
import { Container } from './styled'
import { Support } from './components/Support'
import { Zap } from './components/Zap'

function Root() {
   return (
      <Container>
         <Hero />
         <Features />
         <Zap />
         <Support />
         <NewZap />
      </Container>
   )
}

export default Root
