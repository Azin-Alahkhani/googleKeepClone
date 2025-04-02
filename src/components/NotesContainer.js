import { useSelector, useDispatch } from "react-redux";
import { removeNote } from "../redux/actions";
import NoteCard from "./NoteCard";
import { useState , useEffect } from "react";

function NoteContainer({menuOpen}) {
    const notes = useSelector((state) => state.notes.notes || []) ; // Get notes from Redux store
    const dispatch = useDispatch(); // Dispatch actions
    const [columns, setColumns] = useState(menuOpen ? 4 : 5);
    const [noteW,setNoteW] = useState('200px')
    const updateColumns = () => {
            const width = window.innerWidth;

            if (width < 600) {
                setColumns(1); // Mobile: 1 column
            } else if (width < 800) {
            
                setColumns(2); 
          
            }else if (width<950) {
               
                    setColumns(3);
            }
            else if (width<1024){
                setColumns(4);
            }
            
            else if (width < 1200) {
                setColumns(4); 
            } else {
                setColumns(menuOpen ? 4 : 5); // Default: 4 or 6 columns
            }
        };
        useEffect(() => {
        updateColumns(); // Set columns on mount
        window.addEventListener("resize", updateColumns); // Listen for resize events

        return () => window.removeEventListener("resize", updateColumns); // Cleanup
    }, [menuOpen]);


    const handleRemove = (note) => {
        dispatch(removeNote(note)); // Remove note from Redux
    };

    return (
        <div
            className="grid gap-4 p-4"
            style={{
                gridTemplateColumns: `repeat(${columns}, minmax(200px, 1fr))`,
                alignItems: "flex-start",
            }}
        >
            {notes.map((note) => (
                <div key={note.id} className="w-full max-w-[200px]">
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
