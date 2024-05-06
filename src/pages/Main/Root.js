import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Container, SubContainer } from './styled'
import { Support } from './components/Support'
import { Zap } from './components/Zap'

function Root() {
   return (
      <Container>
         <Hero />
         <SubContainer>
            <Zap />
            <Features />
            <Support />
         </SubContainer>
      </Container>
   )
}

export default Root
