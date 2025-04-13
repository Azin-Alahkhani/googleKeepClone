import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiHome, FiTrash, FiBell, FiBookmark } from "react-icons/fi";
import { MdOutlineModeEdit, MdLightbulbOutline } from "react-icons/md";
import { IoArchiveOutline } from "react-icons/io5";
import { setSelectedLabel, setHeaderTitle } from "../redux/NotesSlice";
import EditLabelsModal from "./EditLabelsModal";

const Sidebar = ({ isExpanded, setIsExpanded, setNoteOptions = () => {} }) => {
  const labels = useSelector((state) => state.labels.labels || []);
  const [editModal, setEditModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(1); // Track selected item
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const menuItems = [
    { id: 1, icon: MdLightbulbOutline, label: "Notes" },
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
    //dispatch(setSelectedLabel(null));
    switch (id) {
      case 1:
        setNoteOptions("notes");
        setSelectedItem(id);
        dispatch(setSelectedLabel(null));
        dispatch(setHeaderTitle(null));
        break;
      case 2:
        setNoteOptions("Reminders");
        setSelectedItem(id);
        dispatch(setSelectedLabel(null));
        dispatch(setHeaderTitle("Reminders"));
        break;
      case 3:
        setEditModal(!editModal);
        break;
      case 4:
        setNoteOptions("archivedNotes");
        dispatch(setSelectedLabel(null));
        setSelectedItem(id);
        dispatch(setHeaderTitle("Archive"));
        break;
      case 5:
        setNoteOptions("trashNotes");
        dispatch(setSelectedLabel(null));
        setSelectedItem(id);
        dispatch(setHeaderTitle("Trash"));
        break;
      default:
        break;
    }
  };

  const getClassName = (id) => {
    const base =
      "group rounded-r-full relative flex   items-center gap-1 px-2 py-2 cursor-pointer transition-all duration-200";

    const isSelected = selectedItem === id;
    const isCollapsed = !isExpanded;

    const hoverEffect = !isSelected
      ? "hover:bg-zinc-500 hover:bg-opacity-15 "
      : "";
    const overLayHighlight =
      isHovered && isSelected
        ? " bg-[#41321c] bg-opacity-80 rounded-r-full"
        : "";

    if (isCollapsed && isSelected) {
      return `${base} ${overLayHighlight} rounded-r-full  `;
    }
    if (isCollapsed && !isHovered) {
      return `${base} justify-center ${hoverEffect}`;
    }

    // Expanded: Full width highlight with fixed selected color
    if (isSelected) {
      return `${base} bg-[#41321c] bg-opacity-80 rounded-r-full justify-start`; // Selected item fixed color
    }
    return `${base} ${hoverEffect} rounded-r-full justify-start`; // Apply hover effect for non-selected items
  };

  return (
    <div
      className={`text-white pt-1 transition-all duration-300 ease-in-out 
    ${
      isExpanded
        ? "relative h-screen w-60"
        : "fixed top-[80p] left-0 z-50 h-screen"
    } 
    ${!isExpanded && isHovered ? "bg-[#1f1f1f] w-[15rem]" : " "}
    overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
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
              className={`flex items-center justify-center min-w-[2rem] h-10 w-10 ml-2 transition-colors rounded-full ${
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
                isExpanded || isHovered ? "opacity-100" : "opacity-0 hidden"
              } whitespace-nowrap transition-opacity duration-200 text-sm font-semibold ${
                isExpanded || isHovered ? "delay-100" : ""
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
                isExpanded || isHovered ? "opacity-100" : "opacity-0 hidden"
              } whitespace-nowrap transition-opacity duration-200 text-sm font-semibold ${
                isExpanded || isHovered ? "delay-100" : ""
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
                isExpanded || isHovered ? "opacity-100" : "opacity-0 hidden"
              } whitespace-nowrap transition-opacity duration-200 text-sm font-semibold ${
                isExpanded || isHovered ? "delay-100" : ""
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
