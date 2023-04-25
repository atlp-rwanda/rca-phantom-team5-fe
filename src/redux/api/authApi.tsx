import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import baseUrl from 'utils/url';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string; device_id: string }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/signin`, payload);
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const token = localStorage.getItem('userToken');
    const data = await axios.delete(`${baseUrl}/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error: any) {
    console.error(error);
  }
});
