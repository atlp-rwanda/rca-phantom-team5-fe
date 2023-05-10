import { createSlice } from '@reduxjs/toolkit';

import { createRoute } from '../api/createRouteApi';

const initialState = {
  route_name: null,
  start: null,
  end: null,
  stops: null,
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: 'createRoute',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createRoute.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createRoute.fulfilled, (state, action) => {
      state.loading = false;
      state.route_name = action.payload.data.route_name;
      state.start = action.payload.data.start;
      state.end = action.payload.data.end;
      state.stops = action.payload.data.stops;
      state.success = true;
    });
    builder.addCase(createRoute.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
