import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { FiMoreVertical, FiImage, FiBell } from "react-icons/fi";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { FaTrashRestore } from "react-icons/fa";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  MdOutlinePersonAddAlt,
  MdOutlineAddAlert,
  MdOutlinePalette,
} from "react-icons/md";
import ColorPicker from "./ColorPicker"; // Assuming you have a ColorPicker component
import {
  addNoteToArchive,
  addNoteToTrash,
  recoverNoteFromTrash,
  removeNote,
  removeNoteFromArchive,
} from "../redux/NotesSlice";
import MyAlert from "./Alert";
import { Snackbar } from "@mui/material";

function NoteFooterButtons({
  handleColorSelect,
  handleRemove,
  isEdit = false,
  handleImageUpload,
  isHovered = false,
  setLabels,
  labels = [],
  handleClickClose,
  note = {},
  noteOption,
  handleDuplicateNote,
  isCard = false,
  setBtnClicked = () => {},
  alertMsg = "",
  open = false,
  undoMode = "",
  setUndoMode = () => {},
  showAlert = () => {},
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const labelMenuRef = useRef(null);
  const paletteRef = useRef(null);
  const [showLabelMenu, setShowLabelMenu] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(labels || []);
  const allLabels = useSelector((state) => state.labels.labels || []);
  //const [undoMode, setUndoMode] = useState("");
  //const [open, setOpen] = useState(false);
  //const [alertMsg, setAlertMsg] = useState("");

  const dispatch = useDispatch();

  const onClose = () => {
    setShowLabelMenu(false);
    setMenuOpen(false);
    setLabels(selectedLabels);
    //setSelectedLabels([]);
  };
  const handleLabelToggle = (label) => {
    setSelectedLabels(
      (prevSelected) =>
        prevSelected.includes(label)
          ? prevSelected.filter((item) => item !== label) // Deselect
          : [...prevSelected, label], // Select
    );
  };
  // click outside to close menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setBtnClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (paletteRef.current && !paletteRef.current.contains(event.target)) {
        setShowColorPicker(false);
        setBtnClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [paletteRef]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        labelMenuRef.current &&
        !labelMenuRef.current.contains(event.target)
      ) {
        setShowLabelMenu(false);
        setBtnClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [labelMenuRef]);
  useEffect(() => {
    if (selectedLabels !== labels) {
      setLabels(selectedLabels);
    }
  }, [selectedLabels]);
  const handleArchiveClick = () => {
    if (noteOption === "archivedNotes") {
      dispatch(removeNoteFromArchive(note.id));
      //setUndoMode("unarchive");
      showAlert("Note unarchived successfully", "unarchive");
    } else {
      console.log("ARCHIVE CLICKED");
      dispatch(addNoteToArchive(note.id));
      console.log("SETTING undoMode, alertMsg, open");
      //setUndoMode("archive");
      showAlert("Note archived successfully", "archive");
    }
  };
  const trashClick = () => {
    console.log("note trash clicked");
    dispatch(addNoteToTrash(note.id));
    //setUndoMode("trash");
    showAlert("Note deleted successfully", "trash");
  };
  const handleDeleteForever = () => {
    dispatch(removeNote(note.id));
    //open confirmation dialog
  };

  const handleRecover = () => {
    dispatch(recoverNoteFromTrash(note.id));
    //setUndoMode("restore");
    showAlert("Note recovered successfully", "restore");
  };

  const handleUndo = () => {
    if (undoMode === "trash") {
      dispatch(recoverNoteFromTrash(note.id));
    } else if (undoMode === "archive") {
      dispatch(removeNoteFromArchive(note.id));
    } else if (undoMode === "unarchive") {
      dispatch(addNoteToArchive(note.id));
    } else if (undoMode === "restore") {
      dispatch(addNoteToTrash(note.id));
    }
  };

  useEffect(() => {
    setLabels(selectedLabels);
  }, [selectedLabels]);

  return (
    <div className="flex justify-between items-center basis-full">
      {noteOption !== "trashNotes" && (
        <div
          className={`flex gap-1 relative ${isCard ? "basis-full justify-between items-center " : ""}`}
        >
          {/* Color Picker Button */}
          <div className="relative inline-block ">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setBtnClicked(true);
                setShowColorPicker(!showColorPicker);
              }}
              className="p-2 rounded-full hover:bg-gray-600"
            >
              <MdOutlinePalette
                size={15}
                className="text-white hover:text-gray-200  "
                title="Background options"
              />
            </button>

            {showColorPicker && (
              <div
                className="absolute bottom-full left-0 z-[9999] shadow-lg"
                ref={paletteRef}
              >
                <ColorPicker
                  showPalette={showColorPicker}
                  onColorSelect={handleColorSelect}
                  setShowPalette={setShowColorPicker}
                />
              </div>
            )}
          </div>

          {/* Reminder Button */}
          <label
            className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <MdOutlineAddAlert
              size={15}
              className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "
              title="Remind me"
            />
          </label>

          {/* Collaborator Button */}
          <label
            className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent card click
            }}
          >
            <MdOutlinePersonAddAlt
              size={15}
              className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "
              title="Collaborator"
            />
          </label>

          {/* Add Image */}
          <label className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition">
            <FiImage
              size={15}
              className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "
              title="Add Image"
            />
            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={handleImageUpload}
            />
          </label>
          {/* Archive Button */}
          <label
            className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleArchiveClick();
            }}
          >
            {noteOption === "archivedNotes" ? (
              <RiInboxUnarchiveLine
                size={15}
                className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "
                title="Unarchive"
              />
            ) : (
              <HiOutlineArchiveBoxArrowDown
                size={15}
                className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "
                title="Archive"
              />
            )}
          </label>
          {/* More Options Menu */}
          <div className="relative" ref={labelMenuRef}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent card click
                setMenuOpen(!menuOpen);
                setBtnClicked(true);
              }}
              className="p-2 rounded-full hover:bg-gray-600"
            >
              <FiMoreVertical
                size={15}
                className="text-white hover:text-gray-200"
                title="More"
              />
            </button>

            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute z-[9999] right-0 bottom-full mt-1 w-48 bg-zinc-700 text-white shadow-lg rounded-sm py-1  text-xs"
              >
                {isEdit && (
                  <button
                    className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left"
                    onClick={trashClick}
                  >
                    Delete note
                  </button>
                )}
                <button
                  className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLabelMenu(!showLabelMenu);
                    setMenuOpen(false);
                  }}
                >
                  {labels && labels.length > 0 ? "Change label" : "Add label"}
                </button>

                {isEdit && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      handleDuplicateNote(note.id);
                    }}
                    className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left"
                  >
                    Make a copy
                  </button>
                )}
                {/*<button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                  Show checkboxes
                </button>*/}
                {isEdit && note.img && (
                  <button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                    Grab image text
                  </button>
                )}
                {/*{isEdit && (
                  <button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                    Copy to google doc
                  </button>
                )}
                {isEdit && (
                  <button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                    Version history
                  </button>
                )}*/}
              </div>
            )}
            {showLabelMenu && (
              <div className="absolute z-[9999] right-0 bottom-full mt-1 w-48 bg-zinc-700 text-white shadow-lg rounded-sm py-1  text-xs">
                <div className="m-1 text-sm">Select Labels</div>
                <div className="mt-2 bg-zinc-700 flex flex-col ">
                  {/*{allLabels.map((label) => (
                    <label key={label} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedLabels.includes(label)}
                        onChange={() => handleLabelToggle(label)}
                        className="text-white bg-zinc-400"
                      />
                      <span>{label}</span>
                    </label>
                  ))}*/}
                  {allLabels.map((label) => (
                    <label
                      key={label}
                      className="flex items-center m-[3px] cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLabels.includes(label)}
                        onChange={() => handleLabelToggle(label)}
                        className="hidden peer"
                      />
                      <div
                        className={`w-4 h-4 mr-1 border rounded-sm flex items-center justify-center
      peer-checked:bg-zinc-500 peer-checked:border-zinc-500 border-zinc-400 transition`}
                      >
                        <svg
                          className="w-3 h-3 text-white hidden peer-checked:block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div className="flex items-center justify-center ">
                  <button
                    onClick={onClose}
                    className="w-[50%] py-1 text-xs text-center bg-zinc-600 rounded-sm hover:bg-zinc-500"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Close Button */}
      {handleClickClose && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClickClose}
            className="px-4 py-2 text-sm text-white  rounded-sm hover:bg-zinc-500"
          >
            Close
          </button>
        </div>
      )}
      {/* Delete  and recover Buttons*/}
      {noteOption === "trashNotes" && (
        <div className="flex flex-row justify-between items-center w-full">
          <button
            type="button"
            onClick={handleDeleteForever}
            className="px-4 py-2 text-sm text-white  hover:bg-zinc-500 hover:bg-opacity-40 rounded-full"
          >
            <FaTrash className="text-white" title=" Delete forever" size={12} />
          </button>
          <button
            type="button"
            onClick={handleRecover}
            className="px-4 py-2 text-sm text-white   hover:bg-zinc-500 hover:bg-opacity-40 rounded-full"
          >
            <FaTrashRestore className="text-white" title="Recover" size={12} />
          </button>
        </div>
      )}
      {/* Alert */}
      
    </div>
  );
}
export default React.memo(NoteFooterButtons);
