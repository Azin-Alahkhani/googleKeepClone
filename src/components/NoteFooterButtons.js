import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiImage, FiBell } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import ColorPicker from "./ColorPicker"; // Assuming you have a ColorPicker component

function NoteFooterButtons({
  handleColorSelect,
  handleRemove,
  isEdit = false,
  handleImageUpload,
  isHovered = false,
}) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleRemoveClick = () => {
    console.log("Delete note clicked");
    handleRemove();
  };
  useEffect(() => {
    if (!isHovered) {
      setMenuOpen(false);
      setShowColorPicker(false);
    }
  }, [isHovered]);

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
            <div className="absolute top-10 left-0 z-100 shadow-lg">
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
        {isEdit && (
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
                className="absolute z-100 right-0 mt-1 w-48 bg-gray-700 text-white shadow-lg rounded-sm py-1  text-xs"
              >
                <button
                  className="block px-4 py-2 text-sm hover:bg-gray-600 w-full text-left"
                  onClick={handleRemoveClick}
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
