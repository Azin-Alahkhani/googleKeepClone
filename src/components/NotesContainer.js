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
        <div className="flex flex-wrap"  >
           {notes.map((note, index) => (
            <div className={menuOpen ? "basis-1/4" : "basis-1/6"} >
                <NoteCard  
                    key={note.id} 
                    handleRemove={handleRemove} 
                    noteTitle={note.title} 
                    noteText={note.content} 
                    label={note.label}
                    index={note.id}
                    bgColor={note.bgColor}
                />
                </div>
            ))}
            
        </div>
    );
}

export default NoteContainer;
