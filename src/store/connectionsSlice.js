import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => {
      return state.filter((req) => req._id !== action.payload);
    },
    clearConnections: () => [],
  },
});

export const { addConnections, removeConnections, clearConnections } =
  connectionsSlice.actions;

export default connectionsSlice.reducer;
