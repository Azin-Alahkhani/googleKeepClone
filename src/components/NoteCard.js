import { FiCheckSquare , FiCheck } from "react-icons/fi";
import { useState } from "react";

function NoteCard({ noteTitle, noteText, handleRemove, index, label, bgColor, onClick , img, setImg}) {
    const [isHovered, setIsHovered] = useState(false);
  
    const Remove = (e) => {
        e.preventDefault();
        handleRemove({ index });
    };

    return (
        <div
            className="relative max-w-sm p-4 m-1 border border-gray-200 rounded-lg shadow-md bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-lg transition duration-200"
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
                    className="w-full h-auto max-h-40 object-cover rounded-md mb-2"
                />
            )}
            {/* Checkmark on hover */}
            {isHovered && (
                <FiCheck
                    className="absolute top-2 left-2 text-gray-400 hover:text-gray-200 transition"
                    size={20}
                    title="Select note"
                />
            )}

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{noteTitle}</h5>
            <p className="font-normal text-white">{noteText}</p>
        </div>
    );
}

export default NoteCard;
