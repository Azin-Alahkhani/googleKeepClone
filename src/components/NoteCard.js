import { FiCheckSquare, FiCheck } from "react-icons/fi";
import { useState } from "react";

function NoteCard({
  noteTitle,
  noteText,
  handleRemove,
  index,
  label,
  bgColor,
  onClick,
  img,
  setImg,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const Remove = (e) => {
    e.preventDefault();
    handleRemove({ index });
  };

  return (
    <div
      key={index}
      className="w-full max-w-[250px]  border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg duration-200 shadow-md transition transform hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: bgColor }}
      onClick={onClick} // Click anywhere on the card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image (if available) */}
      {img && (
        <img
          src={img}
          alt="Note"
          className="w-full h-auto max-h-80 object-cover rounded-md mb-2"
        />
      )}
      {(noteText !== "" || noteTitle !== "") && (
        <div className="relative max-w-sm p-4 m-1  ">
          {/* Checkmark on hover 
            {isHovered && (
                <FiCheck
                    className="absolute top-2 left-2 text-gray-400 hover:text-gray-200 transition"
                    size={20}
                    title="Select note"
                />
            )}*/}

          {noteTitle && (
            <p className="mb-4 text-md font-bold tracking-tight text-white">
              {noteTitle}
            </p>
          )}
          {noteText && (
            <p className="font-normal text-md text-white mb-6">{noteText}</p>
          )}
          {/* footer stuff goes here */}
        </div>
      )}
    </div>
  );
}

export default NoteCard;
