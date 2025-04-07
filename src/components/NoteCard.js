import { FiCheckSquare, FiCheck } from "react-icons/fi";
import { useState } from "react";
import NoteFooterButtons from "./NoteFooterButtons"; // Assuming you have this component

function NoteCard({ note, handleRemove, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [bgColor, setBgColor] = useState(note.bgColor);

  const Remove = (e) => {
    e.preventDefault();
    handleRemove({ index: note.id });
  };

  const dispatchUpdatedNote = () => {
    const noteData = {
      id: note.id,
      content: note.content,
      bgColor: note.bgColor,
      title: note.title,
      img: note.img,
    };
    console.log("dispatching edited note ", noteData);
  };

  return (
    <div
      key={note.index}
      className="w-full max-w-[250px] border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg duration-200 shadow-md transition transform hover:scale-105 hover:shadow-lg relative"
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
          className={`w-full h-auto object-cover rounded-md mb-2 ${
            !note.title && !note.content ? "rounded-t-lg" : ""
          }`}
        />
      )}

      {(note.title !== "" || note.content !== "") && (
        <div className="relative max-w-sm p-4 m-1">
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
        </div>
      )}
      {/* Footer with buttons */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-sm flex justify-between items-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/*<button onClick={Remove} className="hover:bg-gray-700 p-1 rounded">
          <FiCheckSquare size={20} />
        </button>

        <button onClick={Remove} className="hover:bg-gray-700 p-1 rounded">
          <FiCheck size={20} />
        </button>*/}

        <NoteFooterButtons
          handleRemove={handleRemove}
          handleColorSelect={setBgColor}
          isEdit={true}
        />
      </div>
    </div>
  );
}

export default NoteCard;
