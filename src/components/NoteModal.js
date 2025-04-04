import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../redux/actions";
import AddNoteContainer from "./AddNoteContainer";

function NoteModal({ note, onClose }) {
  const handleSave = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-[650px]  p-6 rounded-lg shadow-lg relative">
        {/* Reuse AddNoteContainer with controlled inputs */}
        <AddNoteContainer note={note} onSave={handleSave} isEdit={true} />
      </div>
    </div>
  );
}

export default NoteModal;
