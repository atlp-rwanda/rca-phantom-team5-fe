import { createSlice } from '@reduxjs/toolkit';
import { GetLocations } from '../api/locationApi';


const initialState = {
    locations: [],
    status: 'idle',
    loading: false,
    success: false,
};

const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetLocations.pending, (state) => {
            state.loading = true;
            state.status = 'loading';
        });
        builder.addCase(GetLocations.fulfilled, (state, action) => {
            state.loading = false;
            state.locations = action.payload.data;
            state.success = true;
            state.status = 'success';
            localStorage.setItem('userToken', action.payload.data.access_token);
        });
        builder.addCase(GetLocations.rejected, (state, action) => {
            state.loading = false;
            state.status = 'failed';
        });
       
    },
});
export const selectAllLocations = (state: { locactions: { locations: any; }; }) => state.locactions.locations;
export default locationSlice.reducer;
