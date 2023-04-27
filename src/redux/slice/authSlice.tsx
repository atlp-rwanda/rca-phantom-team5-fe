import { createSlice } from '@reduxjs/toolkit';
import { login, updateUser } from '../api/authApi';

// initialize userToken from local storage
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
  reducers: {
    // logout: (state) => {
    //   localStorage.removeItem('userToken'); // delete token from storage
    //   state.loading = false;
    //   state.userInfo = null;
    //   state.userToken = null;
    // },
    // setCredentials: (state, { payload }: PayloadAction<any>) => {
    //   state.userInfo = payload;
    // },
  },
  extraReducers: (builder) => {
    //login user
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.data;
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

// export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
