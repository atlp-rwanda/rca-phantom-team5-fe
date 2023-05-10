import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from './slice/authSlice';
import busesSlice from './slice/busesSlice';
import locationSlice from './slice/locationSlice';
import usersSlice from './slice/usersSlice';
import routeSlice from './slice/routeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    locations: locationSlice,
    buses: busesSlice,
    users: usersSlice,
    routes: routeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;
