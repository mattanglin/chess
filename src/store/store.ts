import { configureStore } from '@reduxjs/toolkit'
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { chess } from './slices/chess';

export const store = configureStore({
  reducer: {
    [chess.name]: chess.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;