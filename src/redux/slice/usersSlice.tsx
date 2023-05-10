import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../api/usersApi';

const initialState = {
  allUserStatus: 'idle',
  success: false,
  users: [],
  state: {
    isFetching: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true;
    },
  },
  extraReducers: (builder) => {
    // get All
    builder.addCase(getAllUsers.pending, (state) => {
      state.allUserStatus = 'loading';
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUserStatus = 'success';
      state.users = action.payload.data;
      state.success = true;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.allUserStatus = 'failed';
    });
  },
});

export const { setIsFetching } = userSlice.actions;
export default userSlice.reducer;
