import styled from 'styled-components'

import { theme } from '../../styles/theme'

type ContainerProps = {
  $variant: 'black' | 'dark'
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
  width: 100%;

  label {
    color: ${theme.colors.white};
    font-size: 0.875rem;
  }

  input {
    height: 2.25rem;
    background-color: ${(props) => theme.colors[props.$variant]};
    border: 0;
    border-radius: 0.25rem;
    padding: 0 0.75rem;
    color: ${theme.colors.neutral};
    font-size: 1rem;
    width: 100%;
    border: 1px solid transparent;
    transition: all 100ms;

    &:focus {
      border-color: ${theme.colors.primary};
    }

    &::placeholder {
      color: ${theme.colors.neutral};
    }
  }

  span {
    margin-top: 0.125rem;
    font-size: 0.825rem;
    line-height: 80%;
    color: ${theme.colors.error};
  }
`
