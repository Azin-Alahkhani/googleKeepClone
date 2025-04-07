import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { addNote, editNote, removeNote } from "../redux/NotesSlice";
import { FaListUl } from "react-icons/fa";
import { FiImage } from "react-icons/fi";

import NoteFooterButtons from "./NoteFooterButtons"; // Importing the new NoteFooterButtons component

function AddNoteContainer({ onSave, isEdit = false, note = {} }) {
  const [noteText, setNoteText] = useState(note.content || "");
  const [noteTitle, setNoteTitle] = useState(note.title || "");
  const [isFocused, setIsFocused] = useState(false);
  const [image, setImage] = useState(note.img || "");
  const [bgrColor, setBgrColor] = useState(
    note.bgColor != "#202124" ? note.bgColor : "#202124"
  );
  const [isList, setIsList] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const noteRef = useRef(null);

  const dispatch = useDispatch(); // Set up dispatch

  // Handle Click Outside to Collapse
  const handleClickOutside = (e) => {
    if (!noteRef.current) return;
    if (noteRef.current && !noteRef.current.contains(e.target)) {
      if (noteTitle.trim() || noteText.trim() || image.trim()) {
        // Dispatch note
        dispatchNote();
      }
      resetContainer();
    }
  };
  const resetContainer = () => {
    setNoteText("");
    setNoteTitle("");
    setIsList(false);
    setBgrColor("#202124"); // Reset to default dark color
    setShowColorPicker(false);
    setImage("");
    setIsFocused(false);
    setShowColorPicker(false);
  };
  const dispatchNote = () => {
    if (!isEdit) {
      const noteData = {
        title: noteTitle,
        content: noteText,
        bgColor: bgrColor,
        id: new Date().toISOString(),
        img: image,
        labels: [],
      };
      console.log("dispatching new note", bgrColor);
      dispatch(addNote(noteData));
    } else if (onSave) {
      const noteData = {
        id: note.id,
        content: noteText,
        bgColor: bgrColor,
        title: noteTitle,
        img: image,
      };
      console.log("dispatching edited note ", bgrColor);
      dispatch(
        editNote({
          id: note.id,
          content: noteText,
          title: noteTitle,
          img: image,
        })
      );
      onSave();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [noteRef, isEdit, noteTitle, noteText, image]);

  const handleColorSelect = (color) => {
    setBgrColor(color);
    console.log("color selected", color, bgrColor);
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
  useEffect(() => {
    if (image) {
      if (!isEdit && !noteText.trim() && !noteTitle.trim()) {
        dispatchNote();

        resetContainer();
      }
      // Logs the updated image URL
    }
  }, [image]);
  const handleRemove = () => {
    if (onSave) {
      console.log("removing :", note.id);
      dispatch(removeNote(note.id));
      onSave();
    }
  };
  return (
    <div
      ref={noteRef}
      className="mx-auto max-w-xl p-4 rounded-lg shadow-lg shadow-gray-900/50 border dark:border-gray-700 flex justify-between"
      style={{
        backgroundColor: bgrColor,
        color: "#fff",
      }}
    >
      <form className="flex flex-col space-y-2 w-full">
        {/* Show image if uploaded */}
        {image && (
          <div className="mt-2">
            <img
              src={image}
              alt="Note"
              className="w-full max-h-80 rounded-lg"
            />
          </div>
        )}

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageUpload}
        />

        {(isFocused || isEdit) && (
          <input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            type="text"
            className="w-full text-lg font-medium p-2 focus:outline-none bg-transparent text-white"
            placeholder="Title"
          />
        )}
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full p-2 text-white  bg-transparent border-none focus:outline-none resize-none"
          placeholder="Take a note..."
          rows={isFocused || isEdit ? 3 : 1}
        />
        {(isFocused || isEdit) && (
          <NoteFooterButtons
            handleColorSelect={handleColorSelect}
            isEdit={isEdit}
            handleRemove={handleRemove}
          />
        )}
      </form>
      {!isFocused && !isEdit && (
        <div className="flex gap-3 justify-center">
          <div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition">
            <button type="button">
              <FaListUl
                className="text-white hover:text-gray-400 "
                title="NewList"
              />
            </button>
          </div>
          <div className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition">
            <button type="button">
              <label
                htmlFor="imageUpload"
                className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
              >
                <FiImage
                  className="text-white text-xl hover:text-gray-400 hover:bg-gray-600 "
                  title="Add Image"
                />
              </label>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNoteContainer;
