import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from 'utils/url';

export const createRoute = createAsyncThunk(
  `${baseUrl}/routes/create-routes`,
  async (payload: { route_name: string; start: string; end: string; stops: any }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseUrl}/routes/create-routes`, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
