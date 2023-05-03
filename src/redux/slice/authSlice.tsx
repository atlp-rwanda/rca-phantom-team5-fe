// authSlice.tsx

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import baseUrl from 'utils/url';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import { RootState } from '../store';

import { login, logout } from '../api/authApi';
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  userInfo: null,
  userToken,
  isAuthonticated: false,
  loading: false,
  success: false,
  state: {
    isFetching: false,
  },

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.data.user_id;
      state.userToken = action.payload.data.access_token;
      state.success = true;
      state.isAuthonticated = true;
      localStorage.setItem('userToken', action.payload.data.access_token);
      return state;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userInfo = null;
      state.userToken = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log('loged out');
      state.loading = false;
    });
  },
});

export const { setIsFetching } = authSlice.actions;
export default authSlice.reducer;
