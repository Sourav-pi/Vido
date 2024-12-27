import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  isFetching: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
    },
    fetchSuccess: (state, action) => {
      state.currentVideo = action.payload;
      state.isFetching = false;
    },
    fetchFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
          (id) => id !== action.payload
        );
      } else {
        state.currentVideo.likes = state.currentVideo.likes.filter(
          (id) => id !== action.payload
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes = state.currentVideo.dislikes.filter(
          (id) => id !== action.payload
        );
      } else {
        state.currentVideo.dislikes = state.currentVideo.likes.filter(
          (id) => id !== action.payload
        );
      }
    },
  },
});

export const { fetchFailure, fetchSuccess, fetchStart, like, dislike } =
  videoSlice.actions;
export default videoSlice.reducer;
