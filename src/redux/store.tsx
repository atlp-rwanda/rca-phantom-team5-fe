import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';

const store = configureStore({
  reducer: {

    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

    auth: authReducer,
  },
});
export default store;

