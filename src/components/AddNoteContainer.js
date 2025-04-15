import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import {
  addNote,
  addNoteToTrash,
  editNote,
  removeNote,
} from "../redux/NotesSlice";
import { FaListUl } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import NoteFooterButtons from "./NoteFooterButtons"; // Importing the new NoteFooterButtons component

function AddNoteContainer({ onSave, isEdit = false, note = {}, noteOption }) {
  const [noteText, setNoteText] = useState(note.content || "");
  const [noteTitle, setNoteTitle] = useState(note.title || "");
  const [isFocused, setIsFocused] = useState(false);
  const [image, setImage] = useState(note.img || "");
  const [bgrColor, setBgrColor] = useState(
    note.bgColor != "#202124" ? note.bgColor : "#202124",
  );

  const selectedLabel = useSelector(
    (state) => state.notes.selectedLabel || null,
  );

  const [labels, setLabels] = useState(note.labels || []);
  const noteRef = useRef(null);
  const dispatch = useDispatch();

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

    setBgrColor("#202124"); // Reset to default dark color

    setImage("");
    setIsFocused(false);
    if (onSave) {
      onSave();
    }
    setLabels([]); // Reset labels
  };
  const dispatchNote = () => {
    if (!isEdit) {
      const noteData = {
        title: noteTitle,
        content: noteText,
        bgColor: bgrColor,
        id: new Date().toISOString(),
        img: image,
        labels,
      };
      dispatch(addNote(noteData));
    } else if (onSave && isEdit) {
      if (
        noteTitle !== note.title ||
        noteText !== note.content ||
        image !== note.img ||
        labels !== note.labels ||
        bgrColor !== note.bgColor
      ) {
        dispatch(
          editNote({
            id: note.id,
            content: noteText,
            title: noteTitle,
            img: image,
            labels: labels,
            bgColor: bgrColor,
          }),
        );
      }
      onSave();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [noteRef, isEdit, noteTitle, noteText, image]);

  const handleColorSelect = (color) => {
    console.log("Selected color:", color);
    setBgrColor(color);
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
      if (!isEdit && !noteText.trim() && !noteTitle.trim() && !isFocused) {
        dispatchNote();

        resetContainer();
      }
      // Logs the updated image URL
    }
  }, [image]);
  useEffect(() => {
    if (selectedLabel && !labels.includes(selectedLabel)) {
      setLabels((prevLabels) => [...prevLabels, selectedLabel]);
    }
  }, [selectedLabel, labels]);
  const handleRemove = () => {
    if (onSave) {
      //console.log("removing :", note.id);
      dispatch(addNoteToTrash(note.id));
      onSave();
    }
  };
  const handleClickClose = () => {
    console.log("colors: ", bgrColor, note.bgColor);
    if (
      noteTitle !== note.title ||
      noteText !== note.content ||
      image !== note.img ||
      labels !== note.labels ||
      bgrColor !== note.bgColor
    ) {
      // Dispatch note
      dispatchNote();
    }
    resetContainer();
    if (onSave) {
      onSave();
    }
  };
  return (
    <div
      ref={noteRef}
      className={`mx-auto max-w-xl  ${
        isFocused || isEdit ? "p-2" : "px-2 "
      } rounded-lg shadow-xl shadow-gray-900/50 border border-zinc-700 flex justify-between mb-2 transition-all duration-200`}
      style={{
        backgroundColor: bgrColor,
        color: "#fff",
      }}
    >
      <form className="flex flex-col justify-center space-y-2 w-full ">
        {/* Show image if uploaded */}
        {image && (
          <div className="mt-2 relative group ">
            <div className="max-h-[500px] overflow-auto">
              <img
                src={image}
                alt="Note"
                className="w-full object-contain rounded-lg"
              />
            </div>
            {/* Bin Icon */}
            <button
              onClick={() => setImage("")}
              className="absolute bottom-2 right-2 bg-zinc-700 hover:bg-zin-800 opacity-0 group-hover:opacity-100 p-1  hover:text-white text-zinc-400 transition-all"
              title="Remove Image"
            >
              <FaTrash className="w-6 h-6" />
            </button>
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

        {/* Title and Content Area */}
        {(isFocused || isEdit) && (
          <input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            type="text"
            className="w-full text-lg font-semibold px-2 focus:outline-none bg-transparent text-white"
            placeholder="Title"
          />
        )}
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full px-2 text-white font-bold  bg-transparent border-none focus:outline-none resize-none"
          placeholder="Take a note..."
          rows={isFocused || isEdit ? 3 : 1}
        />

        {(isFocused || isEdit) && (
          <>
            {/* Labels  */}
            <div className="flex items-center justify-start gap-2">
              {labels.map((label) => (
                <span
                  key={label}
                  className="border border-zinc-400 text-white text-shadow-lg rounded-full px-1 py-[2px] text-[10.5px] font-semibold"
                >
                  {label}
                </span>
              ))}
            </div>

            <NoteFooterButtons
              handleColorSelect={handleColorSelect}
              isEdit={isEdit}
              handleRemove={handleRemove}
              handleImageUpload={handleImageUpload}
              setLabels={setLabels}
              labels={labels}
              handleClickClose={handleClickClose}
              note={note}
            />
          </>
        )}
      </form>
      {!isFocused && !isEdit && (
        <div className="flex gap-3 justify-center">
          <div className="relative flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-600 transition">
            <button type="button">
              <div className="relative flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-600 transition">
                <FaListUl
                  className="text-white hover:text-gray-400 "
                  title="NewList"
                />
              </div>
            </button>
          </div>
          <div className="relative flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-600 transition">
            <button type="button">
              <label
                htmlFor="imageUpload"
                className="relative flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-600 transition"
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
