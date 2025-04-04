import { FiCheckSquare , FiCheck } from "react-icons/fi";
import { useState } from "react";

function NoteCard({ noteTitle, noteText, handleRemove, index, label, bgColor, onClick , img, setImg}) {
    const [isHovered, setIsHovered] = useState(false);
  
    const Remove = (e) => {
        e.preventDefault();
        handleRemove({ index });
    };

    return (
         <div key={index} className="w-full max-w-[250px]  border border-gray-200 rounded-lg shadow-md">
             {/* Image (if available) */}
            {img && (
                <img
                    src={img}
                    alt="Note"
                    className="w-full h-auto max-h-80 object-cover rounded-md mb-2"
                />
            )}
        <div
            className="relative max-w-sm p-4 m-1 bg-gray-800 dark:border-gray-700 cursor-pointer hover:shadow-lg transition duration-200"
            style={{ backgroundColor: bgColor }}
            onClick={onClick} // Click anywhere on the card
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
           
            {/* Checkmark on hover 
            {isHovered && (
                <FiCheck
                    className="absolute top-2 left-2 text-gray-400 hover:text-gray-200 transition"
                    size={20}
                    title="Select note"
                />
            )}*/}

            <p className="mb-4 text-md font-bold tracking-tight text-white">{noteTitle}</p>
            <p className="font-normal text-md text-white mb-6">{noteText}</p>
            {/* footer stuff goes here */}
        </div>
        </div>
    );
}

export default NoteCard;
