import { useCallback, useState } from 'react'

import { Button } from '../Button'
import { Dialog } from '../Dialog'
import { Input } from '../Input'
import { Title } from '../Title'
import { Container } from './styles'

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onSubmit = useCallback(() => {
    handleClose()
  }, [handleClose])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova Categoria</Button>}
    >
      <Container>
        <Title
          title="Nova Categoria"
          subtitle="Crie uma nova categoria para suas transações"
        />
        <form>
          <div>
            <Input label="Nome" placeholder="Nome da categoria...." />
            <Input label="Cor" type="color" />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button onClick={onSubmit}>Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  )
}
