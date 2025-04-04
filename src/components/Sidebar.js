import { useState, useEffect } from "react";
import { FiHome, FiTrash, FiSettings, FiArchive, FiPieChart, FiAlertCircle , FiBookmark } from "react-icons/fi";
import { useSelector } from "react-redux";
import EditLabelsModal from "./EditLabelsModal";

const Sidebar = ({isExpanded,setIsExpanded}) => {
  const labels = useSelector(state=>(state.labels.labels || []))
  const [editModal,setEditModal] = useState(false);
  

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const menuItems = [
        { id: 1, icon: FiHome, label: "Notes" },
        { id: 2, icon: FiAlertCircle, label: "Reminders" },
    ];
 const labelItems = labels.map((label, index) => ({
        id: index, // Dynamic index
        icon: FiBookmark,
        label,
    }));
    console.log(labelItems);
    const extraMenuItems = [
        { id: 3, icon: FiSettings, label: "Edit labels" },
        { id: 4, icon: FiArchive, label: "Archive" },
        { id: 5, icon: FiTrash, label: "Trash" },
    ];
   const handleClick = (id) => {
    switch (id) {
      case 1:
        console.log("Notes clicked");
        break;
      case 2:
        console.log("Reminders clicked");
        break;
      case 3:{
        console.log("Edit labels clicked");
        setEditModal(!editModal);
      }
        break;
      case 4:
        console.log("Archive clicked");
        break;
      case 5:
        console.log("Trash clicked");
        break;
      default:
        break;
    }
    
   }

  return (
    <div
      className={`${isExpanded ? "w-64" : "w-20"} text-white h-screen pt-3  left-0 transition-all duration-300 ease-in-out`}
    >
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center gap-4 px-2 py-3 hover:bg-gray-700 rounded-r-full cursor-pointer transition-all duration-200"
            role="button"
            onClick={() => handleClick(item.id)}
            tabIndex={0}
          >
            <div className="flex items-center justify-center min-w-[2rem]">
             
              <item.icon
                className="h-6 w-6"
                aria-hidden="true"
              />
             
            </div>
            <span
              className={`${isExpanded ? "opacity-100" : "opacity-0 hidden"} whitespace-nowrap transition-opacity duration-200 ${isExpanded ? "delay-100" : ""}`}
            >
              {item.label}
            </span>
            {!isExpanded && (
              <div className="absolute left-full ml-6 px-2 py-1 bg-gray-900 text-sm rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </div>
        ))}
{/* User Labels with Bookmark Icon */}
                {labelItems.map((item) => (
                    <div
                        key={item.id}
                        className="group relative flex items-center gap-4 px-2 py-3 hover:bg-gray-700 rounded-r-full cursor-pointer transition-all duration-200"
                        role="button"
                        onClick={() => handleClick(item.id)}
                        tabIndex={0}
                    >
                        <div className="flex items-center justify-center min-w-[2rem]">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <span
                            className={`${
                                isExpanded ? "opacity-100" : "opacity-0 hidden"
                            } whitespace-nowrap transition-opacity duration-200 ${
                                isExpanded ? "delay-100" : ""
                            }`}
                        >
                            {item.label}
                        </span>
                        {!isExpanded && (
                            <div className="absolute left-full ml-6 px-2 py-1 bg-gray-900 text-sm rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                                {item.label}
                            </div>
                        )}
                    </div>
                ))}

         {extraMenuItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center gap-4 px-2 py-3 hover:bg-gray-700 rounded-r-full cursor-pointer transition-all duration-200"
            role="button"
            onClick={() => handleClick(item.id)}
            tabIndex={0}
          >
            <div className="flex items-center justify-center min-w-[2rem]">
              <item.icon
                className="h-6 w-6"
                aria-hidden="true"
              />
            </div>
            <span
              className={`${isExpanded ? "opacity-100" : "opacity-0 hidden"} whitespace-nowrap transition-opacity duration-200 ${isExpanded ? "delay-100" : ""}`}
            >
              {item.label}
            </span>
            {!isExpanded && (
              <div className="absolute left-full ml-6 px-2 py-1 bg-gray-900 text-sm rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                {item.label}
              </div>
            )}
          </div>
        ))}
        
      </nav>
      {editModal && ( 
        <EditLabelsModal isOpen={editModal} onClose={()=>setEditModal(false)} />
      )}
    </div>
  );
};

export default Sidebar;