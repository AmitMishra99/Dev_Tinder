import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
    clearRequests: () => [],
  },
});

export const { addRequests, removeRequests, clearRequests } =
  requestSlice.actions;

export default requestSlice.reducer;
