import { createSlice } from '@reduxjs/toolkit';
import { login, updateUser } from '../api/authApi';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  userInfo: null,
  userToken,
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login user
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.data.user_id;
      state.userToken = action.payload.data.access_token;
      state.success = true;
      localStorage.setItem('userToken', action.payload.data.access_token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });

    // get user profile
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
  },
});

export default authSlice.reducer;
