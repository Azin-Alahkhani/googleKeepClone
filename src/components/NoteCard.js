import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNote, editNote } from "../redux/NotesSlice";
import NoteFooterButtons from "./NoteFooterButtons";
import { useSelector } from "react-redux";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  recoverNoteFromTrash,
  removeNoteFromArchive,
  addNoteToArchive,
  addNoteToTrash,
} from "../redux/NotesSlice";

function NoteCard({ note, onClick, noteOption , setHoveredNote , setAlertMsg ,setOpen, setUndoMode}) {
  const [isHovered, setIsHovered] = useState(false);
  const [bgColor, setBgColor] = useState(note.bgColor); // Initialize with note color
  const [image, setImage] = useState(note.img); // Initialize with note image
  const [labels, setLabels] = useState(note.labels || []); // Initialize with note labels
  //const [undoMode, setUndoMode] = useState("");
  //const [open, setOpen] = useState(false);
  //const [alertMsg, setAlertMsg] = useState("");
  const [btnClicked, setBtnClicked] = useState(false); // Track if button is clicked

  const dispatch = useDispatch(); // Set up dispatch
  const notes = useSelector((state) => state.notes[noteOption] || []); // Get notes from Redux store

  const handleDuplicateNote = (noteId) => {
    const selectedNote = notes.find((note) => note.id === noteId); // Find the note to duplicate
    //console.log("Selected note to duplicate: ", selectedNote);
    if (selectedNote) {
      const duplicatedNote = {
        ...selectedNote,
        id: new Date().getTime(), // Create a unique ID for the duplicated note
        title: selectedNote.title, // Modify the title to indicate it's a copy
      };
      dispatch(addNote(duplicatedNote)); // Add duplicated note to state
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Ensure `image` is a URL
      };
      reader.readAsDataURL(file);
    }
  };
  const dispatchUpdatedNote = () => {
    dispatch(
      editNote({
        id: note.id,
        content: note.content,
        bgColor: bgColor !== "" ? bgColor : note.bgColor,
        title: note.title,
        img: image !== "" ? image : note.img,
        labels: labels,
      }),
    );
  };
  const handleBgChange = (color) => {
    setBgColor(color);
  };
  const closeSnackbar = () => {
    //setOpen(false);
  };
  useEffect(() => {
    if (
      bgColor !== note.bgColor ||
      image !== note.img ||
      labels !== note.labels
    ) {
      dispatchUpdatedNote();
    }
  }, [bgColor, image, labels]);

  const handleRemove = () => {
    dispatch(addNoteToTrash(note.id));
  };

  const showAlert = (message, mode) => {
    console.log("showAlert called in note:", note.id);
    setOpen(false); // Force close first
    setTimeout(() => {
      setUndoMode(mode);
      setAlertMsg(message);
      setOpen(true);
    }, 0);
  };


  return (
    <div
      key={note.index}
      className="relative rounded-b-lg isolate w-full md:w-[260px] lg:w-[240px] sm:w-[80%] border mb-2 border-zinc-600 rounded-lg cursor-pointer hover:shadow-lg duration-200 shadow-md  "
      style={{ backgroundColor: note.bgColor }}
      onClick={onClick}
      onMouseEnter={() => {setIsHovered(true); setHoveredNote(note)}}
      onMouseLeave={() => {setIsHovered(false);}}
    >
      {/* Image (if available) */}
      {note.img && (
        <img
          src={note.img}
          alt="Note"
          className={`w-full h-auto object-cover ${
            !note.title && !note.content ? "rounded-t-lg " : "mb-2 "
          }`}
        />
      )}

      {(note.title !== "" || note.content !== "") && (
        <div className="relative max-w-sm p-4 m-1 rounded-lg ">
          {note.title && (
            <p className="mb-4 text-md font-bold tracking-tight text-white break-words">
              {note.title}
            </p>
          )}
          {note.content && (
            <p className="font-normal text-md text-white mb-1 break-words">
              {note.content}
            </p>
          )}
        </div>
      )}
      {labels.length > 0 && (
        <div className="flex items-center justify-start mb-10 ml-4 gap-2 ">
          {labels.map((label) => (
            <span
              key={label}
              className="border border-zinc-400 text-white text-shadow-lg rounded-full px-1 py-[2px] text-[10.5px] font-semibold "
            >
              {label}
            </span>
          ))}
        </div>
      )}
      {/* Footer with buttons */}
      <div
        tabIndex={0}
        className={`absolute z-1 bottom-0 left-0 right-0 p-1 bg-black  bg-opacity-10 text-white text-sm flex justify-between items-center transition-opacity duration-300 ${
          isHovered || btnClicked ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <NoteFooterButtons
          handleRemove={handleRemove}
          handleColorSelect={handleBgChange}
          isEdit={true}
          handleImageUpload={handleImageUpload}
          isHovered={isHovered}
          labels={note.labels}
          setLabels={setLabels}
          note={note}
          noteOption={noteOption}
          handleDuplicateNote={handleDuplicateNote}
          isCard={true}
          setBtnClicked={setBtnClicked}
          setOpen={setOpen}
          setAlertMsg={setAlertMsg}
          setUndoMode={setUndoMode}
          showAlert={showAlert}
        />
      </div>
    </div>
  );
}

export default React.memo(NoteCard)
