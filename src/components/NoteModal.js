import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../redux/actions";
import AddNoteContainer from "./AddNoteContainer";

function NoteModal({ note, onClose }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [bgColor, setBgColor] = useState(note.bgColor);
    const [img,setImg]=useState(note.img || "");
    console.log(bgColor)
    const handleSave = () => {
        console.log("modal close")
       // dispatch(editNote({ id: note.id, title, content, bgColor }));
        onClose();
    };
    const handleChangeTitle=(newTitle)=>{
        console.log(newTitle)
        setTitle(newTitle)
    }
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-[650px]  p-6 rounded-lg shadow-lg relative">
                <button
                    className="absolute top-3 right-3 text-white text-xl"
                    onClick={handleSave}
                >
                    ✕
                </button>

                {/* Reuse AddNoteContainer with controlled inputs */}
                <AddNoteContainer
                    title={title}
                    setTitle={setTitle}
                    content={content}
                    setContent={setContent}
                    bgColor={bgColor}
                    setBgColor={setBgColor}
                    onSave={handleSave}
                    img={img}
                    setImg={setImg}
                    index={note.id}
                />
            </div>
        </div>
    );
}

export default NoteModal;
