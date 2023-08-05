import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../store/user/reducer';
import viewStylesReducer from '../store/viewStyles/reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    viewStyles: viewStylesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
