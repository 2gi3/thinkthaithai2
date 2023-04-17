import { ReactNode } from 'react'

export type LayoutProps = {
    children: ReactNode
  }

  export interface CurrencyState {
    value: string
    selectorIsOpen: boolean
  }

  export interface LocaleToLanguage {
    [key: string]: string;
  }
  