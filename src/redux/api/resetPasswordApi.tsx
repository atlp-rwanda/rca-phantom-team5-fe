import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from 'utils/url';

const token = window.location.pathname.split('reset-password/')[1];
export const resetPassword = createAsyncThunk(
  `${baseUrl}/auth/reset-password/${token}`,
  async (payload: { password: string; confirm_password: string }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${baseUrl}/auth/reset-password/${token}`, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
