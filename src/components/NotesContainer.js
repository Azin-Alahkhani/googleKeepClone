import { useSelector, useDispatch } from "react-redux";
import { removeNote } from "../redux/actions";
import NoteCard from "./NoteCard";
import { useState, useEffect } from "react";
import NoteModal from "./NoteModal"; // Import modal component
import Masonry from "@mui/lab/Masonry";
import { useRef } from "react";

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
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => {
    menuOpenRef.current = menuOpen; // keep ref in sync
  }, [menuOpen]);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      const currentMenuOpen = menuOpenRef.current;

      if (width < 500) {
        setColumns(1);
      } else if (width < 900) {
        setColumns(currentMenuOpen ? 2 : 1);
      } else if (width < 1100) {
        setColumns(currentMenuOpen ? 3 : 2);
      } else if (width < 1395) {
        setColumns(currentMenuOpen ? 4 : 3);
      } else {
        setColumns(currentMenuOpen ? 4 : 4);
      }
    };

    updateColumns(); // Set on mount
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);
  useEffect(() => {
    console.log("Columns changed:", columns);
  }, [columns]);

  return (
    <div className="overflow-visible">
      <Masonry
        columns={columns}
        spacing={1}
        className="flex flex-wrap flex-grow-0  gap-1"
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
    </div>
  );
}

export default NoteContainer;
