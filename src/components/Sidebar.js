import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiHome, FiTrash, FiBell, FiBookmark } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { setSelectedLabel, setHeaderTitle } from "../redux/NotesSlice";
import EditLabelsModal from "./EditLabelsModal";

const Sidebar = ({ isExpanded, setIsExpanded, setNoteOptions = () => {} }) => {
  const labels = useSelector((state) => state.labels.labels || []);
  const [editModal, setEditModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(1); // Track selected item
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

  const extraMenuItems = [
    { id: 3, icon: MdOutlineModeEdit, label: "Edit labels" },
    { id: 4, icon: IoArchiveOutline, label: "Archive" },
    { id: 5, icon: FiTrash, label: "Trash" },
  ];

  const handleClickLabels = (label, id) => {
    console.log("Label clicked:", label);
    setSelectedItem(id);
    setNoteOptions("notes");
    dispatch(setSelectedLabel(label));
    if (label === "Notes") {
      dispatch(setHeaderTitle(null));
    } else {
      dispatch(setHeaderTitle(label));
    }
  };

  const handleClick = (id) => {
    setSelectedItem(id);
    //dispatch(setSelectedLabel(null));
    switch (id) {
      case 1:
        setNoteOptions("notes");
        dispatch(setSelectedLabel(null));
        dispatch(setHeaderTitle(null));
        break;
      case 2:
        setNoteOptions("Reminders");
        dispatch(setSelectedLabel(null));
        dispatch(setHeaderTitle("Reminders"));
        break;
      case 3:
        setEditModal(!editModal);
        break;
      case 4:
        setNoteOptions("archivedNotes");
        dispatch(setSelectedLabel(null));
        dispatch(setHeaderTitle("Archive"));
        break;
      case 5:
        setNoteOptions("trashNotes");
        dispatch(setSelectedLabel(null));
        dispatch(setHeaderTitle("Trash"));
        break;
      default:
        break;
    }
  };

  const getClassName = (id) => {
    const base =
      "group relative flex items-center gap-1 px-2 py-2 cursor-pointer transition-all duration-200";

    const isSelected = selectedItem === id;
    const isCollapsed = !isExpanded;

    if (isCollapsed) {
      // Collapsed: Only circle highlight on icon
      return `${base} justify-center`;
    }

    // Expanded: Full width highlight
    if (isSelected) {
      return `${base} bg-[#41321c] bg-opacity-80 rounded-r-full`;
    }

    return `${base} hover:bg-zinc-500 hover:bg-opacity-15 rounded-r-full`;
  };

  return (
    <div
      className={`${
        isExpanded ? "w-60" : "w-50"
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
            <div
              className={` flex items-center justify-center min-w-[2rem] h-10 w-10 ml-2 transition-colors rounded-full ${
                !isExpanded
                  ? selectedItem === item.id
                    ? "bg-[#41321c] bg-opacity-80"
                    : "hover:bg-zinc-500 hover:bg-opacity-15"
                  : ""
              }`}
            >
              <item.icon
                className="h-5 w-5 text-zinc-300   justify-self-center"
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
            <div
              className={`flex items-center justify-center min-w-[2rem] h-10 w-10 ml-2 transition-colors rounded-full ${
                !isExpanded
                  ? selectedItem === item.id
                    ? "bg-[#41321c] bg-opacity-80"
                    : "hover:bg-zinc-500 hover:bg-opacity-15"
                  : ""
              }`}
            >
              <item.icon
                className="h-5 w-5 text-zinc-300 justify-self-center "
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
            <div
              className={`flex items-center justify-center min-w-[2rem] h-10 w-10 ml-2 transition-colors rounded-full ${
                !isExpanded
                  ? selectedItem === item.id
                    ? "bg-[#41321c] bg-opacity-80"
                    : "hover:bg-zinc-500 hover:bg-opacity-15"
                  : ""
              }`}
            >
              <item.icon
                className="h-5 w-5 text-zinc-300 justify-self-center"
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
