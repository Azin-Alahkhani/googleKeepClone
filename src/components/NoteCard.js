import { FiCheckSquare, FiCheck } from "react-icons/fi";
import { useState } from "react";

function NoteCard({
  note,

  handleRemove,

  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const Remove = (e) => {
    e.preventDefault();
    handleRemove({ index: note.id });
  };

  return (
    <div
      key={note.index}
      className="w-full max-w-[250px]  border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg duration-200 shadow-md transition transform hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: note.bgColor }}
      onClick={onClick} // Click anywhere on the card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image (if available) */}
      {note.img && (
        <img
          src={note.img}
          alt="Note"
          className="w-full h-auto  object-cover rounded-md mb-2"
        />
      )}
      {(note.title !== "" || note.content !== "") && (
        <div className="relative max-w-sm p-4 m-1  ">
          {/* Checkmark on hover 
            {isHovered && (
                <FiCheck
                    className="absolute top-2 left-2 text-gray-400 hover:text-gray-200 transition"
                    size={20}
                    title="Select note"
                />
            )}*/}

          {note.title && (
            <p className="mb-4 text-md font-bold tracking-tight text-white">
              {note.title}
            </p>
          )}
          {note.content && (
            <p className="font-normal text-md text-white mb-6">
              {note.content}
            </p>
          )}
          {/* footer stuff goes here */}
        </div>
      )}
    </div>
  );
}

export default NoteCard;
