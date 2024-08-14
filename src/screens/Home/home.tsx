import { Button } from '../../components/Button'
import { Logo } from '../../components/Logo'
import { Header, Main, Section, Filters } from './style'

export function Home() {
  return (
    <>
      <Header>
        <Logo />
        <div>
          <Button>Nova Transação</Button>
          <Button>Nova Categoria</Button>
        </div>
      </Header>
      <Main>
        <Section>
          <Filters></Filters>
        </Section>
      </Main>
    </>
  )
}
