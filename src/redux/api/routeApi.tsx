import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from 'utils/url';

export const getRoutes = createAsyncThunk('routes/get-routes', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${baseUrl}/routes/get-routes`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
