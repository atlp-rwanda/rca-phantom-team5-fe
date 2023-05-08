import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from 'utils/url';

export const getAllUsers = createAsyncThunk('users/get-users', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${baseUrl}/users/get-users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
