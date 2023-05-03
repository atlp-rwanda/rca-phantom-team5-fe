import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import baseUrl from 'utils/url';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

export const GetBuses = createAsyncThunk(
    'buses/get-buses',
    async (
        payload: { from: number; to: number },
        thunkAPI,
    ) => {
        try {
            const { data } = await axios.get(`${baseUrl}/buses/get-buses/${payload.from}/${payload.to}`);
            console.log(payload);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);