import React from "react";
import logo from "../assets/keep_2020q4_48dp.png";
import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { TfiViewList } from "react-icons/tfi";
import { MdRefresh } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/NotesSlice";
import Avatar from "boring-avatars";

function Header({ menuOpen, setMenuOpen }) {
  const selectedLabel = useSelector(
    (state) => state.notes.selectedLabel || null,
  );
  const HeaderTitle = useSelector((state) => state.notes.HeaderTitle || null);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    //setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    console.log("HeaderTitle changed:", HeaderTitle);
  }, [HeaderTitle]);

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
    dispatch(setSearchQuery(e.target.value));
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocusedOnSearch, setIsFocusedOnSearch] = useState(false);

  return (
    <nav
      className="border-gray-200 fixed px-2 sm:px-4   font-sans "
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#202124",
      }}
    >
      <div className="flex flex-row  items-center font-sans">
        <div className="flex flex-row items-center justify-between ">
          {/* menu toggle */}
          <div className="flex items-center m-2">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 rounded-full hover:bg-zinc-700 hover:bg-opacity-50 "
            >
              <Bars3Icon className="h-6 w-6 text-white" title="Main menu" />
            </button>
          </div>
          {/* Logo or Selected label*/}
          {!HeaderTitle && (
            <div>
              <a href="/" className="flex items-center rounded">
                <img src={logo} className="h-8 sm:h-10" alt="Keep Logo" />
                <span className="self-center text-xl font-thin whitespace-nowrap text-white">
                  Keep
                </span>
              </a>
            </div>
          )}
          {HeaderTitle && (
            <div className="flex items-center">
              <span className="text-white text-lg font-medium">
                {HeaderTitle}
              </span>
            </div>
          )}
        </div>

          <div className="flex flex-row gap-1 items-center justify-between w-full">
        {/* Search bar */}
            <div className="flex items-center md:w-[700px] w-[33%] justify-around w-full">
              <div
                className="ml-24 hidden md:flex  flex justify-normal items-center   rounded-lg shadow-md border-none  mr-24"
                style={{
                  backgroundColor: isFocusedOnSearch
                    ? "#ffffff"
                    : "oklch(43.9% 0 0)",
                }}
              >
            <div
              className={`${
                isFocusedOnSearch ? "hover:bg-stone-100" : "hover:bg-stone-500"
              } rounded-full m-1 ml-3 w-8 h-8 flex items-center justify-center`}
            >
              <IoIosSearch
                className="w-5 h-5 text-sm "
                style={{
                  color: !isFocusedOnSearch ? "white" : "black",
                }}
              />
            </div>

            <input
              tabIndex={0}
              value={searchTerm}
              onChange={handleSearchTermChange}
              onFocus={() => setIsFocusedOnSearch(true)}
              onBlur={() => setIsFocusedOnSearch(false)}
              type="text"
              className="w-full text-white text-lg font-medium p-2 bg-transparent focus:text-gray-800 border-none focus:outline-none"
              placeholder="Search"
            />
          </div>           
        </div>
         <div className="flex flex-row gap-2 items-center justify-between">
            <button
              type="button"
              className="rounded-full h-10 w-10 hover:bg-zinc-700 justify-center items-center text-gray-500 flex hover:text-white "
            >
              <MdRefresh className="w-6 h-6 " title="Refresh" />
            </button>
            <button
              type="button"
              className="rounded-full h-10 w-10 hover:bg-zinc-700 justify-center items-center text-gray-500 flex hover:text-white "
            >
              <TfiViewList className="w-5 h-5 " title="View as list" />
            </button>
             <button
              type="button"
              className="rounded-full h-10 w-10 hover:bg-zinc-700 justify-center items-center text-gray-500 hover:text-white flex ml-2 "
            >
              <FiSettings className="w-5 h-5 " title="Refresh" />
            </button>
          </div>
          </div>
          <div className="flex ml-2 justify-end gap-2 ">          
            <button
              type="button"
              title="Account"
              className="rounded-full h-10 w-10 hover:bg-zinc-700 justify-center items-center text-gray-500 hover:text-white "
            >
             <Avatar name="Azin Alahkhani" variant="beam"/>
            </button>
        </div>
      </div>
      <hr className="border-gray-500 dark:border-gray-700 mt-2" />
    </nav>
  );
}

export default Header;
