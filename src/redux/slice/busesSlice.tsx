import { createSlice } from '@reduxjs/toolkit';

import { GetBuses } from '../api/viewBusesApi';

const initialState = {
    buses: [],
    status: 'idle',
    loading: false,
    success: false,
};

const busSlice = createSlice({
    name: 'buses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetBuses.pending, (state) => {
            state.loading = true;
            state.status = 'loading';
        });
        builder.addCase(GetBuses.fulfilled, (state, action) => {
            state.loading = false;
            state.buses = action.payload.data;
            state.success = true;
            state.status = 'success';
        });
        builder.addCase(GetBuses.rejected, (state, action) => {
            state.loading = false;
            state.status = 'failed';
        });
    },
});
export const selectAllBuses = (state: { locactions: { buses: any } }) => state.locactions.buses;
export default busSlice.reducer;
