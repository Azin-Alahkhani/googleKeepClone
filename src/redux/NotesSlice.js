import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    { id: 1, title: "First Note", content: "This is my first note. Lets make it a tad bit longer to check the ui under different conditions", labels: ["Work"] ,bgColor:""},
    { id: 2, title: "Second Note", content: "Google Keep Clone! lets see how close we can get to the actual design. seems easy but we'll have to wait and see.", labels: ["Personal"],bgColor:"" },
  ],
  selectedLabel: null, // For filtering
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
       console.log("Before adding:", state.notes); // Log state before mutation
  state.notes.push(action.payload);
  console.log("After adding:", state.notes);
    },
    removeNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    editNote: (state, action) => {
      const { id, title, content, labels } = action.payload;
      const note = state.notes.find(note => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
        note.labels = labels;
      }
    },
    setSelectedLabel: (state, action) => {
      state.selectedLabel = action.payload;
    },
  },
});

export const { addNote, removeNote, editNote, setSelectedLabel } = notesSlice.actions;
export default notesSlice.reducer;
