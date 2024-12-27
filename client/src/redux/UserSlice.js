import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    subscription: (state, action) => {
      if (state?.currentUser?.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers =
          state.currentUser.subscribedUsers.filter(
            (id) => id !== action.payload
          );
      } else {
        state?.currentUser?.subscribedUsers?.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginFailure, logout, loginSuccess, subscription } =
  userSlice.actions;
export default userSlice.reducer;
