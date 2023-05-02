import { createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction, Dispatch } from 'redux';
import axios from 'axios';
import baseUrl from 'utils/url';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

export const GetLocations = createAsyncThunk(
    'locations/get-locations',
    async (
        _,
        thunkAPI,
    ) => {
        try {
            const { data } = await axios.get(`${baseUrl}/locations/get-locations`);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);