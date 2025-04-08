import { FiCheckSquare, FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../redux/NotesSlice"; // Assuming you have this action
import NoteFooterButtons from "./NoteFooterButtons"; // Assuming you have this component
import { removeNote } from "../redux/NotesSlice"; // Assuming you have this action

function NoteCard({ note, onClick, noteOption }) {
  const [isHovered, setIsHovered] = useState(false);
  const [bgColor, setBgColor] = useState(note.bgColor); // Initialize with note color
  const [image, setImage] = useState(note.img); // Initialize with note image
  const [labels, setLabels] = useState(note.labels || []); // Initialize with note labels

  const dispatch = useDispatch(); // Set up dispatch

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Ensure `image` is a URL
      };
      reader.readAsDataURL(file);
    }
  };

  const dispatchUpdatedNote = () => {
    dispatch(
      editNote({
        id: note.id,
        content: note.content,
        bgColor: bgColor !== "" ? bgColor : note.bgColor,
        title: note.title,
        img: image !== "" ? image : note.img,
        labels: labels,
      })
    );
  };
  const handleBgChange = (color) => {
    setBgColor(color);
  };

  useEffect(() => {
    if (bgColor !== "" || image !== "") {
      dispatchUpdatedNote();
    }
  }, [bgColor, image]);
  const handleRemove = () => {
    dispatch(removeNote(note.id)); // Remove note from Redux
  };
  return (
    <div
      key={note.index}
      className="w-full max-w-[230px] z-0 border mb-2 border-zinc-600 rounded-lg cursor-pointer hover:shadow-lg duration-200 shadow-md transition transform  hover:shadow-lg relative"
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
          className={`w-full h-auto object-cover ${
            !note.title && !note.content ? "rounded-t-lg " : "mb-2 "
          }`}
        />
      )}

      {(note.title !== "" || note.content !== "") && (
        <div className="relative max-w-sm p-4 m-1 rounded-lg ">
          {note.title && (
            <p className="mb-4 text-md font-bold tracking-tight text-white break-words">
              {note.title}
            </p>
          )}
          {note.content && (
            <p className="font-normal text-md text-white mb-1 break-words">
              {note.content}
            </p>
          )}
        </div>
      )}
      {labels && (
        <div className="flex items-center justify-start mb-10 ml-4 gap-2">
          {labels.map((label) => (
            <span
              key={label}
              className="border border-zinc-400 text-white text-shadow-lg rounded-full px-1 py-[2px] text-[10.5px] font-semibold "
            >
              {label}
            </span>
          ))}
        </div>
      )}
      {/* Footer with buttons */}
      <div
        tabIndex={0}
        className={`absolute z-50 bottom-0 left-0 right-0 p-1 bg-black  bg-opacity-10 text-white text-sm flex justify-between items-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/*<button onClick={Remove} className="hover:bg-gray-700 p-1 rounded">
          <FiCheckSquare size={20} />
        </button>

        <button onClick={Remove} className="hover:bg-gray-700 p-1 rounded">
          <FiCheck size={20} />
        </button>*/}

        <NoteFooterButtons
          handleRemove={handleRemove}
          handleColorSelect={handleBgChange}
          isEdit={true}
          handleImageUpload={handleImageUpload}
          isHovered={isHovered}
          labels={note.labels}
          setLabels={setLabels}
          note={note}
          noteOption={noteOption}
        />
      </div>
    </div>
  );
}

export default NoteCard;
