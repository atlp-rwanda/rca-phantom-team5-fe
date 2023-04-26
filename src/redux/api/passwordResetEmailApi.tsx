import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import baseUrl from 'utils/url';

export const sendEmail = createAsyncThunk(
  'http://localhost:3000/api/auth/reset-password-email',
  async (payload: { email: string }, thunkAPI) => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/reset-password-email', payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
