import React, { useEffect, useState } from "react";
import { FaPalette } from "react-icons/fa";

const darkColors = [
  "#202124", "#5F6368", "#3C4043", "#6D4C41", "#5C2B29",
  "#3E2723", "#1B5E20", "#004D40", "#0D47A1", "#311B92"
];

function ColorPicker({ onColorSelect , showPalette, setShowPalette }) {
  
useEffect(() => { 
  
})
  return (
    <div className="relative">
     
      {showPalette && (
        <div className="absolute left-0 mt-2 w-40 p-2 bg-gray-800 shadow-lg rounded-lg grid grid-cols-5 gap-2">
          {darkColors.map((color) => (
            <div
              key={color}
              className="w-8 h-8 rounded-full cursor-pointer border border-gray-700"
              style={{ backgroundColor: color }}
              onClick={() => {
                console.log(color);
                onColorSelect(color);
                setShowPalette(false);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
