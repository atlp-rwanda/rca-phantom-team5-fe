import { createSlice } from '@reduxjs/toolkit';

import { sendEmail } from '../api/passwordResetEmailApi';

const initialState = {
  email: null,
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: 'sendEmail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.payload.data.email;
      state.success = true;
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
