import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import currencyReducer from './slices/currencySlice'
import studentReducer from './slices/studentSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currency: currencyReducer,
    student: studentReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch