import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import locationSlice from './slice/locationSlice';
import busesSlice from './slice/busesSlice';

const store = configureStore({
  reducer: {

    auth: authReducer,
    locations: locationSlice,
    buses : busesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;

