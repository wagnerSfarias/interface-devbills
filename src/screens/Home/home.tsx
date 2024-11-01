import { zodResolver } from '@hookform/resolvers/zod'
import { X } from '@phosphor-icons/react'
import { InputMask } from '@react-input/mask'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ButtonIcon } from '../../components/ButtonIcon'
import { Card } from '../../components/Card'
import {
  CategoriesPieChart,
  CategoryProps,
} from '../../components/CategoriesPieChart'
import { CreateCategoryDialog } from '../../components/CreateCategoryDialog'
import { CreateTransactionDialog } from '../../components/CreateTransactionDialog'
import { FinancialEvolutionBarChart } from '../../components/FinancialEvolutionBarChart'
import { Input } from '../../components/Input'
import { Logo } from '../../components/Logo'
import { Title } from '../../components/Title'
import { Transaction } from '../../components/Transaction'
import { useFetchAPI } from '../../hooks/useFetchAPI'
import { transactionsFilterSchema } from '../../validators/schemas'
import { TransactionsFilterData } from '../../validators/types'
import {
  Header,
  Main,
  Section,
  Filters,
  InputGroup,
  Balance,
  ChartContainer,
  ChartContent,
  ChartActions,
  Aside,
  SearchTransaction,
  TransactionGroup,
  CategoryBadge,
} from './styles'

export function Home() {
  const transactionsFilterForm = useForm<TransactionsFilterData>({
    defaultValues: {
      title: '',
      categoryId: '',
      beginDate: dayjs().startOf('month').format('DD/MM/YYYY'),
      endDate: dayjs().endOf('month').format('DD/MM/YYYY'),
    },
    resolver: zodResolver(transactionsFilterSchema),
  })

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryProps | null>(null)

  const { transactions, fetchTransactions, dashboard, fetchDashboard } =
    useFetchAPI()

  useEffect(() => {
    const { beginDate, endDate } = transactionsFilterForm.getValues()

    fetchDashboard({ beginDate, endDate })
    fetchTransactions(transactionsFilterForm.getValues())
  }, [fetchTransactions, transactionsFilterForm, fetchDashboard])

  const handleSelectCategory = useCallback(
    async ({ id, title, color }: CategoryProps) => {
      setSelectedCategory({ id, title, color })
      transactionsFilterForm.setValue('categoryId', id)

      await fetchTransactions(transactionsFilterForm.getValues())
    },
    [transactionsFilterForm, fetchTransactions],
  )

  const handleDeselectCategory = useCallback(async () => {
    setSelectedCategory(null)
    transactionsFilterForm.setValue('categoryId', '')

    await fetchTransactions(transactionsFilterForm.getValues())
  }, [transactionsFilterForm, fetchTransactions])

  const onSubmitTransactions = useCallback(
    async (data: TransactionsFilterData) => {
      await fetchTransactions(data)
    },
    [fetchTransactions],
  )
  const onSubmitDashboard = useCallback(
    async (data: TransactionsFilterData) => {
      const { beginDate, endDate } = data

      await fetchDashboard({ beginDate, endDate })
      await fetchTransactions(data)
    },
    [fetchDashboard, fetchTransactions],
  )

  return (
    <>
      <Header>
        <Logo />
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
        </div>
      </Header>
      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receitas e despesas no período" />
            <InputGroup>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
                error={
                  transactionsFilterForm.formState.errors.beginDate?.message
                }
                {...transactionsFilterForm.register('beginDate')}
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
                error={transactionsFilterForm.formState.errors.endDate?.message}
                {...transactionsFilterForm.register('endDate')}
              />
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(onSubmitDashboard)}
              />
            </InputGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={dashboard?.balance?.balance || 0} />
            <Card
              title="Receitas"
              amount={dashboard?.balance?.incomes || 0}
              variant="incomes"
            />
            <Card
              title="Gastos"
              amount={dashboard?.balance?.expenses * -1 || 0}
              variant="expenses"
            />
          </Balance>

          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categoria no período"
              />
              {selectedCategory && (
                <CategoryBadge
                  $color={selectedCategory.color}
                  onClick={handleDeselectCategory}
                >
                  <X />
                  {selectedCategory.title}
                </CategoryBadge>
              )}
            </header>
            <ChartContent>
              <CategoriesPieChart
                expenses={dashboard.expenses}
                onClick={handleSelectCategory}
              />
            </ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução Financeira"
                subtitle="Saldo, Receitas e Gastos ao ano"
              />
              <ChartActions>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                />
                <ButtonIcon />
              </ChartActions>
            </header>
            <ChartContent>
              <FinancialEvolutionBarChart />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Receitas e Gastos no período" />
            <SearchTransaction>
              <Input
                variant="black"
                placeholder="Procurar transação..."
                {...transactionsFilterForm.register('title')}
              />
              <ButtonIcon
                onClick={transactionsFilterForm.handleSubmit(
                  onSubmitTransactions,
                )}
              />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            {transactions?.length &&
              transactions?.map((item, index) => (
                <Transaction
                  key={item._id}
                  id={index + 1}
                  amount={
                    item.type === 'expense' ? item.amount * -1 : item.amount
                  }
                  date={dayjs(item.date).add(3, 'hours').format('DD/MM/YYYY')}
                  category={{
                    title: item.category.title,
                    color: item.category.color,
                  }}
                  title={item.title}
                  variant={item.type}
                />
              ))}
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  )
}
