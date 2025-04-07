import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { FiMoreVertical, FiImage, FiBell } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import ColorPicker from "./ColorPicker"; // Assuming you have a ColorPicker component

function NoteFooterButtons({
  handleColorSelect,
  handleRemove,
  isEdit = false,
  handleImageUpload,
  isHovered = false,
  setLabels,
  labels = [],
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [showLabelMenu, setShowLabelMenu] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(labels);
  const allLabels = useSelector((state) => state.labels.labels || []);

  const onClose = () => {
    console.log(selectedLabels);
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
    console.log("Delete note clicked");
    handleRemove();
  };

  return (
    <div className="flex justify-between items-center">
      {/* List & Color Picker */}
      <div className="flex gap-3 relative">
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
            <FaPalette
              size={20}
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
            e.stopPropagation(); // Prevent card click
          }}
        >
          <FiBell
            className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "
            title=" Remind me"
          />
        </label>

        {/* Add image */}
        <label className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition">
          <FiImage
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
              size={20}
              className="text-white hover:text-gray-200"
              title="More"
            />
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute z-[9999] right-0 mt-1 w-48 bg-gray-700 text-white shadow-lg rounded-sm py-1  text-xs"
            >
              {isEdit && (
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemoveClick}
                >
                  Delete note
                </button>
              )}
              <button
                className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLabelMenu(!showLabelMenu);
                }}
              >
                {labels && labels.length > 0 ? "Change label" : "Add label"}
              </button>
              {showLabelMenu && (
                <div className="absolute z-[9999] right-0 mt-1 w-48 bg-gray-700 text-white shadow-lg rounded-sm py-2 text-xs">
                  <div className="p-3 text-sm">Select Labels</div>
                  <div className="space-y-1">
                    {allLabels.map((label) => (
                      <label
                        key={label}
                        className="flex items-center space-x-2"
                      >
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
                      className="w-full py-1 text-xs text-center bg-gray-600 rounded-sm hover:bg-gray-500"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
              {isEdit && (
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Make a copy
                </button>
              )}
              <button
                className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                onClick={handleRemove}
              >
                Show checkboxes
              </button>
              {isEdit && (
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Grab image text
                </button>
              )}
              {isEdit && (
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Copy to google doc
                </button>
              )}
              {isEdit && (
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Version history
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default NoteFooterButtons;
