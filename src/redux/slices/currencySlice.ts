import { CurrencyState } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState: CurrencyState = {
  value: 'USD',
  selectorIsOpen: false
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    
    changeCurrency: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    toggleCurrencySelector: (state) => {
      state.selectorIsOpen = !state.selectorIsOpen
    },
  },
})

export const { changeCurrency, toggleCurrencySelector } = currencySlice.actions

export default currencySlice.reducer