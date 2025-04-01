import { useState } from "react";
import { FaTimes, FaTrash, FaPlus } from "react-icons/fa";

export default function EditLabelsModal({ isOpen, onClose, labels, setLabels }) {
  const [newLabel, setNewLabel] = useState("");

  if (!isOpen) return null; // Don't render if not open

  const handleAddLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel)) {
      setLabels([...labels, newLabel]);
      setNewLabel(""); // Clear input
    }
  };

  const handleDeleteLabel = (labelToRemove) => {
    setLabels(labels.filter((label) => label !== labelToRemove));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white w-96 p-4 rounded-lg shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h2 className="text-lg font-semibold">Edit Labels</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Label List */}
        <div className="mt-4 space-y-3">
          {labels.map((label, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
              <span>{label}</span>
              <button onClick={() => handleDeleteLabel(label)}>
                <FaTrash className="text-gray-400 hover:text-red-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Label */}
        <div className="flex items-center gap-2 mt-4 border-t border-gray-700 pt-4">
          <input 
            type="text" 
            placeholder="Create new label" 
            value={newLabel} 
            onChange={(e) => setNewLabel(e.target.value)}
            className="w-full bg-gray-800 text-white p-2 rounded focus:outline-none"
          />
          <button onClick={handleAddLabel} className="bg-gray-700 p-2 rounded">
            <FaPlus className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
