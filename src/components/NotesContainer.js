import { useSelector, useDispatch } from "react-redux";
import { removeNote } from "../redux/actions";
import NoteCard from "./NoteCard";

function NoteContainer({menuOpen}) {
    const notes = useSelector((state) => state.notes.notes || []) ; // Get notes from Redux store
    const dispatch = useDispatch(); // Dispatch actions


    const handleRemove = (note) => {
        dispatch(removeNote(note)); // Remove note from Redux
    };

    return (
        <div className={!menuOpen ? "grid grid-cols-4 gap-3" : "grid grid-cols-2 gap-3"}>
           {notes.map((note, index) => (
                <NoteCard  
                    key={index} 
                    handleRemove={handleRemove} 
                    noteTitle={note.title} 
                    noteText={note.content} 
                    label={note.label}
                />
            ))}
            
        </div>
    );
}

export default NoteContainer;
