import React, { useState, useRef } from "react";
import { FiMoreVertical, FiImage } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import ColorPicker from "./ColorPicker"; // Assuming you have a ColorPicker component

function NoteFooterButtons({
  handleColorSelect,
  handleRemove,
  isEdit = false,
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
            <div className="absolute top-10 left-0 z-10 shadow-lg">
              <ColorPicker
                showPalette={showColorPicker}
                onColorSelect={handleColorSelect}
                setShowPalette={setShowColorPicker}
              />
            </div>
          )}
        </div>
        <label
          htmlFor="imageUpload"
          className="relative flex items-center cursor-pointer p-2 rounded-full hover:bg-gray-600 transition"
        >
          <FiImage
            className="text-white text-xl hover:text-gray-200 hover:bg-gray-600 "
            title="Add Image"
          />
        </label>
        {/* More Options Menu */}
        {isEdit && (
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
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
                className="absolute right-0 mt-1 w-48 bg-gray-700 text-white shadow-lg rounded-sm py-1 z-10 text-xs"
              >
                {" "}
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Delete note
                </button>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Add label
                </button>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Make a copy
                </button>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Show checkboxes
                </button>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Grab image text
                </button>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Copy to google doc
                </button>
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemove}
                >
                  Version history
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default NoteFooterButtons;
