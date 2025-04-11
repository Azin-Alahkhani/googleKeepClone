import { useSelector, useDispatch } from "react-redux";
import { removeNote } from "../redux/actions";
import NoteCard from "./NoteCard";
import { useState, useEffect } from "react";
import NoteModal from "./NoteModal"; // Import modal component
import Masonry from "@mui/lab/Masonry";

function NoteContainer({ menuOpen, noteOption }) {
  const notes = useSelector((state) => state.notes[noteOption] || []); // Get notes from Redux store
  const [selectedNote, setSelectedNote] = useState(null);
  const selectedLabel = useSelector((state) => state.notes.selectedLabel);
  const searchQuery = useSelector(
    (state) => state.notes.searchQuery || ""
  ).toLowerCase();

  const filteredNotes = notes
    .filter((note) =>
      selectedLabel ? note.labels?.includes(selectedLabel) : true
    )
    .filter((note) =>
      searchQuery
        ? note.title?.toLowerCase().includes(searchQuery) ||
          note.content?.toLowerCase().includes(searchQuery)
        : true
    );

  const dispatch = useDispatch(); // Dispatch actions
  const [columns, setColumns] = useState(menuOpen ? 4 : 3);
  const [noteW, setNoteW] = useState("200px");
  const updateColumns = () => {
    const width = window.innerWidth;

    if (width < 500) {
      setColumns(1);
    } else if (width < 900) {
      setColumns(menuOpen ? 2 : 1);
    } else if (width < 869) {
      setColumns(menuOpen ? 2 : 3);
    } else if (width < 1395) {
      setColumns(menuOpen ? 4 : 3);
    } else {
      setColumns(menuOpen ? 3 : 4); // Default: 4 or 5 columns
    }
  };
  useEffect(() => {
    updateColumns(); // Set columns on mount
    console.log("menuOpen", menuOpen, "columns", columns);
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
            onClick={() => setSelectedNote(note)}
            noteOption={noteOption}
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
