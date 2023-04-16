import { CurrencyState } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState: CurrencyState = {
  value: 'USD',
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    
    changeCurrency: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { changeCurrency } = currencySlice.actions

export default currencySlice.reducer