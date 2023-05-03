import { createSlice } from '@reduxjs/toolkit';

import { resetPassword } from '../api/resetPasswordApi';

const initialState = {
  password: null,
  confirm_password: null,
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.password = action.payload.data.password;
      state.confirm_password = action.payload.data.confirm_password;
      state.success = true;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
