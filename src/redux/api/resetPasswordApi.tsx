import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from 'utils/url';

const params = new URLSearchParams(window.location.search);
const token = params.get('token');
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
