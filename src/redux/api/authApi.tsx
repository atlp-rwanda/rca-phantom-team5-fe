import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from 'utils/url';

export const RegisterUser = createAsyncThunk(
  'auth/register-user',
  async (
    payload: { fname: string; lname: string; nid: string; email: string; role: string; driver_licence: any },
    thunkAPI,
  ) => {
    try {
      if ((payload.driver_licence = [])) {
        let requestData = {
          fname: payload.fname,
          lname: payload.lname,
          nid: payload.nid,
          email: payload.email,
          role: payload.role,
        };
        const { data } = await axios.post(`${baseUrl}/auth/register-user`, requestData);
        return data;
      }
      const { data } = await axios.post(`${baseUrl}/auth/register-user`, payload);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

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
