import React, { useState } from "react";
import { FaBars, FaLightbulb, FaBell, FaArchive, FaTrash, FaEdit } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
    

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full text-gray-100 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0 w-60" : "-translate-x-full w-0"
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Menu Options */}
          <SidebarItem Icon={FaLightbulb} label="Notes" />
          <SidebarItem Icon={FaBell} label="Reminders" />
          <SidebarItem Icon={FaArchive} label="Archive" />
          <SidebarItem Icon={FaTrash} label="Trash" />

          {/* Labels Section */}
          <hr className="border-gray-400" />
          <SidebarItem Icon={FaEdit} label="Edit Labels" />
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ Icon, label }) => (
  <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-700">
    <Icon className="mr-3 text-gray-600 dark:text-gray-300" size={18} />
    <span className="text-gray-200">{label}</span>
  </div>
);

export default Sidebar;
