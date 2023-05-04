import { createSlice } from '@reduxjs/toolkit';

import { getProfile, login, updateUser } from '../api/authApi';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  userInfo: null,
  userToken,
  isAuthonticated: false,
  loading: false,
  user_id: 0,
  userStatus: 'idle',
  success: false,
  state: {
    isFetching: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload.data.access_token;
      state.user_id = action.payload.data.user_id;
      state.success = true;
      state.isAuthonticated = true;
      localStorage.setItem('userToken', action.payload.data.access_token);
      return state;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });

    // update user profile
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.data;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
    });

    // get user profile
    builder.addCase(getProfile.pending, (state) => {
      state.userStatus = 'loading';
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.userStatus = 'success';
      state.userInfo = action.payload.data;
      state.success = true;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.userStatus = 'failed';
    });
  },
});

export const { setIsFetching } = authSlice.actions;
export default authSlice.reducer;
