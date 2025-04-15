import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import { useState } from "react";
import NoteModal from "./NoteModal"; // Import modal component
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch } from "react-redux";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  recoverNoteFromTrash,
  removeNoteFromArchive,
  addNoteToArchive,
  addNoteToTrash,
} from "../redux/NotesSlice";

function NoteContainer({ menuOpen, noteOption }) {
  const notes = useSelector((state) => state.notes[noteOption] || []); // Get notes from Redux store
  const [selectedNote, setSelectedNote] = useState(null);

  const dispatch = useDispatch(); // Set up dispatch

  const selectedLabel = useSelector((state) => state.notes.selectedLabel);
  const searchQuery = useSelector(
    (state) => state.notes.searchQuery || "",
  ).toLowerCase();
    const [undoMode, setUndoMode] = useState("");
    const [open, setOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [hoveredNote, setHoveredNote] = useState(null);

  const filteredNotes = notes
    .filter((note) =>
      selectedLabel ? note.labels?.includes(selectedLabel) : true,
    )
    .filter((note) =>
      searchQuery
        ? note.title?.toLowerCase().includes(searchQuery) ||
          note.content?.toLowerCase().includes(searchQuery)
        : true,
    );
    const handleUndo = () => {
      if (hoveredNote){
        console.log("Undo action triggered for note:", hoveredNote.id);
        if (undoMode === "trash") {
          dispatch(recoverNoteFromTrash(hoveredNote.id));
        } else if (undoMode === "archive") {
          dispatch(removeNoteFromArchive(hoveredNote.id));
        } else if (undoMode === "unarchive") {
          dispatch(addNoteToArchive(hoveredNote.id));
        } else if (undoMode === "restore") {
          dispatch(addNoteToTrash(hoveredNote.id));
        }
      }
      };
   const closeSnackbar = () => {
    setOpen(false);
  };
    const action = (
      <React.Fragment>
        <Button color="warning" size="small" onClick={handleUndo}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackbar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
    useEffect(() => {
      if(open){
        setTimeout(() => {
          setOpen(false);
          setHoveredNote(null);
        }, 6000); // Close the snackbar after 6 seconds
      }
    },[open]);

    useEffect(() => {
      if (hoveredNote) {
        console.log("Hovered note:", hoveredNote.id);
      }
    }
    , [hoveredNote]);
  

  return (
    <div className=" ">
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          600: 2,
          859: 3,
          1150: 4,
          1200: 5,
        }}
      >
        <Masonry gutter="0px">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => setSelectedNote(note)}
              noteOption={noteOption}
              setHoveredNote={setHoveredNote}
              setUndoMode={setUndoMode}
              setOpen={setOpen}
              setAlertMsg={setAlertMsg}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {/* Modal for Editing */}
      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
            {/* Snackbar for undo action */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={alertMsg}
        action={action}
      />
    </div>
  );
}

export default NoteContainer;
