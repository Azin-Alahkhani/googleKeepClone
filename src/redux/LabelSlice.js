import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  labels: ["Work", "Personal", "Ideas"], // Default labels
};

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    addLabel: (state, action) => {
      if (!state.labels.includes(action.payload)) {
        state.labels.push(action.payload);
      }
    },
    removeLabel: (state, action) => {
      state.labels = state.labels.filter(label => label !== action.payload);
    },
  },
});

export const { addLabel, removeLabel } = labelsSlice.actions;
export default labelsSlice.reducer ;
