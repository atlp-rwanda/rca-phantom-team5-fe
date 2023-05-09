import { createSlice } from '@reduxjs/toolkit';

import { GetBuses, getAllBuses } from '../api/viewBusesApi';

const initialState = {
  buses: [],
  routes: [],
  status: 'idle',
  loading: false,
  success: false,
  AllBuses: [],
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
      state.routes = action.payload.data[0].routes;
      state.success = true;
      state.status = 'success';
    });
    builder.addCase(GetBuses.rejected, (state, action) => {
      state.loading = false;
      state.status = 'failed';
    });

    //get All buses
    builder.addCase(getAllBuses.pending, (state) => {
      state.loading = true;
      state.status = 'loading';
    });
    builder.addCase(getAllBuses.fulfilled, (state, action) => {
      state.loading = false;
      state.AllBuses = action.payload.data.rows;
      state.success = true;
      state.status = 'success';
    });
    builder.addCase(getAllBuses.rejected, (state, action) => {
      state.loading = false;
      state.status = 'failed';
    });
  },
});
export const selectAllBuses = (state: { locactions: { buses: any } }) => state.locactions.buses;
export default busSlice.reducer;
