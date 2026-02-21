import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
    clearFeed: () => [],
  },
});

export const { addFeed, removeFeed, clearFeed } = feedSlice.actions;

export default feedSlice.reducer;
