import { useSelector, useDispatch } from "react-redux";
import { removeNote } from "../redux/actions";
import NoteCard from "./NoteCard";
import { useState, useEffect } from "react";
import NoteModal from "./NoteModal"; // Import modal component
import Masonry from "@mui/lab/Masonry";

function NoteContainer({ menuOpen }) {
  const notes = useSelector((state) => state.notes.notes || []); // Get notes from Redux store
  const [selectedNote, setSelectedNote] = useState(null);
  const selectedLabel = useSelector((state) => state.notes.selectedLabel);

  const filteredNotes = selectedLabel
    ? notes.filter((note) => note.labels?.includes(selectedLabel))
    : notes;
  const dispatch = useDispatch(); // Dispatch actions
  const [columns, setColumns] = useState(menuOpen ? 4 : 5);
  const [noteW, setNoteW] = useState("200px");
  const updateColumns = () => {
    const width = window.innerWidth;

    if (width < 500) {
      setColumns(1);
    } else if (width < 900) {
      setColumns(menuOpen ? 1 : 2);
    } else if (width < 869) {
      setColumns(menuOpen ? 3 : 2);
    } else if (width < 1395) {
      setColumns(menuOpen ? 3 : 4);
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
    dispatch(removeNote(note.id)); // Remove note from Redux
  };

  return (
    <>
      <Masonry
        columns={columns}
        spacing={1}
        className="flex flex-wrap -mx-4 gap-1 "
      >
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            handleRemove={handleRemove}
            noteTitle={note.title}
            noteText={note.content}
            label={note.label}
            index={note.id}
            bgColor={note.bgColor}
            onClick={() => setSelectedNote(note)}
            img={note.img}
          />
        ))}
      </Masonry>
      {/* Modal for Editing */}
      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </>
  );
}

export default NoteContainer;
