import React from "react";
import { useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import { useState } from "react";
import NoteModal from "./NoteModal"; // Import modal component
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function NoteContainer({ menuOpen, noteOption }) {
  const notes = useSelector((state) => state.notes[noteOption] || []); // Get notes from Redux store
  const [selectedNote, setSelectedNote] = useState(null);
  const selectedLabel = useSelector((state) => state.notes.selectedLabel);
  const searchQuery = useSelector(
    (state) => state.notes.searchQuery || "",
  ).toLowerCase();

  const filteredNotes = notes
    .filter((note) =>
      selectedLabel ? note.labels?.includes(selectedLabel) : true,
    )
    .filter((note) =>
      searchQuery
        ? note.title?.toLowerCase().includes(searchQuery) ||
          note.content?.toLowerCase().includes(searchQuery)
        : true,
    );

  return (
    <div className=" ">
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1,
          600: menuOpen ? 1 : 2,
          750: menuOpen ? 2 : 3,
          900: 3,
          1100: menuOpen ? 3 : 4,
          1200: menuOpen ? 4 : 5,
        }}
      >
        <Masonry gutter="0px">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => setSelectedNote(note)}
              noteOption={noteOption}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {/* Modal for Editing */}
      {selectedNote && (
        <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </div>
  );
}

export default NoteContainer;
