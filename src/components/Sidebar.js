import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiHome, FiTrash, FiBell, FiBookmark } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { setSelectedLabel } from "../redux/NotesSlice";
import EditLabelsModal from "./EditLabelsModal";

const Sidebar = ({ isExpanded, setIsExpanded, setNoteOptions = () => {} }) => {
  const labels = useSelector((state) => state.labels.labels || []);
  const [editModal, setEditModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null); // Track selected item
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const menuItems = [
    { id: 1, icon: FiHome, label: "Notes" },
    { id: 2, icon: FiBell, label: "Reminders" },
  ];
  var i = 6;
  const labelItems = labels.map((label, index) => ({
    id: i++, // Dynamic index
    icon: FiBookmark,
    label,
  }));
  console.log("labelItems", labelItems);
  const extraMenuItems = [
    { id: 3, icon: MdOutlineModeEdit, label: "Edit labels" },
    { id: 4, icon: IoArchiveOutline, label: "Archive" },
    { id: 5, icon: FiTrash, label: "Trash" },
  ];

  const handleClickLabels = (label, id) => {
    setSelectedItem(id);
    setNoteOptions("notes");
    dispatch(setSelectedLabel(label));
  };

  const handleClick = (id) => {
    setSelectedItem(id);
    dispatch(setSelectedLabel(null));
    switch (id) {
      case 1:
        setNoteOptions("notes");

        break;
      case 2:
        setNoteOptions("Reminders");

        break;
      case 3:
        setEditModal(!editModal);
        break;
      case 4:
        setNoteOptions("archivedNotes");
        break;
      case 5:
        setNoteOptions("trashNotes");
        break;
      default:
        break;
    }
  };

  const getClassName = (id) => {
    var style =
      "group relative flex items-center gap-4 px-2 py-3 cursor-pointer transition-all duration-200";

    if (selectedItem == null) {
      style += " hover:bg-[#41321c] hover:bg-opacity-80 rounded-r-full";
    } else if (selectedItem === id) {
      style += " bg-[#41321c] bg-opacity-80 rounded-r-full";
    } else {
      style += " hover:bg-zinc-500 hover:bg-opacity-15  rounded-r-full";
    }
    console.log("style for ", id, ": ", style);
    return style;
  };

  return (
    <div
      className={`${
        isExpanded ? "w-64" : "w-20"
      } text-white h-screen pt-1 left-0 transition-all duration-300 ease-in-out`}
    >
      <nav className="flex flex-col gap-0">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${getClassName(item.id)}`}
            role="button"
            onClick={() => handleClick(item.id)}
            tabIndex={0}
          >
            <div className="flex items-center justify-center min-w-[2rem]">
              <item.icon
                className="h-5 w-5 text-zinc-300 ml-6"
                aria-hidden="true"
              />
            </div>
            <span
              className={`${
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              } whitespace-nowrap transition-opacity duration-200 text-sm font-semibold ${
                isExpanded ? "delay-100" : ""
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}

        {labelItems.map((item) => (
          <div
            key={item.id}
            className={`${getClassName(item.id)}`}
            role="button"
            onClick={() => handleClickLabels(item.label, item.id)}
            tabIndex={0}
          >
            <div className="flex items-center justify-center min-w-[2rem]">
              <item.icon
                className="h-5 w-5 text-zinc-300 ml-6"
                aria-hidden="true"
              />
            </div>
            <span
              className={`${
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              } whitespace-nowrap transition-opacity duration-200 text-sm font-semibold ${
                isExpanded ? "delay-100" : ""
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}

        {extraMenuItems.map((item) => (
          <div
            key={item.id}
            className={`${getClassName(item.id)}`}
            role="button"
            onClick={() => handleClick(item.id)}
            tabIndex={0}
          >
            <div className="flex items-center justify-center min-w-[2rem]">
              <item.icon
                className="h-5 w-5 text-zinc-300 ml-6"
                aria-hidden="true"
              />
            </div>
            <span
              className={`${
                isExpanded ? "opacity-100" : "opacity-0 hidden"
              } whitespace-nowrap transition-opacity duration-200 text-sm font-semibold ${
                isExpanded ? "delay-100" : ""
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </nav>
      {editModal && (
        <EditLabelsModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
