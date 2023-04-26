import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import baseUrl from 'utils/url';

const params = new URLSearchParams(window.location.search);
const token = params.get('token');
export const resetPassword = createAsyncThunk(
  `http://localhost:3000/api/auth/reset-password/${token}`,
  async (payload: { email: string }, thunkAPI) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/api/auth/reset-password/${token}`, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
