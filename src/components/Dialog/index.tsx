import { ReactNode } from 'react'

import { Root, Trigger, Portal, Overlay, Content } from './styles'

type DialogProps = {
  children: ReactNode
  trigger: JSX.Element
  open?: boolean
  onOpenChange?: (opem: boolean) => void
}

export function Dialog({ children, trigger, open, onOpenChange }: DialogProps) {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Overlay />
        <Content>{children}</Content>
      </Portal>
    </Root>
  )
}
