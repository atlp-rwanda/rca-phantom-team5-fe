import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from 'utils/url';
import { useEffect, useState } from 'react';

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

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (payload: { fname?: string; lname?: string; driver_licence?: string[] }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${baseUrl}/users/update-profile`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProfile = createAsyncThunk('auth/get', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${baseUrl}/users/get-profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const token = localStorage.getItem('userToken');
    const data = await axios.delete(`${baseUrl}/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error: any) {
    console.error(error);
  }
});
