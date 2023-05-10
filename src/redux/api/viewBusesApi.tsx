import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import baseUrl from 'utils/url';

import { RootState } from '../store';

export const GetBuses = createAsyncThunk('buses/get-buses', async (payload: { from: number; to: number }, thunkAPI) => {
    try {
        const { data } = await axios.get(`${baseUrl}/buses/get-buses/${payload.from}/${payload.to}`);
        console.log(payload);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
