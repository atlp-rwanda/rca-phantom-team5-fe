import { createSlice } from '@reduxjs/toolkit';
import { getRoutes } from '../api/routeApi';

const initialState = {
  routesStatus: 'idle',
  success: false,
  routes: [],
  state: {
    isFetching: false,
  },
};

const routeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
  },
  extraReducers: (builder) => {
    // get All
    builder.addCase(getRoutes.pending, (state) => {
      state.routesStatus = 'loading';
    });
    builder.addCase(getRoutes.fulfilled, (state, action) => {
      state.routesStatus = 'success';
      state.routes = action.payload.data.rows;
      state.success = true;
    });
    builder.addCase(getRoutes.rejected, (state, action) => {
      state.routesStatus = 'failed';
    });
  },
});

export const { setIsFetching } = routeSlice.actions;
export default routeSlice.reducer;
