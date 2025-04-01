import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./NotesSlice"; 
import labelsReducer from "./LabelSlice"; 

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    labels: labelsReducer, 
  },
});
