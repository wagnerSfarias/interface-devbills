import { Button } from '../../components/Button'
import { Logo } from '../../components/Logo'
import { Title } from '../../components/Title'
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
          <Title title="Saldo" subtitle="Receitas e despesas no período" />
          <Filters></Filters>
        </Section>
      </Main>
    </>
  )
}
