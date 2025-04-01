import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";  // Import useDispatch from react-redux
import { addNote } from "../redux/NotesSlice";
import { FaPalette, FaListUl } from "react-icons/fa";
import ColorPicker from "./ColorPicker"; // Importing the new ColorPicker component

function AddNoteContainer() {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [bgColor, setBgColor] = useState("#202124"); // Default dark color
  const [isList, setIsList] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const noteRef = useRef(null);
  

  const dispatch = useDispatch();  // Set up dispatch

  // Handle Click Outside to Collapse
  const handleClickOutside = (e) => {
    if (noteRef.current && !noteRef.current.contains(e.target)) {
      if (!noteText && !noteTitle) {
        setIsFocused(false);
      }
      setShowColorPicker(false); // Close color picker if clicked outside
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (noteText.trim() || noteTitle.trim()) {
      const noteData = {
        title: noteTitle,
        content: noteText,
        bgColor: bgColor,
        id:new Date().toISOString(),
        labels:[]
      };

      console.log("Dispatching addNote:", noteData); // Log to ensure we're dispatching the correct data
      dispatch(addNote(noteData)); // Dispatch addNote action
      setNoteText("");
      setNoteTitle("");
      setIsList(false);
      setBgColor("#202124"); // Reset to default dark color
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={noteRef}
      className="mx-auto max-w-xl p-4 rounded-lg shadow-lg shadow-gray-900/50 border dark:border-gray-700"
      style={{
        backgroundColor: bgColor,
        color: "#fff",
      }}
    >
      <form className="flex flex-col space-y-2">
        {isFocused && (
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
          rows={isFocused ? 3 : 1}
        />
        {isFocused && (
          <div className="flex justify-between items-center">
            {/* List & Color Picker */}
            <div className="flex gap-3 relative">
              <button type="button" onClick={() => setIsList(!isList)}>
                <FaListUl className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" />
              </button>

              {/* Color Picker Button */}
              <div className="relative inline-block">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowColorPicker(!showColorPicker);
               }}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <FaPalette size={20} className="text-gray-700 dark:text-white" />
                </button>

                {showColorPicker && (
                  <div className="absolute top-10 left-0 z-10 shadow-lg">
                    <ColorPicker onSelectColor={(color) => { setBgColor(color); setShowColorPicker(false); }} />
                  </div>
                )}
              </div>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAddNote}
              className="px-4 py-1 text-sm font-medium bg-amber-300 hover:bg-amber-400 rounded-lg"
            >
              Add
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddNoteContainer;
