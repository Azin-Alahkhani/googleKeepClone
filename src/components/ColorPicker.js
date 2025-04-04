import React, { useEffect, useState } from "react";
import { FaPalette } from "react-icons/fa";

const darkColors = [
  { color: "#77172e", name: "Coral" },
  { color: "#692b16", name: "Peach" },
  { color: "#7c4b02", name: "Sand" },
  { color: "#274d3b", name: "Mint" },
  { color: "#0a625d", name: "Sage" },
  { color: "#266277", name: "Fog" },
  { color: "#284255", name: "Storm" },
  { color: "#472e5c", name: "Dusk" },
  { color: "#6c3850", name: "Blossom" },
  { color: "#4b443a", name: "Clay" },
  { color: "#232427", name: "Chalk" },
];

function ColorPicker({ onColorSelect, showPalette, setShowPalette }) {
  useEffect(() => {});
  return (
    <div className="relative">
      {showPalette && (
        <div className="absolute left-0 mt-2 w-90 p-2 bg-zinc-800 shadow-lg rounded-lg flex flex-row justify-center items-center gap-1">
          {darkColors.map((color) => (
            <div
              key={color.color}
              className="w-6 h-6 rounded-full cursor-pointer border border-gray-700"
              style={{ backgroundColor: color.color }}
              onClick={() => {
                onColorSelect(color.color);
                setShowPalette(false);
              }}
              title={color.name}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
