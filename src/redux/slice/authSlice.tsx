import { createSlice } from '@reduxjs/toolkit';
import { login, updateUser } from '../api/authApi';
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

const initialState = {
  userInfo: null,
  userToken,
  isAuthonticated: false,
  loading: false,
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
    //login user
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.data.user_id;
      state.userToken = action.payload.data.access_token;
      state.success = true;
      state.isAuthonticated = true;
      localStorage.setItem('userToken', action.payload.data.access_token);
      return state;
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

export const { setIsFetching } = authSlice.actions;
export default authSlice.reducer;
