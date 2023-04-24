import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import baseUrl from 'utils/url';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState = {
  userInfo: null,
  userToken,
  loading: false,
  success: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string, device_id: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/signin`, payload);
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async(dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`${baseUrl}/auth/logout`,{headers: {Authorization: `Bearer ${token}`}});
      localStorage.removeItem('userToken');
      dispatch(logoutSuccess());
    } catch (error: any) {
      console.error(error);
      dispatch(logoutFailure(error.message));
    }
  });


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.userInfo = null;
      state.userToken = null;
    },
    logoutFailure: (state, action) => {
      console.error(action.payload);
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
      localStorage.setItem('userToken', action.payload.data.access_token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { logoutSuccess, logoutFailure } = authSlice.actions;

export default authSlice.reducer;
