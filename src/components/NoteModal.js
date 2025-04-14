import React from "react";
import AddNoteContainer from "./AddNoteContainer";

function NoteModal({ note, onClose }) {
  const handleSave = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="w-[650px] p-6 rounded-lg shadow-lg relative"
        style={{ zIndex: 2000 }} // Ensure the modal is above the header
      >
        <AddNoteContainer note={note} onSave={handleSave} isEdit={true} />
      </div>
    </div>
  );
}

export default NoteModal;
