import { InputMask } from '@react-input/mask'
import { useCallback, useState } from 'react'

import { Button } from '../Button'
import { Dialog } from '../Dialog'
import { Input } from '../Input'
import { Title } from '../Title'
import {
  Container,
  CurrencyInput,
  InputGroup,
  RadioForm,
  RadioGroup,
} from './styles'

export function CreateTransactionDialog() {
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
      trigger={<Button>Nova Transação</Button>}
    >
      <Container>
        <Title
          title="Nova Transação"
          subtitle="Crie uma nova transação para seu controle financeiro"
        />
        <form>
          <InputGroup>
            <label>Categoria</label>
            <select>
              <option value="null">Selecione uma categoria</option>
            </select>
          </InputGroup>

          <Input label="Nome" placeholder="Nome da transação...." />
          <InputGroup>
            <label>Valor</label>
            <CurrencyInput
              placeholder="R$ 0,00"
              format="currency"
              currency="BRL"
            />
          </InputGroup>

          <InputMask
            component={Input}
            mask="dd/mm/aaaa"
            replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
            variant="black"
            label="Data"
            placeholder="dd/mm/aaaa"
          />
          <RadioForm>
            <RadioGroup>
              <input type="radio" id="income" value="income" name="type" />
              <label htmlFor="income">Receita</label>
            </RadioGroup>
            <RadioGroup>
              <input type="radio" id="expense" value="expense" name="type" />
              <label htmlFor="expense">Gasto</label>
            </RadioGroup>
          </RadioForm>

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
