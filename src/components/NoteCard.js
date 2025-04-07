import { FiCheckSquare, FiCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../redux/NotesSlice"; // Assuming you have this action
import NoteFooterButtons from "./NoteFooterButtons"; // Assuming you have this component

function NoteCard({ note, handleRemove, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [bgColor, setBgColor] = useState(note.bgColor); // Initialize with note color
  const [image, setImage] = useState(note.img); // Initialize with note image

  const dispatch = useDispatch(); // Set up dispatch

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Ensure `image` is a URL
      };
      reader.readAsDataURL(file);
      console.log("image uploaded on footer", reader.result);
      //dispatchUpdatedNote();
    }
  };

  const dispatchUpdatedNote = () => {
    console.log("dispatching edited note ", bgColor);
    dispatch(
      editNote({
        id: note.id,
        content: note.content,
        bgColor: bgColor !== "" ? bgColor : note.bgColor,
        title: note.title,
        img: image !== "" ? image : note.img,
      })
    );
  };
  const handleBgChange = (color) => {
    console.log("color selected", color);
    setBgColor(color);

    console.log("color changed to", color);
    //dispatchUpdatedNote();
  };

  useEffect(() => {
    if (bgColor !== "" || image !== "") {
      dispatchUpdatedNote();
    }
  }, [bgColor, image]);

  return (
    <div
      key={note.index}
      className="w-full max-w-[230px]  border mb-2 border-gray-200 rounded-lg cursor-pointer hover:shadow-lg duration-200 shadow-md transition transform hover:scale-105 hover:shadow-lg relative"
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
        tabIndex={0}
        className={`absolute z-10 bottom-0 left-0 right-0 p-2 bg-black  bg-opacity-10 text-white text-sm flex justify-between items-center transition-opacity duration-300 ${
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
        />
      </div>
    </div>
  );
}

export default NoteCard;
