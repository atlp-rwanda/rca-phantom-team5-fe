import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import baseUrl from 'utils/url';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import { RootState } from '../store';

export const RegisterUser = createAsyncThunk(
  'auth/register-user',
  async (
    payload: { fname: string; lname: string; nid: string; email: string; role: string; driver_licence: any },
    thunkAPI,
  ) => {
    try {
      const token = localStorage.getItem('userToken');
      if ((payload.driver_licence = [])) {
        let requestData = {
          fname: payload.fname,
          lname: payload.lname,
          nid: payload.nid,
          email: payload.email,
          role: payload.role,
        };
        const { data } = await axios.post(`${baseUrl}/auth/register-user`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      }

      const { data } = await axios.post(`${baseUrl}/auth/register-user`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const userProfile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const { data: response } = await axios.get(`${baseUrl}/users/get-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const token = localStorage.getItem('userToken');
    console.log(token);
    const data = await axios.delete(`${baseUrl}/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error: any) {
    console.error(error);
  }
});
