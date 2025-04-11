import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: 1,
      title: "First Note",
      content:
        "This is my first note. Lets make it a tad bit longer to check the ui under different conditions",
      labels: ["Work", "Personal"],
      bgColor: "#202124",
      img: "",
    },
    {
      id: 2,
      title: "Second Note",
      content:
        "Google Keep Clone! lets see how close we can get to the actual design. seems easy but we'll have to wait and see.",
      labels: ["Personal"],
      bgColor: "#202124",
      img: "",
    },
    {
      id: 3,
      title: "mnbn",
      content:
        "Google Keep Clone! lets see how close we can get to the actual design. seems easy but we'll have to wait and see.",
      labels: ["Work"],
      bgColor: "#202124",
      img: "",
    },
    {
      id: 4,
      title: "Smbh",
      content: "jhfbhejhfbhejhfbhejhfbhe.",
      labels: ["Work"],
      bgColor: "#202124",
      img: "",
    },
    {
      id: 5,
      title: "no",
      content: "kaj ajkf.",
      labels: [],
      bgColor: "#202124",
      img: "",
    },
    {
      id: 6,
      title: "hi",
      content: "new note.",
      labels: ["Personal"],
      bgColor: "#202634",
      img: "",
    },
  ],
  selectedLabel: null, // For filtering
  archivedNotes: [],
  trashNotes: [],
  Reminders: [],
  searchQuery: "",
  HeaderTitle: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action) => {
      state.trashNotes = state.trashNotes.filter(
        (note) => note.id !== action.payload
      );
    },
    editNote: (state, action) => {
      const { id, title, content, labels, img } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
        note.labels = labels;
        note.bgColor = action.payload.bgColor || note.bgColor;
        note.img = img;
      }
    },
    setSelectedLabel: (state, action) => {
      state.selectedLabel = action.payload;
    },
    addNoteToArchive: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      //console.log("note being archived: ", note);
      if (note) {
        //console.log("note being archived: ", note);
        state.archivedNotes.push(note);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      }
    },
    removeNoteFromArchive: (state, action) => {
      const note = state.archivedNotes.find(
        (note) => note.id === action.payload
      );
      if (note) {
        state.notes.push(note);
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== action.payload
        );
      }
    },
    addNoteToTrash: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        state.trashNotes.push(note);
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      }
      const archivedNote = state.archivedNotes.find(
        (note) => note.id === action.payload
      );
      if (archivedNote) {
        state.trashNotes.push(archivedNote);
        state.archivedNotes = state.archivedNotes.filter(
          (note) => note.id !== action.payload
        );
      }
      const reminderNote = state.Reminders.find(
        (note) => note.id === action.payload
      );
      if (reminderNote) {
        state.trashNotes.push(reminderNote);
        state.Reminders = state.Reminders.filter(
          (note) => note.id !== action.payload
        );
      }
    },

    recoverNoteFromTrash: (state, action) => {
      const note = state.trashNotes.find((note) => note.id === action.payload);
      if (note) {
        state.notes.push(note);
        state.trashNotes = state.trashNotes.filter(
          (note) => note.id !== action.payload
        );
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setHeaderTitle: (state, action) => {
      state.HeaderTitle = action.payload;
    },
  },
});

export const {
  addNote,
  removeNote,
  editNote,
  setSelectedLabel,
  addNoteToArchive,
  addNoteToTrash,
  recoverNoteFromTrash,
  removeNoteFromArchive,
  setSearchQuery,
  setHeaderTitle,
} = notesSlice.actions;
export default notesSlice.reducer;
