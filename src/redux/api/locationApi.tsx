import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import baseUrl from 'utils/url';

import { RootState } from '../store';

export const GetLocations = createAsyncThunk('locations/get-locations', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`${baseUrl}/locations/get-locations`);
        return data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
