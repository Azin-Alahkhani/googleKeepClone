import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import { FiMoreVertical, FiImage, FiBell } from "react-icons/fi";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { FaTrashRestore } from "react-icons/fa";
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
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [showLabelMenu, setShowLabelMenu] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(labels || []);
  const allLabels = useSelector((state) => state.labels.labels || []);

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
          : [...prevSelected, label] // Select
    );
  };
  const handleRemoveClick = () => {
    //show a confirmation dialog with undo option

    //("Delete note clicked");
    handleRemove();
  };
  const handleArchiveClick = () => {
    if (noteOption === "archivedNotes") {
      dispatch(removeNoteFromArchive(note.id));
    } else {
      dispatch(addNoteToArchive(note.id));
    }
  };
  const trashClick = () => {
    dispatch(addNoteToTrash(note.id));
  };
  const handleDeleteForever = () => {
    dispatch(removeNote(note.id));
  };

  const handleRecover = () => {
    dispatch(recoverNoteFromTrash(note.id));
  };

  useEffect(() => {
    //console.log("selected :", selectedLabels);
    setLabels(selectedLabels);
  }, [selectedLabels]);
  return (
    <div className="flex justify-between items-center">
      {noteOption !== "trashNotes" && (
        <div className="flex gap-2 relative">
          {/* Color Picker Button */}
          <div className="relative inline-block ">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowColorPicker(!showColorPicker);
              }}
              className="p-2 rounded-full   hover:bg-gray-600"
            >
              <MdOutlinePalette
                size={15}
                className="text-white hover:text-gray-200  "
                title="Background options"
              />
            </button>

            {showColorPicker && (
              <div className="absolute top-10 left-0 z-[9999] shadow-lg">
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

          {/* Add image */}
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
          <label
            className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
            role="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleArchiveClick();
            }}
          >
            {noteOption == "archivedNotes" ? (
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
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent card click
                setMenuOpen(!menuOpen);
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
                className="absolute z-[9999] right-0 mt-1 w-48 bg-zinc-700 text-white shadow-lg rounded-sm py-1  text-xs"
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
                <button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                  Show checkboxes
                </button>
                {isEdit && (
                  <button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                    Grab image text
                  </button>
                )}
                {isEdit && (
                  <button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                    Copy to google doc
                  </button>
                )}
                {isEdit && (
                  <button className="block px-4 py-2 text-sm hover:bg-zinc-600 w-full text-left">
                    Version history
                  </button>
                )}
              </div>
            )}
            {showLabelMenu && (
              <div className="absolute z-[9999] right-0  top-0 h-full w-48 bg-zinc-700 text-white shadow-lg rounded-sm py-2 text-xs">
                <div className="p-3 text-sm">Select Labels</div>
                <div className="space-y-1">
                  {allLabels.map((label) => (
                    <label key={label} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedLabels.includes(label)}
                        onChange={() => handleLabelToggle(label)}
                        className="text-white"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-2">
                  <button
                    onClick={onClose}
                    className="w-full py-1 text-xs text-center bg-zinc-600 rounded-sm hover:bg-zinc-500"
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
    </div>
  );
}
export default NoteFooterButtons;
